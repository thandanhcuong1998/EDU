import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import badgeService from '../services/badgeService.js';

// Async thunk để kiểm tra badges mới
export const checkNewBadges = createAsyncThunk(
  'badges/checkNew',
  async ({ userStats, unlockedBadges }, { rejectWithValue }) => {
    try {
      const newBadges = badgeService.checkNewBadges(userStats, unlockedBadges);
      return newBadges;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để load badge stats
export const loadBadgeStats = createAsyncThunk(
  'badges/loadStats',
  async (unlockedBadges, { rejectWithValue }) => {
    try {
      const stats = badgeService.getBadgeStats(unlockedBadges);
      return stats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để load near unlock badges
export const loadNearUnlockBadges = createAsyncThunk(
  'badges/loadNearUnlock',
  async ({ userStats, unlockedBadges, limit = 5 }, { rejectWithValue }) => {
    try {
      const nearBadges = badgeService.getNearUnlockBadges(userStats, unlockedBadges, limit);
      return nearBadges;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  unlockedBadges: [],
  newBadges: [],
  stats: {
    total: 0,
    unlocked: 0,
    progress: 0,
    byType: {},
    byRarity: {}
  },
  nearUnlockBadges: [],
  loading: false,
  error: null,
  lastChecked: null
};

const badgeSlice = createSlice({
  name: 'badges',
  initialState,
  reducers: {
    // Unlock một badge
    unlockBadge: (state, action) => {
      const badgeId = action.payload;
      if (!state.unlockedBadges.includes(badgeId)) {
        state.unlockedBadges.push(badgeId);
      }
    },

    // Unlock nhiều badges
    unlockMultipleBadges: (state, action) => {
      const badgeIds = action.payload;
      badgeIds.forEach(badgeId => {
        if (!state.unlockedBadges.includes(badgeId)) {
          state.unlockedBadges.push(badgeId);
        }
      });
    },

    // Xóa badge khỏi danh sách mới
    clearNewBadge: (state, action) => {
      const badgeId = action.payload;
      state.newBadges = state.newBadges.filter(badge => badge.id !== badgeId);
    },

    // Xóa tất cả badges mới
    clearAllNewBadges: (state) => {
      state.newBadges = [];
    },

    // Set unlocked badges từ localStorage
    setUnlockedBadges: (state, action) => {
      state.unlockedBadges = action.payload;
    },

    // Reset state
    resetBadgeState: (state) => {
      state.unlockedBadges = [];
      state.newBadges = [];
      state.stats = {
        total: 0,
        unlocked: 0,
        progress: 0,
        byType: {},
        byRarity: {}
      };
      state.nearUnlockBadges = [];
      state.lastChecked = null;
    },

    // Cập nhật thời gian kiểm tra cuối
    updateLastChecked: (state) => {
      state.lastChecked = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      // checkNewBadges
      .addCase(checkNewBadges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkNewBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.newBadges = action.payload;
        state.lastChecked = new Date().toISOString();
      })
      .addCase(checkNewBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loadBadgeStats
      .addCase(loadBadgeStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBadgeStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(loadBadgeStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loadNearUnlockBadges
      .addCase(loadNearUnlockBadges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNearUnlockBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.nearUnlockBadges = action.payload;
      })
      .addCase(loadNearUnlockBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  unlockBadge,
  unlockMultipleBadges,
  clearNewBadge,
  clearAllNewBadges,
  setUnlockedBadges,
  resetBadgeState,
  updateLastChecked
} = badgeSlice.actions;

// Selectors
export const selectUnlockedBadges = (state) => state.badges.unlockedBadges;
export const selectNewBadges = (state) => state.badges.newBadges;
export const selectBadgeStats = (state) => state.badges.stats;
export const selectNearUnlockBadges = (state) => state.badges.nearUnlockBadges;
export const selectBadgeLoading = (state) => state.badges.loading;
export const selectBadgeError = (state) => state.badges.error;
export const selectLastChecked = (state) => state.badges.lastChecked;

// Selector để kiểm tra có badge mới không
export const selectHasNewBadges = (state) => state.badges.newBadges.length > 0;

// Selector để lấy số lượng badge mới
export const selectNewBadgeCount = (state) => state.badges.newBadges.length;

export default badgeSlice.reducer; 