/**
 * Spaced Repetition System (SRS) Service
 * Dựa trên thuật toán SuperMemo 2 với một số cải tiến
 */

class SRSService {
    constructor() {
        this.storageKey = 'srs_data';
        this.defaultSettings = {
            // Các cấp độ khó khăn (0-5)
            difficultyLevels: {
                0: { name: 'Hoàn toàn quên', interval: 1, easeFactor: 2.5 },
                1: { name: 'Rất khó', interval: 1, easeFactor: 2.5 },
                2: { name: 'Khó', interval: 6, easeFactor: 2.5 },
                3: { name: 'Bình thường', interval: 10, easeFactor: 2.5 },
                4: { name: 'Dễ', interval: 15, easeFactor: 2.5 },
                5: { name: 'Rất dễ', interval: 20, easeFactor: 2.5 }
            },
            // Cấu hình mặc định
            config: {
                minInterval: 1, // Ngày tối thiểu
                maxInterval: 365, // Ngày tối đa
                minEaseFactor: 1.3, // Hệ số dễ dàng tối thiểu
                maxEaseFactor: 2.5, // Hệ số dễ dàng tối đa
                newCardInterval: 1, // Khoảng thời gian cho card mới
                reviewCardInterval: 6, // Khoảng thời gian cho card ôn tập
            }
        };
    }

    /**
     * Khởi tạo SRS data cho một item mới
     * @param {string} itemId - ID của item (question, vocabulary, etc.)
     * @param {string} itemType - Loại item (question, vocabulary, grammar)
     * @param {Object} metadata - Thông tin bổ sung
     * @returns {Object} SRS data
     */
    initializeItem(itemId, itemType, metadata = {}) {
        const now = new Date();
        const srsData = {
            id: itemId,
            type: itemType,
            metadata,
            // Trạng thái học tập
            status: 'new', // new, learning, reviewing, suspended
            // Thông tin SRS
            interval: 0,
            easeFactor: 2.5,
            repetitions: 0,
            consecutiveCorrect: 0,
            consecutiveIncorrect: 0,
            // Thời gian
            nextReview: now,
            lastReviewed: null,
            createdAt: now,
            // Thống kê
            totalReviews: 0,
            correctReviews: 0,
            streak: 0,
            // Lịch sử
            reviewHistory: []
        };

        this.saveItemData(srsData);
        return srsData;
    }

    /**
     * Đánh giá kết quả học tập
     * @param {string} itemId - ID của item
     * @param {number} difficulty - Độ khó (0-5)
     * @returns {Object} Kết quả cập nhật
     */
    reviewItem(itemId, difficulty) {
        const itemData = this.getItemData(itemId);
        if (!itemData) {
            throw new Error(`Item ${itemId} not found in SRS data`);
        }

        const now = new Date();
        const isCorrect = difficulty >= 3;
        const oldInterval = itemData.interval;
        const oldEaseFactor = itemData.easeFactor;

        // Cập nhật thống kê
        itemData.totalReviews++;
        itemData.lastReviewed = now;
        itemData.reviewHistory.push({
            date: now,
            difficulty,
            isCorrect,
            interval: oldInterval
        });

        // Tính toán interval và ease factor mới
        if (itemData.status === 'new') {
            // Item mới
            if (isCorrect) {
                itemData.status = 'learning';
                itemData.interval = this.defaultSettings.config.newCardInterval;
                itemData.consecutiveCorrect = 1;
                itemData.consecutiveIncorrect = 0;
            } else {
                itemData.interval = 0;
                itemData.consecutiveCorrect = 0;
                itemData.consecutiveIncorrect = 1;
            }
        } else if (itemData.status === 'learning') {
            // Đang học
            if (isCorrect) {
                itemData.consecutiveCorrect++;
                itemData.consecutiveIncorrect = 0;
                
                if (itemData.consecutiveCorrect >= 2) {
                    itemData.status = 'reviewing';
                    itemData.interval = this.defaultSettings.config.reviewCardInterval;
                } else {
                    itemData.interval = this.defaultSettings.config.newCardInterval;
                }
            } else {
                itemData.consecutiveCorrect = 0;
                itemData.consecutiveIncorrect++;
                itemData.interval = 0;
            }
        } else {
            // Đang ôn tập
            if (isCorrect) {
                itemData.consecutiveCorrect++;
                itemData.consecutiveIncorrect = 0;
                itemData.correctReviews++;
                
                // Tính interval mới dựa trên SuperMemo 2
                const newInterval = this.calculateNewInterval(
                    oldInterval,
                    oldEaseFactor,
                    difficulty
                );
                
                itemData.interval = Math.min(
                    newInterval,
                    this.defaultSettings.config.maxInterval
                );
                
                // Cập nhật ease factor
                itemData.easeFactor = this.calculateNewEaseFactor(
                    oldEaseFactor,
                    difficulty
                );
            } else {
                itemData.consecutiveCorrect = 0;
                itemData.consecutiveIncorrect++;
                itemData.interval = 0;
                itemData.status = 'learning';
            }
        }

        // Cập nhật streak
        if (isCorrect) {
            itemData.streak++;
        } else {
            itemData.streak = 0;
        }

        // Tính thời gian ôn tập tiếp theo
        itemData.nextReview = this.calculateNextReview(itemData.interval);

        this.saveItemData(itemData);
        return itemData;
    }

