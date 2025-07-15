import { challengesData, getDailyChallenges, getWeeklyChallenges } from '../data/challengesData.js';

class ChallengeService {
  constructor() {
    this.challenges = challengesData;
  }

  // Lấy thử thách hàng ngày ngẫu nhiên
  getRandomDailyChallenges(count = 3) {
    const dailyChallenges = getDailyChallenges();
    const shuffled = [...dailyChallenges].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Lấy thử thách tuần ngẫu nhiên
  getRandomWeeklyChallenges(count = 2) {
    const weeklyChallenges = getWeeklyChallenges();
    const shuffled = [...weeklyChallenges].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Kiểm tra tiến độ thử thách
  checkChallengeProgress(challenge, userStats) {
    const { type, target } = challenge;
    let currentProgress = 0;

    switch (type) {
      case 'lesson':
        currentProgress = userStats.lessonsCompletedToday || 0;
        break;
      case 'srs':
        currentProgress = userStats.srsReviewsToday || 0;
        break;
      case 'perfect':
        currentProgress = userStats.perfectScoresToday || 0;
        break;
      case 'xp':
        currentProgress = userStats.xpEarnedToday || 0;
        break;
      case 'time':
        currentProgress = userStats.studyTimeToday || 0; // tính bằng phút
        break;
      case 'streak':
        currentProgress = userStats.currentStreak || 0;
        break;
      default:
        currentProgress = 0;
    }

    const progress = Math.min((currentProgress / target) * 100, 100);
    const isCompleted = currentProgress >= target;

    return {
      currentProgress,
      target,
      progress: Math.round(progress),
      isCompleted
    };
  }

  // Kiểm tra tiến độ thử thách tuần
  checkWeeklyChallengeProgress(challenge, userStats) {
    const { type, target } = challenge;
    let currentProgress = 0;

    switch (type) {
      case 'lesson':
        currentProgress = userStats.lessonsCompletedThisWeek || 0;
        break;
      case 'srs':
        currentProgress = userStats.srsReviewsThisWeek || 0;
        break;
      case 'xp':
        currentProgress = userStats.xpEarnedThisWeek || 0;
        break;
      default:
        currentProgress = 0;
    }

    const progress = Math.min((currentProgress / target) * 100, 100);
    const isCompleted = currentProgress >= target;

    return {
      currentProgress,
      target,
      progress: Math.round(progress),
      isCompleted
    };
  }

  // Lấy thử thách theo ID
  getChallengeById(id) {
    return this.challenges.find(challenge => challenge.id === id);
  }

  // Lấy thử thách theo loại
  getChallengesByType(type) {
    return this.challenges.filter(challenge => challenge.type === type);
  }

  // Lấy thử thách theo độ khó
  getChallengesByDifficulty(difficulty) {
    return this.challenges.filter(challenge => challenge.difficulty === difficulty);
  }

  // Tính toán phần thưởng XP từ thử thách đã hoàn thành
  calculateTotalXpReward(completedChallenges) {
    return completedChallenges.reduce((total, challengeId) => {
      const challenge = this.getChallengeById(challengeId);
      return total + (challenge?.xpReward || 0);
    }, 0);
  }

  // Lấy thống kê thử thách
  getChallengeStats(userStats, completedChallenges = []) {
    const dailyChallenges = getDailyChallenges();
    const weeklyChallenges = getWeeklyChallenges();

    const dailyProgress = dailyChallenges.map(challenge => ({
      ...challenge,
      ...this.checkChallengeProgress(challenge, userStats),
      isCompleted: completedChallenges.includes(challenge.id)
    }));

    const weeklyProgress = weeklyChallenges.map(challenge => ({
      ...challenge,
      ...this.checkWeeklyChallengeProgress(challenge, userStats),
      isCompleted: completedChallenges.includes(challenge.id)
    }));

    const completedDaily = dailyProgress.filter(c => c.isCompleted).length;
    const completedWeekly = weeklyProgress.filter(c => c.isCompleted).length;

    return {
      daily: {
        total: dailyChallenges.length,
        completed: completedDaily,
        progress: Math.round((completedDaily / dailyChallenges.length) * 100),
        challenges: dailyProgress
      },
      weekly: {
        total: weeklyChallenges.length,
        completed: completedWeekly,
        progress: Math.round((completedWeekly / weeklyChallenges.length) * 100),
        challenges: weeklyProgress
      },
      totalXpEarned: this.calculateTotalXpReward(completedChallenges)
    };
  }

  // Lấy thử thách gần hoàn thành
  getNearCompletionChallenges(userStats, completedChallenges = [], limit = 3) {
    const allChallenges = [...getDailyChallenges(), ...getWeeklyChallenges()];
    
    return allChallenges
      .filter(challenge => !completedChallenges.includes(challenge.id))
      .map(challenge => {
        const progress = challenge.category === 'weekly' 
          ? this.checkWeeklyChallengeProgress(challenge, userStats)
          : this.checkChallengeProgress(challenge, userStats);
        
        return { ...challenge, ...progress };
      })
      .sort((a, b) => b.progress - a.progress)
      .slice(0, limit);
  }

  // Tạo thử thách mới cho ngày hôm nay
  generateDailyChallenges() {
    const easyChallenges = this.getChallengesByDifficulty('easy');
    const mediumChallenges = this.getChallengesByDifficulty('medium');
    const hardChallenges = this.getChallengesByDifficulty('hard');

    const selectedChallenges = [
      ...this.getRandomChallenges(easyChallenges, 1),
      ...this.getRandomChallenges(mediumChallenges, 1),
      ...this.getRandomChallenges(hardChallenges, 1)
    ];

    return selectedChallenges;
  }

  // Tạo thử thách mới cho tuần này
  generateWeeklyChallenges() {
    const weeklyChallenges = getWeeklyChallenges();
    return this.getRandomChallenges(weeklyChallenges, 2);
  }

  // Lấy thử thách ngẫu nhiên từ danh sách
  getRandomChallenges(challenges, count) {
    const shuffled = [...challenges].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Kiểm tra xem có thử thách mới nào được hoàn thành không
  checkNewCompletions(userStats, completedChallenges = []) {
    const allChallenges = [...getDailyChallenges(), ...getWeeklyChallenges()];
    const newCompletions = [];

    allChallenges.forEach(challenge => {
      if (!completedChallenges.includes(challenge.id)) {
        const progress = challenge.category === 'weekly'
          ? this.checkWeeklyChallengeProgress(challenge, userStats)
          : this.checkChallengeProgress(challenge, userStats);

        if (progress.isCompleted) {
          newCompletions.push({
            ...challenge,
            ...progress,
            completedAt: new Date().toISOString()
          });
        }
      }
    });

    return newCompletions;
  }

  // Lấy thông tin chi tiết về thử thách
  getChallengeDetails(challengeId, userStats = {}) {
    const challenge = this.getChallengeById(challengeId);
    if (!challenge) return null;

    const progress = challenge.category === 'weekly'
      ? this.checkWeeklyChallengeProgress(challenge, userStats)
      : this.checkChallengeProgress(challenge, userStats);

    return {
      ...challenge,
      ...progress
    };
  }
}

export default new ChallengeService(); 