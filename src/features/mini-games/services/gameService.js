import { 
  GAME_TYPES, 
  GAME_DIFFICULTY,
  getGameData, 
  getGameReward, 
  getGameDescription 
} from '../data/gamesData.js';

class GameService {
  constructor() {
    this.gameHistory = [];
    this.userStats = {
      totalGames: 0,
      totalScore: 0,
      averageScore: 0,
      bestScores: {},
      gamesPlayed: {},
      totalXP: 0,
      totalCoins: 0
    };
    this.loadStats();
  }

  // Game Management
  startGame(gameType, difficulty) {
    const gameData = getGameData(gameType, difficulty);
    const gameInfo = getGameDescription(gameType);
    
    const game = {
      id: `game_${Date.now()}`,
      type: gameType,
      difficulty,
      startTime: new Date().toISOString(),
      data: gameData,
      info: gameInfo,
      status: 'playing',
      score: 0,
      progress: 0,
      mistakes: 0
    };

    return game;
  }

  endGame(gameId, finalScore, mistakes = 0) {
    const game = this.gameHistory.find(g => g.id === gameId);
    if (!game) return null;

    game.endTime = new Date().toISOString();
    game.status = 'completed';
    game.score = finalScore;
    game.mistakes = mistakes;
    game.duration = new Date(game.endTime) - new Date(game.startTime);

    // Calculate rewards
    const rewards = getGameReward(game.type, game.difficulty);
    const scoreMultiplier = Math.max(0.5, finalScore / 100);
    const xpEarned = Math.floor(rewards.xp * scoreMultiplier);
    const coinsEarned = Math.floor(rewards.coins * scoreMultiplier);

    game.xpEarned = xpEarned;
    game.coinsEarned = coinsEarned;

    // Update stats
    this.updateStats(game);

    // Save to history
    this.gameHistory.push(game);
    this.saveStats();

    return {
      game,
      rewards: { xp: xpEarned, coins: coinsEarned }
    };
  }

  // Game Logic
  getMemoryMatchCards(gameType, difficulty) {
    const data = getGameData(gameType, difficulty);
    const cards = [];
    
    // Create pairs of cards
    data.forEach((item, index) => {
      cards.push({
        id: `word_${index}`,
        type: 'word',
        content: item.word,
        meaning: item.meaning,
        emoji: item.emoji,
        matched: false
      });
      
      cards.push({
        id: `meaning_${index}`,
        type: 'meaning',
        content: item.meaning,
        word: item.word,
        emoji: item.emoji,
        matched: false
      });
    });

    // Shuffle cards
    return this.shuffleArray(cards);
  }

  getWordScrambleWords(difficulty) {
    return getGameData(GAME_TYPES.WORD_SCRAMBLE, difficulty);
  }

  getSpeedTypingWords(difficulty) {
    return getGameData(GAME_TYPES.SPEED_TYPING, difficulty);
  }

  getKanjiPuzzleData(difficulty) {
    return getGameData(GAME_TYPES.KANJI_PUZZLE, difficulty);
  }

  getSoundMatchData(difficulty) {
    return getGameData(GAME_TYPES.SOUND_MATCH, difficulty);
  }

  getGrammarQuizQuestions(difficulty) {
    return getGameData(GAME_TYPES.GRAMMAR_QUIZ, difficulty);
  }

  // Game Validation
  validateMemoryMatch(wordCard, meaningCard) {
    return wordCard.word === meaningCard.word;
  }

  validateWordScramble(userAnswer, correctWord) {
    return userAnswer.trim().toLowerCase() === correctWord.toLowerCase();
  }

  validateSpeedTyping(userInput, correctRomaji) {
    return userInput.trim().toLowerCase() === correctRomaji.toLowerCase();
  }

  validateKanjiPuzzle(userAnswer, correctKanji) {
    return userAnswer === correctKanji;
  }

  validateSoundMatch(userAnswer, correctWord) {
    return userAnswer === correctWord;
  }

  validateGrammarQuiz(userAnswer, correctIndex) {
    return userAnswer === correctIndex;
  }

  // Score Calculation
  calculateScore(gameType, correctAnswers, totalQuestions, timeSpent, mistakes) {
    let baseScore = (correctAnswers / totalQuestions) * 100;
    
    // Time bonus (faster = more points)
    const timeBonus = Math.max(0, 20 - (timeSpent / 1000)); // 20 points for very fast completion
    
    // Mistake penalty
    const mistakePenalty = mistakes * 5;
    
    // Difficulty multiplier
    const difficultyMultipliers = {
      [GAME_DIFFICULTY.EASY]: 1,
      [GAME_DIFFICULTY.MEDIUM]: 1.5,
      [GAME_DIFFICULTY.HARD]: 2
    };
    
    const finalScore = Math.max(0, (baseScore + timeBonus - mistakePenalty) * difficultyMultipliers[gameType.difficulty]);
    
    return Math.floor(finalScore);
  }