    /**
     * Tính interval mới dựa trên SuperMemo 2
     */
    calculateNewInterval(oldInterval, easeFactor, difficulty) {
        if (difficulty < 3) {
            return 0; // Lặp lại ngay
        }
        
        if (oldInterval === 0) {
            return 1;
        }
        
        if (oldInterval === 1) {
            return 6;
        }
        
        return Math.round(oldInterval * easeFactor);
    }

    /**
     * Tính ease factor mới
     */
    calculateNewEaseFactor(oldEaseFactor, difficulty) {
        const quality = difficulty;
        const newEaseFactor = oldEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        
        return Math.max(
            this.defaultSettings.config.minEaseFactor,
            Math.min(this.defaultSettings.config.maxEaseFactor, newEaseFactor)
        );
    }

    /**
     * Tính thời gian ôn tập tiếp theo
     */
    calculateNextReview(interval) {
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + interval);
        return nextReview;
    }

    /**
     * Lấy danh sách items cần ôn tập hôm nay
     * @param {string} itemType - Loại item (optional)
     * @returns {Array} Danh sách items
     */
    getDueItems(itemType = null) {
        const allItems = this.getAllItems();
        const now = new Date();
        
        return allItems.filter(item => {
            const isDue = item.nextReview <= now;
            const matchesType = itemType ? item.type === itemType : true;
            const isActive = item.status !== 'suspended';
            
            return isDue && matchesType && isActive;
        }).sort((a, b) => {
            // Sắp xếp theo độ ưu tiên: new > learning > reviewing
            const priorityOrder = { new: 3, learning: 2, reviewing: 1 };
            const aPriority = priorityOrder[a.status] || 0;
            const bPriority = priorityOrder[b.status] || 0;
            
            if (aPriority !== bPriority) {
                return bPriority - aPriority;
            }
            
            // Nếu cùng priority, sắp xếp theo thời gian
            return new Date(a.nextReview) - new Date(b.nextReview);
        });
    }

    /**
     * Lấy thống kê học tập
     * @param {string} itemType - Loại item (optional)
     * @returns {Object} Thống kê
     */
    getStats(itemType = null) {
        const allItems = this.getAllItems();
        const filteredItems = itemType 
            ? allItems.filter(item => item.type === itemType)
            : allItems;

        const totalItems = filteredItems.length;
        const newItems = filteredItems.filter(item => item.status === 'new').length;
        const learningItems = filteredItems.filter(item => item.status === 'learning').length;
        const reviewingItems = filteredItems.filter(item => item.status === 'reviewing').length;
        const suspendedItems = filteredItems.filter(item => item.status === 'suspended').length;

        const totalReviews = filteredItems.reduce((sum, item) => sum + item.totalReviews, 0);
        const correctReviews = filteredItems.reduce((sum, item) => sum + item.correctReviews, 0);
        const accuracy = totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0;

        const dueItems = this.getDueItems(itemType).length;

        return {
            totalItems,
            newItems,
            learningItems,
            reviewingItems,
            suspendedItems,
            totalReviews,
            correctReviews,
            accuracy: Math.round(accuracy * 100) / 100,
            dueItems
        };
    }

    /**
     * Lấy lịch sử ôn tập
     * @param {string} itemId - ID của item
     * @param {number} days - Số ngày gần đây
     * @returns {Array} Lịch sử
     */
    getReviewHistory(itemId, days = 30) {
        const itemData = this.getItemData(itemId);
        if (!itemData) return [];

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        return itemData.reviewHistory.filter(review => 
            new Date(review.date) >= cutoffDate
        );
    }

    /**
     * Tạm dừng hoặc kích hoạt item
     * @param {string} itemId - ID của item
     * @param {boolean} suspend - True để tạm dừng, false để kích hoạt
     */
    toggleItemStatus(itemId, suspend) {
        const itemData = this.getItemData(itemId);
        if (!itemData) return;

        itemData.status = suspend ? 'suspended' : 'new';
        this.saveItemData(itemData);
    }

    /**
     * Reset progress của item
     * @param {string} itemId - ID của item
     */
    resetItem(itemId) {
        const itemData = this.getItemData(itemId);
        if (!itemData) return;

        itemData.status = 'new';
        itemData.interval = 0;
        itemData.easeFactor = 2.5;
        itemData.repetitions = 0;
        itemData.consecutiveCorrect = 0;
        itemData.consecutiveIncorrect = 0;
        itemData.nextReview = new Date();
        itemData.streak = 0;

        this.saveItemData(itemData);
    }

    // Storage methods
    saveItemData(itemData) {
        const allData = this.getAllItems();
        const existingIndex = allData.findIndex(item => item.id === itemData.id);
        
        if (existingIndex >= 0) {
            allData[existingIndex] = itemData;
        } else {
            allData.push(itemData);
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(allData));
    }

    getItemData(itemId) {
        const allData = this.getAllItems();
        return allData.find(item => item.id === itemId);
    }

    getAllItems() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading SRS data:', error);
            return [];
        }
    }

    clearAllData() {
        localStorage.removeItem(this.storageKey);
    }
}

// Tạo instance singleton
const srsService = new SRSService();

export default srsService;
