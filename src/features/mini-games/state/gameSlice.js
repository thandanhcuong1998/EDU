import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gameService from '../services/gameService.js';
import { GAME_TYPES, GAME_DIFFICULTY } from '../data/gamesData.js';

// Async thunk để start game
export const startGame = createAsyncThunk(
  'games/startGame',
  async ({ gameType, difficulty }, { rejectWithValue }) => {
    try {
      const game = gameService.startGame(gameType, difficulty);
      return game;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để end game
export const endGame = createAsyncThunk(
  'games/endGame',
  async ({ gameId, finalScore, mistakes }, { rejectWithValue }) => {
    try {
      const result = gameService.endGame(gameId, finalScore, mistakes);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để load game stats
export const loadGameStats = createAsyncThunk(
  'games/loadGameStats',
  async (_, { rejectWithValue }) => {
    try {
      const stats = gameService.getStats();
      const history = gameService.getGameHistory();
      const achievements = gameService.checkAchievements();
      return { stats, history, achievements };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentGame: null,
  gameHistory: [],
  userStats: {
    totalGames: 0,
    totalScore: 0,
    averageScore: 0,
    bestScores: {},
    gamesPlayed: {},
    totalXP: 0,
    totalCoins: 0
  },
  achievements: [],
  leaderboard: [],
  loading: false,
  error: null,
  gameState: 'idle', // idle, playing, paused, completed
  gameProgress: 0,
  gameScore: 0,
  gameMistakes: 0,
  gameStartTime: null,
  gameEndTime: null
};

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    // Update game progress
    updateGameProgress: (state, action) => {
      state.gameProgress = action.payload;
    },

    // Update game score
    updateGameScore: (state, action) => {
      state.gameScore = action.payload;
    },

    // Update game mistakes
    updateGameMistakes: (state, action) => {
      state.gameMistakes = action.payload;
    },

    // Pause game
    pauseGame: (state) => {
      state.gameState = 'paused';
    },

    // Resume game
    resumeGame: (state) => {
      state.gameState = 'playing';
    },

    // Reset current game
    resetCurrentGame: (state) => {
      state.currentGame = null;
      state.gameState = 'idle';
      state.gameProgress = 0;
      state.gameScore = 0;
      state.gameMistakes = 0;
      state.gameStartTime = null;
      state.gameEndTime = null;
    },

    // Update leaderboard
    updateLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    },

    // Clear game error
    clearGameError: (state) => {
      state.error = null;
    },

    // Add achievement
    addAchievement: (state, action) => {
      state.achievements.push(action.payload);
    },

    // Update game time
    updateGameTime: (state, action) => {
      const { startTime, endTime } = action.payload;
      if (startTime) state.gameStartTime = startTime;
      if (endTime) state.gameEndTime = endTime;
    }
  },
  extraReducers: (builder) => {
    builder
      // startGame
      .addCase(startGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startGame.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload;
        state.gameState = 'playing';
        state.gameProgress = 0;
        state.gameScore = 0;
        state.gameMistakes = 0;
        state.gameStartTime = new Date().toISOString();
        state.gameEndTime = null;
      })
      .addCase(startGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // endGame
      .addCase(endGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endGame.fulfilled, (state, action) => {
        state.loading = false;
        state.gameState = 'completed';
        state.gameEndTime = new Date().toISOString();
        
        // Update stats
        state.userStats = action.payload.game.userStats;
        state.gameHistory = action.payload.game.history;
        
        // Add to history
        state.gameHistory.unshift(action.payload.game);
        
        // Check for new achievements
        const newAchievements = gameService.checkAchievements();
        state.achievements = newAchievements;
      })
      .addCase(endGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loadGameStats
      .addCase(loadGameStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadGameStats.fulfilled, (state, action) => {
        state.loading = false;
        state.userStats = action.payload.stats;
        state.gameHistory = action.payload.history;
        state.achievements = action.payload.achievements;
      })
      .addCase(loadGameStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  updateGameProgress,
  updateGameScore,
  updateGameMistakes,
  pauseGame,
  resumeGame,
  resetCurrentGame,
  updateLeaderboard,
  clearGameError,
  addAchievement,
  updateGameTime
} = gameSlice.actions;

// Selectors
export const selectCurrentGame = (state) => state.games.currentGame;
export const selectGameHistory = (state) => state.games.gameHistory;
export const selectUserStats = (state) => state.games.userStats;
export const selectAchievements = (state) => state.games.achievements;
export const selectLeaderboard = (state) => state.games.leaderboard;
export const selectGameLoading = (state) => state.games.loading;
export const selectGameError = (state) => state.games.error;
export const selectGameState = (state) => state.games.gameState;
export const selectGameProgress = (state) => state.games.gameProgress;
export const selectGameScore = (state) => state.games.gameScore;
export const selectGameMistakes = (state) => state.games.gameMistakes;
export const selectGameStartTime = (state) => state.games.gameStartTime;
export const selectGameEndTime = (state) => state.games.gameEndTime;

// Derived selectors
export const selectTotalGames = (state) => state.games.userStats.totalGames;
export const selectTotalScore = (state) => state.games.userStats.totalScore;
export const selectAverageScore = (state) => state.games.userStats.averageScore;
export const selectBestScores = (state) => state.games.userStats.bestScores;
export const selectGamesPlayed = (state) => state.games.userStats.gamesPlayed;
export const selectTotalGameXP = (state) => state.games.userStats.totalXP;
export const selectTotalGameCoins = (state) => state.games.userStats.totalCoins;

export const selectIsGameActive = (state) => 
  state.games.gameState === 'playing' || state.games.gameState === 'paused';

export const selectIsGameCompleted = (state) => 
  state.games.gameState === 'completed';

export const selectGameDuration = (state) => {
  const { gameStartTime, gameEndTime } = state.games;
  if (!gameStartTime) return 0;
  
  const endTime = gameEndTime || new Date().toISOString();
  return new Date(endTime) - new Date(gameStartTime);
};

export const selectRecentGames = (state, limit = 5) => 
  state.games.gameHistory.slice(0, limit);

export const selectGameTypeStats = (state, gameType) => 
  state.games.userStats.gamesPlayed[gameType] || 0;

export const selectBestScoreForGame = (state, gameType, difficulty) => {
  const gameKey = `${gameType}_${difficulty}`;
  return state.games.userStats.bestScores[gameKey] || 0;
};

export default gameSlice.reducer; 