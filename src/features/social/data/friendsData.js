export const FRIEND_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  BLOCKED: 'blocked'
};

export const ACTIVITY_TYPES = {
  LESSON_COMPLETED: 'lesson_completed',
  BADGE_UNLOCKED: 'badge_unlocked',
  CHALLENGE_COMPLETED: 'challenge_completed',
  LEVEL_UP: 'level_up',
  STREAK_MILESTONE: 'streak_milestone',
  SRS_REVIEW: 'srs_review'
};

export const mockFriends = [
  {
    id: 'friend1',
    username: 'sakura_learner',
    displayName: 'Sakura 🌸',
    avatar: '🌸',
    level: 15,
    rank: 'Intermediate',
    currentStreak: 7,
    totalXP: 12500,
    isOnline: true,
    lastActive: new Date().toISOString(),
    status: FRIEND_STATUS.ACCEPTED,
    mutualFriends: 3
  },
  {
    id: 'friend2',
    username: 'japanese_master',
    displayName: 'Kenji 🗾',
    avatar: '🗾',
    level: 28,
    rank: 'Advanced',
    currentStreak: 15,
    totalXP: 25000,
    isOnline: false,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: FRIEND_STATUS.ACCEPTED,
    mutualFriends: 5
  },
  {
    id: 'friend3',
    username: 'anime_fan',
    displayName: 'Yuki ❄️',
    avatar: '❄️',
    level: 8,
    rank: 'Beginner',
    currentStreak: 3,
    totalXP: 4500,
    isOnline: true,
    lastActive: new Date().toISOString(),
    status: FRIEND_STATUS.ACCEPTED,
    mutualFriends: 1
  },
  {
    id: 'friend4',
    username: 'study_buddy',
    displayName: 'Mai 🌺',
    avatar: '🌺',
    level: 22,
    rank: 'Intermediate',
    currentStreak: 12,
    totalXP: 18000,
    isOnline: false,
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: FRIEND_STATUS.PENDING,
    mutualFriends: 2
  }
];

export const mockFriendRequests = [
  {
    id: 'req1',
    from: {
      id: 'user1',
      username: 'new_learner',
      displayName: 'Alex 🎯',
      avatar: '🎯',
      level: 5,
      rank: 'Beginner'
    },
    message: 'Chào bạn! Mình cũng đang học tiếng Nhật, kết bạn nhé!',
    sentAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'req2',
    from: {
      id: 'user2',
      username: 'japanese_student',
      displayName: 'Hana 🌸',
      avatar: '🌸',
      level: 12,
      rank: 'Intermediate'
    },
    message: 'Mình thấy bạn học rất chăm chỉ, cùng học nhé!',
    sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
];

export const mockActivities = [
  {
    id: 'act1',
    userId: 'friend1',
    username: 'sakura_learner',
    displayName: 'Sakura 🌸',
    avatar: '🌸',
    type: ACTIVITY_TYPES.BADGE_UNLOCKED,
    title: 'Đã unlock badge "Bậc thầy bài học"',
    description: 'Hoàn thành 50 bài học',
    icon: '🏆',
    xpEarned: 200,
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: 'act2',
    userId: 'friend2',
    username: 'japanese_master',
    displayName: 'Kenji 🗾',
    avatar: '🗾',
    type: ACTIVITY_TYPES.LEVEL_UP,
    title: 'Đã lên cấp 28!',
    description: 'Chúc mừng bạn đã đạt cấp độ mới',
    icon: '⭐',
    xpEarned: 0,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'act3',
    userId: 'friend3',
    username: 'anime_fan',
    displayName: 'Yuki ❄️',
    avatar: '❄️',
    type: ACTIVITY_TYPES.CHALLENGE_COMPLETED,
    title: 'Đã hoàn thành thử thách "Học viên chăm chỉ"',
    description: 'Hoàn thành 3 bài học hôm nay',
    icon: '🎯',
    xpEarned: 50,
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  },
  {
    id: 'act4',
    userId: 'friend1',
    username: 'sakura_learner',
    displayName: 'Sakura 🌸',
    avatar: '🌸',
    type: ACTIVITY_TYPES.STREAK_MILESTONE,
    title: 'Đạt streak 7 ngày!',
    description: 'Duy trì học tập liên tiếp 7 ngày',
    icon: '🔥',
    xpEarned: 100,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
];

export const mockLeaderboard = [
  {
    rank: 1,
    userId: 'top_learner',
    username: 'japanese_master',
    displayName: 'Kenji 🗾',
    avatar: '🗾',
    level: 28,
    rank: 'Advanced',
    totalXP: 25000,
    currentStreak: 15,
    badges: 12
  },
  {
    rank: 2,
    userId: 'friend1',
    username: 'sakura_learner',
    displayName: 'Sakura 🌸',
    avatar: '🌸',
    level: 15,
    rank: 'Intermediate',
    totalXP: 12500,
    currentStreak: 7,
    badges: 8
  },
  {
    rank: 3,
    userId: 'friend4',
    username: 'study_buddy',
    displayName: 'Mai 🌺',
    avatar: '🌺',
    level: 22,
    rank: 'Intermediate',
    totalXP: 18000,
    currentStreak: 12,
    badges: 10
  },
  {
    rank: 4,
    userId: 'friend3',
    username: 'anime_fan',
    displayName: 'Yuki ❄️',
    avatar: '❄️',
    level: 8,
    rank: 'Beginner',
    totalXP: 4500,
    currentStreak: 3,
    badges: 4
  }
];

export const mockStudyGroups = [
  {
    id: 'group1',
    name: 'Nhóm học N5',
    description: 'Nhóm học tập cho kỳ thi JLPT N5',
    avatar: '📚',
    memberCount: 15,
    maxMembers: 20,
    isPublic: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    owner: {
      id: 'owner1',
      username: 'group_owner',
      displayName: 'Sensei 🧑‍🏫',
      avatar: '🧑‍🏫'
    }
  },
  {
    id: 'group2',
    name: 'Anime Lovers',
    description: 'Học tiếng Nhật qua anime và manga',
    avatar: '🎌',
    memberCount: 8,
    maxMembers: 15,
    isPublic: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    owner: {
      id: 'owner2',
      username: 'anime_fan',
      displayName: 'Yuki ❄️',
      avatar: '❄️'
    }
  }
];

export const getActivityIcon = (type) => {
  switch (type) {
    case ACTIVITY_TYPES.LESSON_COMPLETED:
      return '📚';
    case ACTIVITY_TYPES.BADGE_UNLOCKED:
      return '🏆';
    case ACTIVITY_TYPES.CHALLENGE_COMPLETED:
      return '🎯';
    case ACTIVITY_TYPES.LEVEL_UP:
      return '⭐';
    case ACTIVITY_TYPES.STREAK_MILESTONE:
      return '🔥';
    case ACTIVITY_TYPES.SRS_REVIEW:
      return '🔄';
    default:
      return '📝';
  }
};

export const getActivityColor = (type) => {
  switch (type) {
    case ACTIVITY_TYPES.LESSON_COMPLETED:
      return '#4CAF50';
    case ACTIVITY_TYPES.BADGE_UNLOCKED:
      return '#FF9800';
    case ACTIVITY_TYPES.CHALLENGE_COMPLETED:
      return '#2196F3';
    case ACTIVITY_TYPES.LEVEL_UP:
      return '#9C27B0';
    case ACTIVITY_TYPES.STREAK_MILESTONE:
      return '#F44336';
    case ACTIVITY_TYPES.SRS_REVIEW:
      return '#00BCD4';
    default:
      return '#6c757d';
  }
}; 