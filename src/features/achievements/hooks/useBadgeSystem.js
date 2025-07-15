import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  checkNewBadges, 
  unlockMultipleBadges,
  selectUnlockedBadges,
  selectNewBadges
} from '../state/badgeSlice.js';
import { selectUserStats } from '../../xp/state/xpSlice.js';
import badgeService from '../services/badgeService.js';
import xpService from '../../../shared/services/xpService.js';

export const useBadgeSystem = () => {
  const dispatch = useDispatch();
  const userStats = useSelector(selectUserStats);
  const unlockedBadges = useSelector(selectUnlockedBadges);
  const newBadges = useSelector(selectNewBadges);

  // Kiểm tra badges mới khi user stats thay đổi
  useEffect(() => {
    if (userStats && Object.keys(userStats).length > 0) {
      dispatch(checkNewBadges({ userStats, unlockedBadges }));
    }
  }, [dispatch, userStats, unlockedBadges]);

  // Xử lý khi có badges mới
  useEffect(() => {
    if (newBadges.length > 0) {
      // Unlock badges mới
      const newBadgeIds = newBadges.map(badge => badge.id);
      dispatch(unlockMultipleBadges(newBadgeIds));

      // Cộng XP từ badges
      const totalXpReward = badgeService.getTotalXpFromBadges(newBadgeIds);
      if (totalXpReward > 0) {
        // Thêm XP vào hệ thống
        const userId = localStorage.getItem('currentUser')?.id || 'default';
        xpService.addXP(userId, 'badgeUnlocked', { 
          amount: totalXpReward,
          badgeIds: newBadgeIds 
        });
      }
    }
  }, [newBadges, dispatch]);

  // Lấy thông tin badge theo ID
  const getBadgeById = (badgeId) => {
    return badgeService.getBadgeById(badgeId);
  };

  // Lấy danh sách badges đã unlock với thông tin chi tiết
  const getUnlockedBadgeDetails = () => {
    return unlockedBadges
      .map(badgeId => badgeService.getBadgeById(badgeId))
      .filter(Boolean);
  };

  // Lấy thống kê badges
  const getBadgeStats = () => {
    return badgeService.getBadgeStats(unlockedBadges);
  };

  // Lấy badges gần nhất có thể unlock
  const getNearUnlockBadges = (limit = 5) => {
    return badgeService.getNearUnlockBadges(userStats, unlockedBadges, limit);
  };

  // Kiểm tra xem badge có được unlock không
  const isBadgeUnlocked = (badgeId) => {
    return unlockedBadges.includes(badgeId);
  };

  // Lấy tiến độ unlock badge
  const getBadgeProgress = (badgeId) => {
    const badge = badgeService.getBadgeById(badgeId);
    if (!badge) return null;

    return badgeService.calculateBadgeProgress(userStats, badge);
  };

  return {
    unlockedBadges,
    newBadges,
    getBadgeById,
    getUnlockedBadgeDetails,
    getBadgeStats,
    getNearUnlockBadges,
    isBadgeUnlocked,
    getBadgeProgress
  };
}; 