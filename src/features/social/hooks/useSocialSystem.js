import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  loadFriends,
  loadFriendRequests,
  loadActivities,
  loadLeaderboard,
  loadStudyGroups,
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
  searchUsers,
  addActivity,
  selectFriends,
  selectFriendRequests,
  selectActivities,
  selectLeaderboard,
  selectStudyGroups,
  selectSocialLoading,
  selectSocialError
} from '../state/socialSlice.js';
import { addXP } from '../../xp/state/xpSlice.js';
import socialService from '../services/socialService.js';

export const useSocialSystem = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const friends = useSelector(selectFriends);
  const friendRequests = useSelector(selectFriendRequests);
  const activities = useSelector(selectActivities);
  const leaderboard = useSelector(selectLeaderboard);
  const studyGroups = useSelector(selectStudyGroups);
  const loading = useSelector(selectSocialLoading);
  const error = useSelector(selectSocialError);

  // Load initial data
  useEffect(() => {
    dispatch(loadFriends());
    dispatch(loadFriendRequests());
    dispatch(loadActivities(20));
    dispatch(loadLeaderboard({ category: 'totalXP', limit: 20 }));
    dispatch(loadStudyGroups());
  }, [dispatch]);

  // Friend management
  const handleAcceptFriendRequest = useCallback((requestId) => {
    dispatch(acceptFriendRequest(requestId));
    // Add XP for accepting friend request
    dispatch(addXP({ amount: 10, reason: 'friend_request_accepted' }));
  }, [dispatch]);

  const handleRejectFriendRequest = useCallback((requestId) => {
    dispatch(rejectFriendRequest(requestId));
  }, [dispatch]);

  const handleSendFriendRequest = useCallback((toUserId, message = '') => {
    dispatch(sendFriendRequest({ toUserId, message }));
    // Add XP for sending friend request
    dispatch(addXP({ amount: 5, reason: 'friend_request_sent' }));
  }, [dispatch]);

  const handleSearchUsers = useCallback((query, limit = 10) => {
    dispatch(searchUsers({ query, limit }));
  }, [dispatch]);

  // Activity management
  const handleAddActivity = useCallback((activity) => {
    dispatch(addActivity(activity));
  }, [dispatch]);

  const handleAddLessonCompletedActivity = useCallback((lessonData) => {
    const activity = {
      userId: 'current_user',
      username: 'current_user',
      displayName: 'Bạn 👤',
      avatar: '👤',
      type: 'lesson_completed',
      title: `Hoàn thành bài học "${lessonData.title}"`,
      description: `Đạt ${lessonData.score}% điểm`,
      icon: '📚',
      xpEarned: lessonData.xpEarned || 0,
      timestamp: new Date().toISOString()
    };
    
    dispatch(addActivity(activity));
  }, [dispatch]);

  const handleAddBadgeUnlockedActivity = useCallback((badgeData) => {
    const activity = {
      userId: 'current_user',
      username: 'current_user',
      displayName: 'Bạn 👤',
      avatar: '👤',
      type: 'badge_unlocked',
      title: `Unlock badge "${badgeData.name}"`,
      description: badgeData.description,
      icon: '🏆',
      xpEarned: badgeData.xpReward || 0,
      timestamp: new Date().toISOString()
    };
    
    dispatch(addActivity(activity));
  }, [dispatch]);

  const handleAddLevelUpActivity = useCallback((levelData) => {
    const activity = {
      userId: 'current_user',
      username: 'current_user',
      displayName: 'Bạn 👤',
      avatar: '👤',
      type: 'level_up',
      title: `Lên cấp ${levelData.newLevel}!`,
      description: `Chúc mừng bạn đã đạt cấp độ mới`,
      icon: '⭐',
      xpEarned: 0,
      timestamp: new Date().toISOString()
    };
    
    dispatch(addActivity(activity));
  }, [dispatch]);

  const handleAddChallengeCompletedActivity = useCallback((challengeData) => {
    const activity = {
      userId: 'current_user',
      username: 'current_user',
      displayName: 'Bạn 👤',
      avatar: '👤',
      type: 'challenge_completed',
      title: `Hoàn thành thử thách "${challengeData.title}"`,
      description: challengeData.description,
      icon: '🎯',
      xpEarned: challengeData.xpReward || 0,
      timestamp: new Date().toISOString()
    };
    
    dispatch(addActivity(activity));
  }, [dispatch]);

  const handleAddStreakMilestoneActivity = useCallback((streakData) => {
    const activity = {
      userId: 'current_user',
      username: 'current_user',
      displayName: 'Bạn 👤',
      avatar: '👤',
      type: 'streak_milestone',
      title: `Đạt streak ${streakData.days} ngày!`,
      description: `Duy trì học tập liên tiếp ${streakData.days} ngày`,
      icon: '🔥',
      xpEarned: streakData.xpReward || 0,
      timestamp: new Date().toISOString()
    };
    
    dispatch(addActivity(activity));
  }, [dispatch]);

  // Leaderboard management
  const handleLoadLeaderboardByCategory = useCallback((category = 'totalXP', limit = 20) => {
    dispatch(loadLeaderboard({ category, limit }));
  }, [dispatch]);

  // Study group management
  const handleJoinStudyGroup = useCallback((groupId) => {
    const success = socialService.joinStudyGroup(groupId, 'current_user');
    if (success) {
      // Add XP for joining study group
      dispatch(addXP({ amount: 15, reason: 'joined_study_group' }));
      // Reload study groups
      dispatch(loadStudyGroups());
    }
    return success;
  }, [dispatch]);

  const handleLeaveStudyGroup = useCallback((groupId) => {
    const success = socialService.leaveStudyGroup(groupId, 'current_user');
    if (success) {
      // Reload study groups
      dispatch(loadStudyGroups());
    }
    return success;
  }, [dispatch]);

  // Utility functions
  const getOnlineFriendsCount = useCallback(() => {
    return friends.filter(friend => friend.isOnline).length;
  }, [friends]);

  const getPendingRequestsCount = useCallback(() => {
    return friendRequests.length;
  }, [friendRequests]);

  const getRecentActivitiesCount = useCallback(() => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return activities.filter(activity => 
      new Date(activity.timestamp) > oneDayAgo
    ).length;
  }, [activities]);

  const getUserRank = useCallback((userId = 'current_user') => {
    return socialService.getUserRank(userId);
  }, []);

  const getSuggestedFriends = useCallback((limit = 5) => {
    return socialService.getSuggestedFriends('current_user', limit);
  }, []);

  const getNotifications = useCallback(() => {
    return socialService.getNotifications('current_user');
  }, []);

  // Social achievements tracking
  const trackSocialAchievement = useCallback((achievementType, data = {}) => {
    // Add XP for social achievements
    const xpRewards = {
      first_friend: 50,
      ten_friends: 100,
      first_activity: 25,
      ten_activities: 75,
      first_group: 30,
      top_ten_leaderboard: 200,
      top_three_leaderboard: 500
    };

    const xpAmount = xpRewards[achievementType] || 0;
    if (xpAmount > 0) {
      dispatch(addXP({ 
        amount: xpAmount, 
        reason: `social_achievement_${achievementType}` 
      }));
    }

    // Add activity for social achievement
    const activity = {
      userId: 'current_user',
      username: 'current_user',
      displayName: 'Bạn 👤',
      avatar: '👤',
      type: 'badge_unlocked',
      title: `Thành tựu xã hội: ${achievementType}`,
      description: data.description || 'Hoàn thành thành tựu xã hội mới',
      icon: '🎉',
      xpEarned: xpAmount,
      timestamp: new Date().toISOString()
    };
    
    dispatch(addActivity(activity));
  }, [dispatch]);

  return {
    // State
    friends,
    friendRequests,
    activities,
    leaderboard,
    studyGroups,
    loading,
    error,

    // Friend actions
    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleSendFriendRequest,
    handleSearchUsers,

    // Activity actions
    handleAddActivity,
    handleAddLessonCompletedActivity,
    handleAddBadgeUnlockedActivity,
    handleAddLevelUpActivity,
    handleAddChallengeCompletedActivity,
    handleAddStreakMilestoneActivity,

    // Leaderboard actions
    handleLoadLeaderboardByCategory,

    // Study group actions
    handleJoinStudyGroup,
    handleLeaveStudyGroup,

    // Utility functions
    getOnlineFriendsCount,
    getPendingRequestsCount,
    getRecentActivitiesCount,
    getUserRank,
    getSuggestedFriends,
    getNotifications,

    // Achievement tracking
    trackSocialAchievement
  };
}; 