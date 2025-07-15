/**
 * XP & Level System Service
 * Quản lý điểm kinh nghiệm, level và achievements
 */

class XPService {
    constructor() {
        this.storageKey = 'xp_data';
        this.defaultSettings = {
            // XP cho các hành động khác nhau
            xpRewards: {
                // Học tập
                lessonCompleted: 50,
                questionCorrect: 10,
                questionIncorrect: 2,
                streakBonus: 5,
                
                // Ôn tập
                srsReview: 15,
                srsCorrect: 8,
                srsIncorrect: 1,
                
                // Daily challenges
                dailyGoalCompleted: 100,
                dailyStreak: 25,
                
                // Achievements
                firstLesson: 200,
                perfectScore: 100,
                weekStreak: 500,
                monthStreak: 2000,
                
                // Special events
                loginBonus: 5,
                weekendBonus: 1.5, // Multiplier
            },
            
            // Cấu hình level
            levelConfig: {
                baseXP: 100, // XP cần cho level 1
                xpMultiplier: 1.2, // Tăng XP cần thiết cho mỗi level
                maxLevel: 100,
            },
            
            // Ranks và titles
            ranks: [
                { level: 1, name: 'Người mới bắt đầu', color: '#6b7280' },
                { level: 5, name: 'Học viên', color: '#3b82f6' },
                { level: 10, name: 'Sinh viên', color: '#8b5cf6' },
                { level: 20, name: 'Nghiên cứu sinh', color: '#f59e0b' },
                { level: 30, name: 'Thạc sĩ', color: '#ef4444' },
                { level: 50, name: 'Tiến sĩ', color: '#10b981' },
                { level: 75, name: 'Giáo sư', color: '#8b5cf6' },
                { level: 100, name: 'Bậc thầy', color: '#fbbf24' },
            ]
        };
    }

    /**
     * Khởi tạo XP data cho user mới
     * @param {string} userId - ID của user
     * @returns {Object} XP data
     */
    initializeUser(userId) {
        const xpData = {
            userId,
            currentXP: 0,
            totalXP: 0,
            level: 1,
            rank: this.getRank(1),
            streak: 0,
            maxStreak: 0,
            dailyStreak: 0,
            maxDailyStreak: 0,
            lastLoginDate: new Date().toISOString(),
            achievements: [],
            stats: {
                lessonsCompleted: 0,
                questionsAnswered: 0,
                correctAnswers: 0,
                srsReviews: 0,
                dailyGoalsCompleted: 0,
            },
            history: []
        };

        this.saveUserData(xpData);
        return xpData;
    }

    /**
     * Thêm XP cho user
     * @param {string} userId - ID của user
     * @param {string} action - Hành động (lessonCompleted, questionCorrect, etc.)
     * @param {Object} metadata - Thông tin bổ sung
     * @returns {Object} Kết quả cập nhật
     */
    addXP(userId, action, metadata = {}) {
        const userData = this.getUserData(userId);
        if (!userData) {
            throw new Error(`User ${userId} not found in XP data`);
        }

        const baseXP = this.defaultSettings.xpRewards[action] || 0;
        if (baseXP === 0) {
            console.warn(`No XP reward defined for action: ${action}`);
            return userData;
        }

        // Tính toán XP với bonus
        let finalXP = baseXP;
        const now = new Date();
        const isWeekend = now.getDay() === 0 || now.getDay() === 6;

        // Weekend bonus
        if (isWeekend && action !== 'loginBonus') {
            finalXP = Math.round(finalXP * this.defaultSettings.xpRewards.weekendBonus);
        }

        // Streak bonus
        if (action === 'questionCorrect' && userData.streak > 0) {
            const streakBonus = Math.min(userData.streak * this.defaultSettings.xpRewards.streakBonus, 50);
            finalXP += streakBonus;
        }

        // Cập nhật XP
        const oldLevel = userData.level;
        userData.currentXP += finalXP;
        userData.totalXP += finalXP;
        userData.level = this.calculateLevel(userData.currentXP);
        userData.rank = this.getRank(userData.level);

        // Cập nhật streak
        if (action === 'questionCorrect' || action === 'lessonCompleted') {
            userData.streak++;
            userData.maxStreak = Math.max(userData.maxStreak, userData.streak);
        } else if (action === 'questionIncorrect') {
            userData.streak = 0;
        }

        // Cập nhật stats
        this.updateStats(userData, action, metadata);

        // Thêm vào history
        userData.history.push({
            action,
            xp: finalXP,
            timestamp: now.toISOString(),
            metadata
        });

        // Giới hạn history (giữ 100 entries gần nhất)
        if (userData.history.length > 100) {
            userData.history = userData.history.slice(-100);
        }

        // Kiểm tra achievements
        const newAchievements = this.checkAchievements(userData);
        userData.achievements.push(...newAchievements);

        this.saveUserData(userData);

        return {
            userData,
            xpGained: finalXP,
            levelUp: userData.level > oldLevel,
            newLevel: userData.level,
            newRank: userData.rank,
            newAchievements
        };
    }

