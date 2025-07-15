export const CHALLENGE_TYPES = {
  LESSON: 'lesson',
  SRS: 'srs',
  STREAK: 'streak',
  XP: 'xp',
  PERFECT: 'perfect',
  TIME: 'time',
  SOCIAL: 'social'
};

export const CHALLENGE_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

export const challengesData = [
  // Lesson Challenges
  {
    id: 'complete_3_lessons',
    name: 'Học viên chăm chỉ',
    description: 'Hoàn thành 3 bài học hôm nay',
    type: CHALLENGE_TYPES.LESSON,
    difficulty: CHALLENGE_DIFFICULTY.EASY,
    icon: '📚',
    target: 3,
    xpReward: 50,
    category: 'daily'
  },
  {
    id: 'complete_5_lessons',
    name: 'Học viên xuất sắc',
    description: 'Hoàn thành 5 bài học hôm nay',
    type: CHALLENGE_TYPES.LESSON,
    difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
    icon: '🎓',
    target: 5,
    xpReward: 100,
    category: 'daily'
  },
  {
    id: 'complete_10_lessons',
    name: 'Học viên quyết tâm',
    description: 'Hoàn thành 10 bài học hôm nay',
    type: CHALLENGE_TYPES.LESSON,
    difficulty: CHALLENGE_DIFFICULTY.HARD,
    icon: '🔥',
    target: 10,
    xpReward: 200,
    category: 'daily'
  },

  // SRS Challenges
  {
    id: 'complete_10_srs',
    name: 'Ôn tập cơ bản',
    description: 'Hoàn thành 10 bài ôn tập SRS',
    type: CHALLENGE_TYPES.SRS,
    difficulty: CHALLENGE_DIFFICULTY.EASY,
    icon: '🔄',
    target: 10,
    xpReward: 40,
    category: 'daily'
  },
  {
    id: 'complete_25_srs',
    name: 'Ôn tập nâng cao',
    description: 'Hoàn thành 25 bài ôn tập SRS',
    type: CHALLENGE_TYPES.SRS,
    difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
    icon: '🧠',
    target: 25,
    xpReward: 80,
    category: 'daily'
  },
  {
    id: 'complete_50_srs',
    name: 'Ôn tập chuyên sâu',
    description: 'Hoàn thành 50 bài ôn tập SRS',
    type: CHALLENGE_TYPES.SRS,
    difficulty: CHALLENGE_DIFFICULTY.HARD,
    icon: '⚡',
    target: 50,
    xpReward: 150,
    category: 'daily'
  },

  // Perfect Score Challenges
  {
    id: 'perfect_1_lesson',
    name: 'Hoàn hảo lần đầu',
    description: 'Đạt 100% điểm trong 1 bài học',
    type: CHALLENGE_TYPES.PERFECT,
    difficulty: CHALLENGE_DIFFICULTY.EASY,
    icon: '⭐',
    target: 1,
    xpReward: 60,
    category: 'daily'
  },
  {
    id: 'perfect_3_lessons',
    name: 'Hoàn hảo liên tiếp',
    description: 'Đạt 100% điểm trong 3 bài học',
    type: CHALLENGE_TYPES.PERFECT,
    difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
    icon: '🌟',
    target: 3,
    xpReward: 120,
    category: 'daily'
  },
  {
    id: 'perfect_5_lessons',
    name: 'Hoàn hảo tuyệt đối',
    description: 'Đạt 100% điểm trong 5 bài học',
    type: CHALLENGE_TYPES.PERFECT,
    difficulty: CHALLENGE_DIFFICULTY.HARD,
    icon: '👑',
    target: 5,
    xpReward: 250,
    category: 'daily'
  },

  // XP Challenges
  {
    id: 'earn_100_xp',
    name: 'Thu thập XP',
    description: 'Kiếm được 100 XP hôm nay',
    type: CHALLENGE_TYPES.XP,
    difficulty: CHALLENGE_DIFFICULTY.EASY,
    icon: '💎',
    target: 100,
    xpReward: 30,
    category: 'daily'
  },
  {
    id: 'earn_300_xp',
    name: 'Thu thập XP nâng cao',
    description: 'Kiếm được 300 XP hôm nay',
    type: CHALLENGE_TYPES.XP,
    difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
    icon: '🏆',
    target: 300,
    xpReward: 70,
    category: 'daily'
  },
  {
    id: 'earn_500_xp',
    name: 'Thu thập XP chuyên nghiệp',
    description: 'Kiếm được 500 XP hôm nay',
    type: CHALLENGE_TYPES.XP,
    difficulty: CHALLENGE_DIFFICULTY.HARD,
    icon: '💫',
    target: 500,
    xpReward: 120,
    category: 'daily'
  },

  // Time-based Challenges
  {
    id: 'study_15_minutes',
    name: 'Học tập ngắn',
    description: 'Học tập trong 15 phút',
    type: CHALLENGE_TYPES.TIME,
    difficulty: CHALLENGE_DIFFICULTY.EASY,
    icon: '⏰',
    target: 15,
    xpReward: 25,
    category: 'daily'
  },
  {
    id: 'study_30_minutes',
    name: 'Học tập trung bình',
    description: 'Học tập trong 30 phút',
    type: CHALLENGE_TYPES.TIME,
    difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
    icon: '⏱️',
    target: 30,
    xpReward: 50,
    category: 'daily'
  },
  {
    id: 'study_60_minutes',
    name: 'Học tập chuyên sâu',
    description: 'Học tập trong 60 phút',
    type: CHALLENGE_TYPES.TIME,
    difficulty: CHALLENGE_DIFFICULTY.HARD,
    icon: '🕐',
    target: 60,
    xpReward: 100,
    category: 'daily'
  },

  // Streak Challenges
  {
    id: 'maintain_streak',
    name: 'Duy trì streak',
    description: 'Duy trì streak học tập',
    type: CHALLENGE_TYPES.STREAK,
    difficulty: CHALLENGE_DIFFICULTY.EASY,
    icon: '🔥',
    target: 1,
    xpReward: 20,
    category: 'daily'
  },

  // Weekly Challenges
  {
    id: 'complete_20_lessons_week',
    name: 'Học viên tuần',
    description: 'Hoàn thành 20 bài học trong tuần',
    type: CHALLENGE_TYPES.LESSON,
    difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
    icon: '📅',
    target: 20,
    xpReward: 150,
    category: 'weekly'
  },
  {
    id: 'complete_100_srs_week',
    name: 'Ôn tập tuần',
    description: 'Hoàn thành 100 bài ôn tập SRS trong tuần',
    type: CHALLENGE_TYPES.SRS,
    difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
    icon: '📊',
    target: 100,
    xpReward: 120,
    category: 'weekly'
  },
  {
    id: 'earn_1000_xp_week',
    name: 'Thu thập XP tuần',
    description: 'Kiếm được 1000 XP trong tuần',
    type: CHALLENGE_TYPES.XP,
    difficulty: CHALLENGE_DIFFICULTY.MEDIUM,
    icon: '💰',
    target: 1000,
    xpReward: 200,
    category: 'weekly'
  }
];

export const getChallengesByType = (type) => {
  return challengesData.filter(challenge => challenge.type === type);
};

export const getChallengesByDifficulty = (difficulty) => {
  return challengesData.filter(challenge => challenge.difficulty === difficulty);
};

export const getChallengesByCategory = (category) => {
  return challengesData.filter(challenge => challenge.category === category);
};

export const getChallengeById = (id) => {
  return challengesData.find(challenge => challenge.id === id);
};

export const getDailyChallenges = () => {
  return getChallengesByCategory('daily');
};

export const getWeeklyChallenges = () => {
  return getChallengesByCategory('weekly');
}; 