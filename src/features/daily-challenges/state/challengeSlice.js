import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import challengeService from '../services/challengeService.js';

// Async thunk để load thử thách hàng ngày
export const loadDailyChallenges = createAsyncThunk(
  'challenges/loadDaily',
  async (_, { rejectWithValue }) => {
    try {
      const challenges = challengeService.generateDailyChallenges();
      return challenges;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để load thử thách tuần
export const loadWeeklyChallenges = createAsyncThunk(
  'challenges/loadWeekly',
  async (_, { rejectWithValue }) => {
    try {
      const challenges = challengeService.generateWeeklyChallenges();
      return challenges;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để kiểm tra tiến độ thử thách
export const checkChallengeProgress = createAsyncThunk(
  'challenges/checkProgress',
  async ({ userStats, completedChallenges }, { rejectWithValue }) => {
    try {
      const stats = challengeService.getChallengeStats(userStats, completedChallenges);
      const newCompletions = challengeService.checkNewCompletions(userStats, completedChallenges);
      return { stats, newCompletions };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để load thử thách gần hoàn thành
export const loadNearCompletionChallenges = createAsyncThunk(
  'challenges/loadNearCompletion',
  async ({ userStats, completedChallenges, limit = 3 }, { rejectWithValue }) => {
    try {
      const challenges = challengeService.getNearCompletionChallenges(userStats, completedChallenges, limit);
      return challenges;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  dailyChallenges: [],
  weeklyChallenges: [],
  completedChallenges: [],
  newCompletions: [],
  stats: {
    daily: {
      total: 0,
      completed: 0,
      progress: 0,
      challenges: []
    },
    weekly: {
      total: 0,
      completed: 0,
      progress: 0,
      challenges: []
    },
    totalXpEarned: 0
  },
  nearCompletionChallenges: [],
  loading: false,
  error: null,
  lastUpdated: null,
  lastReset: null
};

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    // Hoàn thành một thử thách
    completeChallenge: (state, action) => {
      const challengeId = action.payload;
      if (!state.completedChallenges.includes(challengeId)) {
        state.completedChallenges.push(challengeId);
      }
    },

    // Hoàn thành nhiều thử thách
    completeMultipleChallenges: (state, action) => {
      const challengeIds = action.payload;
      challengeIds.forEach(challengeId => {
        if (!state.completedChallenges.includes(challengeId)) {
          state.completedChallenges.push(challengeId);
        }
      });
    },

    // Xóa thử thách khỏi danh sách hoàn thành mới
    clearNewCompletion: (state, action) => {
      const challengeId = action.payload;
      state.newCompletions = state.newCompletions.filter(challenge => challenge.id !== challengeId);
    },

    // Xóa tất cả thử thách hoàn thành mới
    clearAllNewCompletions: (state) => {
      state.newCompletions = [];
    },

    // Set completed challenges từ localStorage
    setCompletedChallenges: (state, action) => {
      state.completedChallenges = action.payload;
    },

    // Reset thử thách hàng ngày
    resetDailyChallenges: (state) => {
      state.dailyChallenges = [];
      state.completedChallenges = state.completedChallenges.filter(id => {
        const challenge = challengeService.getChallengeById(id);
        return challenge?.category !== 'daily';
      });
      state.lastReset = new Date().toISOString();
    },

    // Reset thử thách tuần
    resetWeeklyChallenges: (state) => {
      state.weeklyChallenges = [];
      state.completedChallenges = state.completedChallenges.filter(id => {
        const challenge = challengeService.getChallengeById(id);
        return challenge?.category !== 'weekly';
      });
      state.lastReset = new Date().toISOString();
    },

    // Reset toàn bộ state
    resetChallengeState: (state) => {
      state.dailyChallenges = [];
      state.weeklyChallenges = [];
      state.completedChallenges = [];
      state.newCompletions = [];
      state.stats = {
        daily: { total: 0, completed: 0, progress: 0, challenges: [] },
        weekly: { total: 0, completed: 0, progress: 0, challenges: [] },
        totalXpEarned: 0
      };
      state.nearCompletionChallenges = [];
      state.lastUpdated = null;
      state.lastReset = null;
    },

    // Cập nhật thời gian cập nhật cuối
    updateLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      // loadDailyChallenges
      .addCase(loadDailyChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDailyChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyChallenges = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(loadDailyChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loadWeeklyChallenges
      .addCase(loadWeeklyChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWeeklyChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyChallenges = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(loadWeeklyChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // checkChallengeProgress
      .addCase(checkChallengeProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkChallengeProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.newCompletions = action.payload.newCompletions;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(checkChallengeProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loadNearCompletionChallenges
      .addCase(loadNearCompletionChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNearCompletionChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.nearCompletionChallenges = action.payload;
      })
      .addCase(loadNearCompletionChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  completeChallenge,
  completeMultipleChallenges,
  clearNewCompletion,
  clearAllNewCompletions,
  setCompletedChallenges,
  resetDailyChallenges,
  resetWeeklyChallenges,
  resetChallengeState,
  updateLastUpdated
} = challengeSlice.actions;

// Selectors
export const selectDailyChallenges = (state) => state.challenges.dailyChallenges;
export const selectWeeklyChallenges = (state) => state.challenges.weeklyChallenges;
export const selectCompletedChallenges = (state) => state.challenges.completedChallenges;
export const selectNewCompletions = (state) => state.challenges.newCompletions;
export const selectChallengeStats = (state) => state.challenges.stats;
export const selectNearCompletionChallenges = (state) => state.challenges.nearCompletionChallenges;
export const selectChallengeLoading = (state) => state.challenges.loading;
export const selectChallengeError = (state) => state.challenges.error;
export const selectLastUpdated = (state) => state.challenges.lastUpdated;
export const selectLastReset = (state) => state.challenges.lastReset;

// Selector để kiểm tra có thử thách mới hoàn thành không
export const selectHasNewCompletions = (state) => state.challenges.newCompletions.length > 0;

// Selector để lấy số lượng thử thách mới hoàn thành
export const selectNewCompletionCount = (state) => state.challenges.newCompletions.length;

// Selector để lấy tổng XP từ thử thách đã hoàn thành
export const selectTotalXpFromChallenges = (state) => state.challenges.stats.totalXpEarned;

export default challengeSlice.reducer; 