    /**
     * Tính level dựa trên XP
     * @param {number} xp - Tổng XP hiện tại
     * @returns {number} Level
     */
    calculateLevel(xp) {
        const { baseXP, xpMultiplier, maxLevel } = this.defaultSettings.levelConfig;
        
        if (xp < baseXP) return 1;
        
        let level = 1;
        let requiredXP = baseXP;
        let totalRequiredXP = 0;
        
        while (level < maxLevel) {
            totalRequiredXP += requiredXP;
            if (xp < totalRequiredXP) {
                return level;
            }
            level++;
            requiredXP = Math.round(requiredXP * xpMultiplier);
        }
        
        return maxLevel;
    }

    /**
     * Lấy rank dựa trên level
     * @param {number} level - Level hiện tại
     * @returns {Object} Rank object
     */
    getRank(level) {
        const ranks = this.defaultSettings.ranks;
        let currentRank = ranks[0];
        
        for (const rank of ranks) {
            if (level >= rank.level) {
                currentRank = rank;
            } else {
                break;
            }
        }
        
        return currentRank;
    }

    /**
     * Tính XP cần thiết cho level tiếp theo
     * @param {number} currentLevel - Level hiện tại
     * @param {number} currentXP - XP hiện tại
     * @returns {Object} Thông tin level up
     */
    getLevelUpInfo(currentLevel, currentXP) {
        const { baseXP, xpMultiplier, maxLevel } = this.defaultSettings.levelConfig;
        
        if (currentLevel >= maxLevel) {
            return {
                nextLevel: maxLevel,
                xpRequired: 0,
                xpProgress: 100,
                isMaxLevel: true
            };
        }
        
        let totalRequiredXP = 0;
        let requiredXP = baseXP;
        
        for (let i = 1; i <= currentLevel; i++) {
            totalRequiredXP += requiredXP;
            requiredXP = Math.round(requiredXP * xpMultiplier);
        }
        
        const nextLevelRequiredXP = totalRequiredXP + requiredXP;
        const xpProgress = ((currentXP - totalRequiredXP) / (nextLevelRequiredXP - totalRequiredXP)) * 100;
        
        return {
            nextLevel: currentLevel + 1,
            xpRequired: nextLevelRequiredXP - currentXP,
            xpProgress: Math.max(0, Math.min(100, xpProgress)),
            isMaxLevel: false
        };
    }

