export const BADGE_TYPES = {
  LESSON: 'lesson',
  STREAK: 'streak',
  SRS: 'srs',
  XP: 'xp',
  SOCIAL: 'social',
  SPECIAL: 'special'
};

export const BADGE_RARITY = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary'
};

export const badgesData = [
  // Lesson Badges
  {
    id: 'first_lesson',
    name: 'Bắt đầu hành trình',
    description: 'Hoàn thành bài học đầu tiên',
    type: BADGE_TYPES.LESSON,
    rarity: BADGE_RARITY.COMMON,
    icon: '🎯',
    condition: { lessonsCompleted: 1 },
    xpReward: 50
  },
  {
    id: 'lesson_master',
    name: 'Bậc thầy bài học',
    description: 'Hoàn thành 50 bài học',
    type: BADGE_TYPES.LESSON,
    rarity: BADGE_RARITY.RARE,
    icon: '📚',
    condition: { lessonsCompleted: 50 },
    xpReward: 200
  },
  {
    id: 'perfect_lesson',
    name: 'Hoàn hảo',
    description: 'Đạt 100% điểm trong một bài học',
    type: BADGE_TYPES.LESSON,
    rarity: BADGE_RARITY.RARE,
    icon: '⭐',
    condition: { perfectScore: 1 },
    xpReward: 150
  },

  // Streak Badges
  {
    id: 'week_warrior',
    name: 'Chiến binh tuần',
    description: 'Duy trì streak 7 ngày',
    type: BADGE_TYPES.STREAK,
    rarity: BADGE_RARITY.COMMON,
    icon: '🔥',
    condition: { streakDays: 7 },
    xpReward: 100
  },
  {
    id: 'month_master',
    name: 'Bậc thầy tháng',
    description: 'Duy trì streak 30 ngày',
    type: BADGE_TYPES.STREAK,
    rarity: BADGE_RARITY.EPIC,
    icon: '🌙',
    condition: { streakDays: 30 },
    xpReward: 500
  },
  {
    id: 'streak_legend',
    name: 'Huyền thoại streak',
    description: 'Duy trì streak 100 ngày',
    type: BADGE_TYPES.STREAK,
    rarity: BADGE_RARITY.LEGENDARY,
    icon: '👑',
    condition: { streakDays: 100 },
    xpReward: 1000
  },

  // SRS Badges
  {
    id: 'srs_beginner',
    name: 'Người mới SRS',
    description: 'Hoàn thành 10 bài ôn tập SRS',
    type: BADGE_TYPES.SRS,
    rarity: BADGE_RARITY.COMMON,
    icon: '🔄',
    condition: { srsReviews: 10 },
    xpReward: 75
  },
  {
    id: 'srs_expert',
    name: 'Chuyên gia SRS',
    description: 'Hoàn thành 100 bài ôn tập SRS',
    type: BADGE_TYPES.SRS,
    rarity: BADGE_RARITY.RARE,
    icon: '🧠',
    condition: { srsReviews: 100 },
    xpReward: 300
  },
  {
    id: 'srs_master',
    name: 'Bậc thầy SRS',
    description: 'Hoàn thành 500 bài ôn tập SRS',
    type: BADGE_TYPES.SRS,
    rarity: BADGE_RARITY.EPIC,
    icon: '🎓',
    condition: { srsReviews: 500 },
    xpReward: 750
  },

  // XP Badges
  {
    id: 'xp_collector',
    name: 'Thu thập XP',
    description: 'Đạt 1000 XP',
    type: BADGE_TYPES.XP,
    rarity: BADGE_RARITY.COMMON,
    icon: '💎',
    condition: { totalXP: 1000 },
    xpReward: 100
  },
  {
    id: 'xp_hunter',
    name: 'Thợ săn XP',
    description: 'Đạt 10000 XP',
    type: BADGE_TYPES.XP,
    rarity: BADGE_RARITY.RARE,
    icon: '🏆',
    condition: { totalXP: 10000 },
    xpReward: 400
  },
  {
    id: 'xp_legend',
    name: 'Huyền thoại XP',
    description: 'Đạt 50000 XP',
    type: BADGE_TYPES.XP,
    rarity: BADGE_RARITY.LEGENDARY,
    icon: '🌟',
    condition: { totalXP: 50000 },
    xpReward: 1500
  },

  // Level Badges
  {
    id: 'level_10',
    name: 'Cấp độ 10',
    description: 'Đạt cấp độ 10',
    type: BADGE_TYPES.XP,
    rarity: BADGE_RARITY.COMMON,
    icon: '🔟',
    condition: { level: 10 },
    xpReward: 200
  },
  {
    id: 'level_25',
    name: 'Cấp độ 25',
    description: 'Đạt cấp độ 25',
    type: BADGE_TYPES.XP,
    rarity: BADGE_RARITY.RARE,
    icon: '2️⃣5️⃣',
    condition: { level: 25 },
    xpReward: 500
  },
  {
    id: 'level_50',
    name: 'Cấp độ 50',
    description: 'Đạt cấp độ 50',
    type: BADGE_TYPES.XP,
    rarity: BADGE_RARITY.EPIC,
    icon: '5️⃣0️⃣',
    condition: { level: 50 },
    xpReward: 1000
  },

  // Special Badges
  {
    id: 'early_bird',
    name: 'Chim sớm',
    description: 'Học vào buổi sáng (6-9h)',
    type: BADGE_TYPES.SPECIAL,
    rarity: BADGE_RARITY.COMMON,
    icon: '🌅',
    condition: { morningStudy: 1 },
    xpReward: 50
  },
  {
    id: 'night_owl',
    name: 'Cú đêm',
    description: 'Học vào buổi tối (22-24h)',
    type: BADGE_TYPES.SPECIAL,
    rarity: BADGE_RARITY.COMMON,
    icon: '🦉',
    condition: { nightStudy: 1 },
    xpReward: 50
  },
  {
    id: 'weekend_warrior',
    name: 'Chiến binh cuối tuần',
    description: 'Học vào cuối tuần',
    type: BADGE_TYPES.SPECIAL,
    rarity: BADGE_RARITY.COMMON,
    icon: '🎉',
    condition: { weekendStudy: 1 },
    xpReward: 75
  }
];

export const getBadgeById = (id) => {
  return badgesData.find(badge => badge.id === id);
};

export const getBadgesByType = (type) => {
  return badgesData.filter(badge => badge.type === type);
};

export const getBadgesByRarity = (rarity) => {
  return badgesData.filter(badge => badge.rarity === rarity);
}; 