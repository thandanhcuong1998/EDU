import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  checkChallengeProgress,
  completeMultipleChallenges,
  selectCompletedChallenges,
  selectNewCompletions,
  selectChallengeStats
} from '../state/challengeSlice.js';
import { selectUserStats } from '../../xp/state/xpSlice.js';
import challengeService from '../services/challengeService.js';
import xpService from '../../../shared/services/xpService.js';

export const useChallengeSystem = () => {
  const dispatch = useDispatch();
  const userStats = useSelector(selectUserStats);
  const completedChallenges = useSelector(selectCompletedChallenges);
  const newCompletions = useSelector(selectNewCompletions);
  const challengeStats = useSelector(selectChallengeStats);

  // Kiểm tra tiến độ challenges khi user stats thay đổi
  useEffect(() => {
    if (userStats && Object.keys(userStats).length > 0) {
      dispatch(checkChallengeProgress({ userStats, completedChallenges }));
    }
  }, [dispatch, userStats, completedChallenges]);

  // Xử lý khi có challenges mới hoàn thành
  useEffect(() => {
    if (newCompletions.length > 0) {
      // Hoàn thành challenges mới
      const newCompletionIds = newCompletions.map(challenge => challenge.id);
      dispatch(completeMultipleChallenges(newCompletionIds));

      // Cộng XP từ challenges
      const totalXpReward = challengeService.calculateTotalXpReward(newCompletionIds);
      if (totalXpReward > 0) {
        // Thêm XP vào hệ thống
        const userId = localStorage.getItem('currentUser')?.id || 'default';
        xpService.addXP(userId, 'challengeCompleted', { 
          amount: totalXpReward,
          challengeIds: newCompletionIds 
        });
      }
    }
  }, [newCompletions, dispatch]);

  // Lấy thông tin challenge theo ID
  const getChallengeById = (challengeId) => {
    return challengeService.getChallengeById(challengeId);
  };

  // Lấy danh sách challenges đã hoàn thành với thông tin chi tiết
  const getCompletedChallengeDetails = () => {
    return completedChallenges
      .map(challengeId => challengeService.getChallengeById(challengeId))
      .filter(Boolean);
  };

  // Lấy thống kê challenges
  const getChallengeStats = () => {
    return challengeStats;
  };

  // Lấy challenges gần hoàn thành
  const getNearCompletionChallenges = (limit = 3) => {
    return challengeService.getNearCompletionChallenges(userStats, completedChallenges, limit);
  };

  // Kiểm tra xem challenge có được hoàn thành không
  const isChallengeCompleted = (challengeId) => {
    return completedChallenges.includes(challengeId);
  };

  // Lấy tiến độ challenge
  const getChallengeProgress = (challengeId) => {
    const challenge = challengeService.getChallengeById(challengeId);
    if (!challenge) return null;

    if (challenge.category === 'weekly') {
      return challengeService.checkWeeklyChallengeProgress(challenge, userStats);
    } else {
      return challengeService.checkChallengeProgress(challenge, userStats);
    }
  };

  // Lấy thử thách hàng ngày
  const getDailyChallenges = () => {
    return challengeService.getDailyChallenges();
  };

  // Lấy thử thách hàng tuần
  const getWeeklyChallenges = () => {
    return challengeService.getWeeklyChallenges();
  };

  // Tạo thử thách mới cho ngày hôm nay
  const generateDailyChallenges = () => {
    return challengeService.generateDailyChallenges();
  };

  // Tạo thử thách mới cho tuần này
  const generateWeeklyChallenges = () => {
    return challengeService.generateWeeklyChallenges();
  };

  return {
    completedChallenges,
    newCompletions,
    challengeStats,
    getChallengeById,
    getCompletedChallengeDetails,
    getChallengeStats,
    getNearCompletionChallenges,
    isChallengeCompleted,
    getChallengeProgress,
    getDailyChallenges,
    getWeeklyChallenges,
    generateDailyChallenges,
    generateWeeklyChallenges
  };
}; 