  // Statistics
  updateStats(game) {
    this.userStats.totalGames++;
    this.userStats.totalScore += game.score;
    this.userStats.averageScore = this.userStats.totalScore / this.userStats.totalGames;
    this.userStats.totalXP += game.xpEarned;
    this.userStats.totalCoins += game.coinsEarned;

    // Update best scores
    const gameKey = `${game.type}_${game.difficulty}`;
    if (!this.userStats.bestScores[gameKey] || game.score > this.userStats.bestScores[gameKey]) {
      this.userStats.bestScores[gameKey] = game.score;
    }

    // Update games played
    if (!this.userStats.gamesPlayed[game.type]) {
      this.userStats.gamesPlayed[game.type] = 0;
    }
    this.userStats.gamesPlayed[game.type]++;
  }

  getStats() {
    return this.userStats;
  }

  getGameHistory(limit = 20) {
    return this.gameHistory
      .filter(game => game.status === 'completed')
      .sort((a, b) => new Date(b.endTime) - new Date(a.endTime))
      .slice(0, limit);
  }

  getBestScores() {
    return this.userStats.bestScores;
  }

  getGamesPlayed() {
    return this.userStats.gamesPlayed;
  }

  // Leaderboard
  getGameLeaderboard(gameType, difficulty, limit = 10) {
    const gameKey = `${gameType}_${difficulty}`;
    const relevantGames = this.gameHistory.filter(game => 
      game.type === gameType && 
      game.difficulty === difficulty && 
      game.status === 'completed'
    );

    return relevantGames
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((game, index) => ({
        rank: index + 1,
        score: game.score,
        player: 'Bạn',
        date: game.endTime,
        duration: game.duration
      }));
  }

  // Achievements
  checkAchievements() {
    const achievements = [];
    
    // First game achievement
    if (this.userStats.totalGames === 1) {
      achievements.push({
        id: 'first_game',
        title: 'Game Master',
        description: 'Chơi game đầu tiên',
        icon: '🎮',
        xpReward: 50
      });
    }

    // 10 games achievement
    if (this.userStats.totalGames === 10) {
      achievements.push({
        id: 'ten_games',
        title: 'Game Enthusiast',
        description: 'Chơi 10 games',
        icon: '🎯',
        xpReward: 100
      });
    }

    // 100 games achievement
    if (this.userStats.totalGames === 100) {
      achievements.push({
        id: 'hundred_games',
        title: 'Game Legend',
        description: 'Chơi 100 games',
        icon: '🏆',
        xpReward: 500
      });
    }

    // Perfect score achievement
    const perfectGames = this.gameHistory.filter(game => game.score === 100);
    if (perfectGames.length >= 5) {
      achievements.push({
        id: 'perfect_scores',
        title: 'Perfect Player',
        description: 'Đạt điểm tuyệt đối 5 lần',
        icon: '⭐',
        xpReward: 200
      });
    }

    // All game types achievement
    const gameTypes = Object.values(GAME_TYPES);
    const playedTypes = Object.keys(this.userStats.gamesPlayed);
    if (playedTypes.length === gameTypes.length) {
      achievements.push({
        id: 'all_games',
        title: 'Game Explorer',
        description: 'Chơi tất cả loại games',
        icon: '🌍',
        xpReward: 300
      });
    }

    return achievements;
  }

  // Utility functions
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Local storage
  saveStats() {
    try {
      localStorage.setItem('gameStats', JSON.stringify(this.userStats));
      localStorage.setItem('gameHistory', JSON.stringify(this.gameHistory));
    } catch (error) {
      console.error('Failed to save game stats:', error);
    }
  }

  loadStats() {
    try {
      const savedStats = localStorage.getItem('gameStats');
      const savedHistory = localStorage.getItem('gameHistory');
      
      if (savedStats) {
        this.userStats = JSON.parse(savedStats);
      }
      
      if (savedHistory) {
        this.gameHistory = JSON.parse(savedHistory);
      }
    } catch (error) {
      console.error('Failed to load game stats:', error);
    }
  }

  resetStats() {
    this.userStats = {
      totalGames: 0,
      totalScore: 0,
      averageScore: 0,
      bestScores: {},
      gamesPlayed: {},
      totalXP: 0,
      totalCoins: 0
    };
    this.gameHistory = [];
    this.saveStats();
  }
}

export default new GameService(); 