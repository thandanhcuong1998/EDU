import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  startGame,
  endGame,
  loadGameStats,
  updateGameProgress,
  updateGameScore,
  updateGameMistakes,
  pauseGame,
  resumeGame,
  resetCurrentGame,
  selectCurrentGame,
  selectUserStats,
  selectGameHistory,
  selectAchievements,
  selectGameState,
  selectGameProgress,
  selectGameScore,
  selectGameMistakes,
  selectGameLoading,
  selectGameError
} from '../state/gameSlice.js';
import { addXP } from '../../xp/state/xpSlice.js';
import gameService from '../services/gameService.js';
import { GAME_TYPES, GAME_DIFFICULTY } from '../data/gamesData.js';

export const useGameSystem = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const currentGame = useSelector(selectCurrentGame);
  const userStats = useSelector(selectUserStats);
  const gameHistory = useSelector(selectGameHistory);
  const achievements = useSelector(selectAchievements);
  const gameState = useSelector(selectGameState);
  const gameProgress = useSelector(selectGameProgress);
  const gameScore = useSelector(selectGameScore);
  const gameMistakes = useSelector(selectGameMistakes);
  const loading = useSelector(selectGameLoading);
  const error = useSelector(selectGameError);

  // Load initial data
  useEffect(() => {
    dispatch(loadGameStats());
  }, [dispatch]);

  // Game Management
  const handleStartGame = useCallback((gameType, difficulty) => {
    dispatch(startGame({ gameType, difficulty }));
  }, [dispatch]);

  const handleEndGame = useCallback((finalScore, mistakes = 0) => {
    if (currentGame) {
      dispatch(endGame({ 
        gameId: currentGame.id, 
        finalScore, 
        mistakes 
      }));
    }
  }, [dispatch, currentGame]);

  const handlePauseGame = useCallback(() => {
    dispatch(pauseGame());
  }, [dispatch]);

  const handleResumeGame = useCallback(() => {
    dispatch(resumeGame());
  }, [dispatch]);

  const handleResetGame = useCallback(() => {
    dispatch(resetCurrentGame());
  }, [dispatch]);

  // Game Progress Management
  const handleUpdateProgress = useCallback((progress) => {
    dispatch(updateGameProgress(progress));
  }, [dispatch]);

  const handleUpdateScore = useCallback((score) => {
    dispatch(updateGameScore(score));
  }, [dispatch]);

  const handleUpdateMistakes = useCallback((mistakes) => {
    dispatch(updateGameMistakes(mistakes));
  }, [dispatch]);

  // Game Logic Helpers
  const getGameData = useCallback((gameType, difficulty) => {
    return gameService.getGameData(gameType, difficulty);
  }, []);

  const validateAnswer = useCallback((gameType, userAnswer, correctAnswer) => {
    switch (gameType) {
      case GAME_TYPES.MEMORY_MATCH:
        return gameService.validateMemoryMatch(userAnswer, correctAnswer);
      case GAME_TYPES.WORD_SCRAMBLE:
        return gameService.validateWordScramble(userAnswer, correctAnswer);
      case GAME_TYPES.SPEED_TYPING:
        return gameService.validateSpeedTyping(userAnswer, correctAnswer);
      case GAME_TYPES.KANJI_PUZZLE:
        return gameService.validateKanjiPuzzle(userAnswer, correctAnswer);
      case GAME_TYPES.SOUND_MATCH:
        return gameService.validateSoundMatch(userAnswer, correctAnswer);
      case GAME_TYPES.GRAMMAR_QUIZ:
        return gameService.validateGrammarQuiz(userAnswer, correctAnswer);
      default:
        return false;
    }
  }, []);

  const calculateScore = useCallback((gameType, correctAnswers, totalQuestions, timeSpent, mistakes) => {
    return gameService.calculateScore(gameType, correctAnswers, totalQuestions, timeSpent, mistakes);
  }, []);

  // Statistics
  const getGameStats = useCallback(() => {
    return gameService.getStats();
  }, []);

  const getBestScore = useCallback((gameType, difficulty) => {
    const gameKey = `${gameType}_${difficulty}`;
    return userStats.bestScores[gameKey] || 0;
  }, [userStats.bestScores]);

  const getGamesPlayed = useCallback((gameType) => {
    return userStats.gamesPlayed[gameType] || 0;
  }, [userStats.gamesPlayed]);

  const getTotalGames = useCallback(() => {
    return userStats.totalGames;
  }, [userStats.totalGames]);

  const getAverageScore = useCallback(() => {
    return userStats.averageScore;
  }, [userStats.averageScore]);

  // Achievements
  const checkNewAchievements = useCallback(() => {
    return gameService.checkAchievements();
  }, []);

  const handleAchievementUnlocked = useCallback((achievement) => {
    // Add XP for achievement
    dispatch(addXP({ 
      amount: achievement.xpReward, 
      reason: `game_achievement_${achievement.id}` 
    }));
  }, [dispatch]);

  // Leaderboard
  const getGameLeaderboard = useCallback((gameType, difficulty, limit = 10) => {
    return gameService.getGameLeaderboard(gameType, difficulty, limit);
  }, []);

  // Game History
  const getRecentGames = useCallback((limit = 10) => {
    return gameHistory.slice(0, limit);
  }, [gameHistory]);

  // Utility Functions
  const formatTime = useCallback((milliseconds) => {
    return gameService.formatTime(milliseconds);
  }, []);

  const shuffleArray = useCallback((array) => {
    return gameService.shuffleArray(array);
  }, []);

  // Game-specific helpers
  const getMemoryMatchCards = useCallback((difficulty) => {
    return gameService.getMemoryMatchCards(GAME_TYPES.MEMORY_MATCH, difficulty);
  }, []);

  const getWordScrambleWords = useCallback((difficulty) => {
    return gameService.getWordScrambleWords(difficulty);
  }, []);

  const getSpeedTypingWords = useCallback((difficulty) => {
    return gameService.getSpeedTypingWords(difficulty);
  }, []);

  const getKanjiPuzzleData = useCallback((difficulty) => {
    return gameService.getKanjiPuzzleData(difficulty);
  }, []);

  const getSoundMatchData = useCallback((difficulty) => {
    return gameService.getSoundMatchData(difficulty);
  }, []);

  const getGrammarQuizQuestions = useCallback((difficulty) => {
    return gameService.getGrammarQuizQuestions(difficulty);
  }, []);

  // Game completion tracking
  const trackGameCompletion = useCallback((gameType, score, difficulty) => {
    // Add XP for completing game
    const baseXP = 10;
    const scoreMultiplier = score / 100;
    const difficultyMultipliers = {
      [GAME_DIFFICULTY.EASY]: 1,
      [GAME_DIFFICULTY.MEDIUM]: 1.5,
      [GAME_DIFFICULTY.HARD]: 2
    };
    
    const xpEarned = Math.floor(baseXP * scoreMultiplier * difficultyMultipliers[difficulty]);
    
    dispatch(addXP({ 
      amount: xpEarned, 
      reason: `game_completion_${gameType}` 
    }));

    return xpEarned;
  }, [dispatch]);

  // Streak tracking for games
  const trackGameStreak = useCallback((consecutiveGames) => {
    if (consecutiveGames >= 5) {
      dispatch(addXP({ 
        amount: 50, 
        reason: 'game_streak_5' 
      }));
    }
    if (consecutiveGames >= 10) {
      dispatch(addXP({ 
        amount: 100, 
        reason: 'game_streak_10' 
      }));
    }
  }, [dispatch]);

  // Perfect score tracking
  const trackPerfectScore = useCallback((gameType) => {
    dispatch(addXP({ 
      amount: 25, 
      reason: `perfect_score_${gameType}` 
    }));
  }, [dispatch]);

  // Daily game challenge
  const trackDailyGameChallenge = useCallback((gamesPlayedToday) => {
    if (gamesPlayedToday >= 3) {
      dispatch(addXP({ 
        amount: 30, 
        reason: 'daily_game_challenge' 
      }));
    }
  }, [dispatch]);

  return {
    // State
    currentGame,
    userStats,
    gameHistory,
    achievements,
    gameState,
    gameProgress,
    gameScore,
    gameMistakes,
    loading,
    error,

    // Game Management
    handleStartGame,
    handleEndGame,
    handlePauseGame,
    handleResumeGame,
    handleResetGame,

    // Progress Management
    handleUpdateProgress,
    handleUpdateScore,
    handleUpdateMistakes,

    // Game Logic
    getGameData,
    validateAnswer,
    calculateScore,

    // Statistics
    getGameStats,
    getBestScore,
    getGamesPlayed,
    getTotalGames,
    getAverageScore,

    // Achievements
    checkNewAchievements,
    handleAchievementUnlocked,

    // Leaderboard
    getGameLeaderboard,

    // History
    getRecentGames,

    // Utilities
    formatTime,
    shuffleArray,

    // Game-specific data
    getMemoryMatchCards,
    getWordScrambleWords,
    getSpeedTypingWords,
    getKanjiPuzzleData,
    getSoundMatchData,
    getGrammarQuizQuestions,

    // Tracking
    trackGameCompletion,
    trackGameStreak,
    trackPerfectScore,
    trackDailyGameChallenge
  };
}; 