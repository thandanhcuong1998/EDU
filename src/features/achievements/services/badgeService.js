import { badgesData, BADGE_TYPES, BADGE_RARITY } from '../data/badgesData.js';

class BadgeService {
  constructor() {
    this.badges = badgesData;
  }

  // Kiểm tra điều kiện unlock badge
  checkBadgeConditions(userStats, badge) {
    const { condition } = badge;
    
    for (const [key, requiredValue] of Object.entries(condition)) {
      const userValue = userStats[key] || 0;
      
      if (userValue < requiredValue) {
        return false;
      }
    }
    
    return true;
  }

  // Lấy danh sách badges có thể unlock
  getUnlockableBadges(userStats, unlockedBadges = []) {
    return this.badges.filter(badge => {
      // Kiểm tra xem badge đã được unlock chưa
      if (unlockedBadges.includes(badge.id)) {
        return false;
      }
      
      // Kiểm tra điều kiện unlock
      return this.checkBadgeConditions(userStats, badge);
    });
  }

  // Lấy danh sách badges đã unlock
  getUnlockedBadges(userStats, unlockedBadges = []) {
    return this.badges.filter(badge => 
      unlockedBadges.includes(badge.id)
    );
  }

  // Lấy danh sách badges theo loại
  getBadgesByType(type) {
    return this.badges.filter(badge => badge.type === type);
  }

  // Lấy danh sách badges theo độ hiếm
  getBadgesByRarity(rarity) {
    return this.badges.filter(badge => badge.rarity === rarity);
  }

  // Lấy badge theo ID
  getBadgeById(id) {
    return this.badges.find(badge => badge.id === id);
  }

  // Tính tổng XP từ badges đã unlock
  getTotalXpFromBadges(unlockedBadges = []) {
    return unlockedBadges.reduce((total, badgeId) => {
      const badge = this.getBadgeById(badgeId);
      return total + (badge?.xpReward || 0);
    }, 0);
  }

  // Kiểm tra và trả về badges mới unlock
  checkNewBadges(userStats, unlockedBadges = []) {
    const newBadges = this.getUnlockableBadges(userStats, unlockedBadges);
    return newBadges.map(badge => ({
      ...badge,
      unlockedAt: new Date().toISOString()
    }));
  }

  // Lấy thống kê badges
  getBadgeStats(unlockedBadges = []) {
    const unlocked = this.getUnlockedBadges({}, unlockedBadges);
    
    const stats = {
      total: this.badges.length,
      unlocked: unlocked.length,
      progress: Math.round((unlocked.length / this.badges.length) * 100),
      byType: {},
      byRarity: {}
    };

    // Thống kê theo loại
    Object.values(BADGE_TYPES).forEach(type => {
      const typeBadges = this.getBadgesByType(type);
      const unlockedTypeBadges = unlocked.filter(badge => badge.type === type);
      stats.byType[type] = {
        total: typeBadges.length,
        unlocked: unlockedTypeBadges.length,
        progress: Math.round((unlockedTypeBadges.length / typeBadges.length) * 100)
      };
    });

    // Thống kê theo độ hiếm
    Object.values(BADGE_RARITY).forEach(rarity => {
      const rarityBadges = this.getBadgesByRarity(rarity);
      const unlockedRarityBadges = unlocked.filter(badge => badge.rarity === rarity);
      stats.byRarity[rarity] = {
        total: rarityBadges.length,
        unlocked: unlockedRarityBadges.length,
        progress: Math.round((unlockedRarityBadges.length / rarityBadges.length) * 100)
      };
    });

    return stats;
  }

  // Lấy badges gần nhất có thể unlock
  getNearUnlockBadges(userStats, unlockedBadges = [], limit = 5) {
    const lockedBadges = this.badges.filter(badge => 
      !unlockedBadges.includes(badge.id)
    );

    return lockedBadges
      .map(badge => {
        const progress = this.calculateBadgeProgress(userStats, badge);
        return { ...badge, progress };
      })
      .sort((a, b) => b.progress - a.progress)
      .slice(0, limit);
  }

  // Tính tiến độ unlock badge
  calculateBadgeProgress(userStats, badge) {
    const { condition } = badge;
    let totalProgress = 0;
    let conditionCount = 0;

    for (const [key, requiredValue] of Object.entries(condition)) {
      const userValue = userStats[key] || 0;
      const progress = Math.min((userValue / requiredValue) * 100, 100);
      totalProgress += progress;
      conditionCount++;
    }

    return conditionCount > 0 ? Math.round(totalProgress / conditionCount) : 0;
  }

  // Lấy thông tin chi tiết về badge
  getBadgeDetails(badgeId, userStats = {}) {
    const badge = this.getBadgeById(badgeId);
    if (!badge) return null;

    const progress = this.calculateBadgeProgress(userStats, badge);
    const isUnlocked = progress >= 100;

    return {
      ...badge,
      progress,
      isUnlocked,
      remaining: this.calculateRemainingRequirements(userStats, badge)
    };
  }

  // Tính toán yêu cầu còn lại để unlock badge
  calculateRemainingRequirements(userStats, badge) {
    const { condition } = badge;
    const remaining = {};

    for (const [key, requiredValue] of Object.entries(condition)) {
      const userValue = userStats[key] || 0;
      const remainingValue = Math.max(0, requiredValue - userValue);
      
      if (remainingValue > 0) {
        remaining[key] = remainingValue;
      }
    }

    return remaining;
  }
}

export default new BadgeService(); 