    /**
     * Cập nhật daily streak
     * @param {string} userId - ID của user
     * @returns {Object} Kết quả cập nhật
     */
    updateDailyStreak(userId) {
        const userData = this.getUserData(userId);
        if (!userData) return null;

        const now = new Date();
        const lastLogin = new Date(userData.lastLoginDate);
        const daysDiff = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));

        if (daysDiff === 1) {
            // Consecutive day
            userData.dailyStreak++;
            userData.maxDailyStreak = Math.max(userData.maxDailyStreak, userData.dailyStreak);
        } else if (daysDiff > 1) {
            // Break in streak
            userData.dailyStreak = 1;
        }
        // daysDiff === 0 means same day, no change

        userData.lastLoginDate = now.toISOString();
        this.saveUserData(userData);

        return userData;
    }

    /**
     * Cập nhật stats
     * @param {Object} userData - User data
     * @param {string} action - Hành động
     * @param {Object} metadata - Metadata
     */
    updateStats(userData, action, metadata) {
        switch (action) {
            case 'lessonCompleted':
                userData.stats.lessonsCompleted++;
                userData.stats.lessonsCompletedToday = (userData.stats.lessonsCompletedToday || 0) + 1;
                userData.stats.lessonsCompletedThisWeek = (userData.stats.lessonsCompletedThisWeek || 0) + 1;
                if (metadata.perfectScore) {
                    userData.stats.perfectScoresToday = (userData.stats.perfectScoresToday || 0) + 1;
                }
                break;
            case 'questionCorrect':
                userData.stats.questionsAnswered++;
                userData.stats.correctAnswers++;
                break;
            case 'questionIncorrect':
                userData.stats.questionsAnswered++;
                break;
            case 'srsReview':
                userData.stats.srsReviews++;
                userData.stats.srsReviewsToday = (userData.stats.srsReviewsToday || 0) + 1;
                userData.stats.srsReviewsThisWeek = (userData.stats.srsReviewsThisWeek || 0) + 1;
                break;
            case 'dailyGoalCompleted':
                userData.stats.dailyGoalsCompleted++;
                break;
            case 'xpEarned':
                userData.stats.xpEarnedToday = (userData.stats.xpEarnedToday || 0) + (metadata.amount || 0);
                userData.stats.xpEarnedThisWeek = (userData.stats.xpEarnedThisWeek || 0) + (metadata.amount || 0);
                break;
            case 'studyTime':
                userData.stats.studyTimeToday = (userData.stats.studyTimeToday || 0) + (metadata.minutes || 0);
                break;
        }
    }

    /**
     * Kiểm tra achievements
     * @param {Object} userData - User data
     * @returns {Array} Danh sách achievements mới
     */
    checkAchievements(userData) {
        const newAchievements = [];
        const existingAchievementIds = userData.achievements.map(a => a.id);

        // First lesson
        if (userData.stats.lessonsCompleted === 1 && !existingAchievementIds.includes('first_lesson')) {
            newAchievements.push({
                id: 'first_lesson',
                name: 'Bước đầu tiên',
                description: 'Hoàn thành bài học đầu tiên',
                icon: '🎯',
                xpReward: this.defaultSettings.xpRewards.firstLesson
            });
        }

        // Perfect score (10 correct in a row)
        if (userData.streak >= 10 && !existingAchievementIds.includes('perfect_score')) {
            newAchievements.push({
                id: 'perfect_score',
                name: 'Hoàn hảo',
                description: 'Trả lời đúng 10 câu liên tiếp',
                icon: '⭐',
                xpReward: this.defaultSettings.xpRewards.perfectScore
            });
        }

        // Week streak
        if (userData.dailyStreak >= 7 && !existingAchievementIds.includes('week_streak')) {
            newAchievements.push({
                id: 'week_streak',
                name: 'Kiên trì',
                description: 'Học liên tiếp 7 ngày',
                icon: '🔥',
                xpReward: this.defaultSettings.xpRewards.weekStreak
            });
        }

        // Month streak
        if (userData.dailyStreak >= 30 && !existingAchievementIds.includes('month_streak')) {
            newAchievements.push({
                id: 'month_streak',
                name: 'Bậc thầy',
                description: 'Học liên tiếp 30 ngày',
                icon: '👑',
                xpReward: this.defaultSettings.xpRewards.monthStreak
            });
        }

        // Level milestones
        const levelMilestones = [5, 10, 20, 30, 50, 75, 100];
        for (const milestone of levelMilestones) {
            if (userData.level >= milestone && !existingAchievementIds.includes(`level_${milestone}`)) {
                newAchievements.push({
                    id: `level_${milestone}`,
                    name: `Level ${milestone}`,
                    description: `Đạt level ${milestone}`,
                    icon: '🏆',
                    xpReward: milestone * 10
                });
            }
        }

        return newAchievements;
    }

    /**
     * Lấy leaderboard data
     * @param {number} limit - Số lượng user tối đa
     * @returns {Array} Leaderboard
     */
    getLeaderboard(limit = 10) {
        const allUsers = this.getAllUsers();
        return allUsers
            .sort((a, b) => b.totalXP - a.totalXP)
            .slice(0, limit)
            .map((user, index) => ({
                rank: index + 1,
                userId: user.userId,
                level: user.level,
                rank: user.rank,
                totalXP: user.totalXP,
                streak: user.streak
            }));
    }

    // Storage methods
    saveUserData(userData) {
        const allData = this.getAllUsers();
        const existingIndex = allData.findIndex(user => user.userId === userData.userId);
        
        if (existingIndex >= 0) {
            allData[existingIndex] = userData;
        } else {
            allData.push(userData);
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(allData));
    }

    getUserData(userId) {
        const allData = this.getAllUsers();
        return allData.find(user => user.userId === userId);
    }

    getAllUsers() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading XP data:', error);
            return [];
        }
    }

    clearAllData() {
        localStorage.removeItem(this.storageKey);
    }
}

// Tạo instance singleton
const xpService = new XPService();

export default xpService; 