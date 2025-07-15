import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import xpService from '@/shared/services/xpService.js';

// Async thunks
export const initializeXPUser = createAsyncThunk(
    'xp/initializeUser',
    async (userId) => {
        return xpService.initializeUser(userId);
    }
);

export const addXP = createAsyncThunk(
    'xp/addXP',
    async ({ userId, action, metadata }) => {
        return xpService.addXP(userId, action, metadata);
    }
);

export const updateDailyStreak = createAsyncThunk(
    'xp/updateDailyStreak',
    async (userId) => {
        return xpService.updateDailyStreak(userId);
    }
);

export const loadLeaderboard = createAsyncThunk(
    'xp/loadLeaderboard',
    async (limit = 10) => {
        return xpService.getLeaderboard(limit);
    }
);

const initialState = {
    // User XP data
    userData: null,
    // UI state
    loading: false,
    error: null,
    // Notifications
    notifications: [],
    // Leaderboard
    leaderboard: []
};

const xpSlice = createSlice({
    name: 'xp',
    initialState,
    reducers: {
        // Reset state
        resetXPState: (state) => {
            state.userData = null;
            state.notifications = [];
            state.leaderboard = [];
        },

        // Add notification
        addNotification: (state, action) => {
            const notification = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                ...action.payload
            };
            state.notifications.unshift(notification);
            
            // Giới hạn số lượng notifications (giữ 10 cái gần nhất)
            if (state.notifications.length > 10) {
                state.notifications = state.notifications.slice(0, 10);
            }
        },

        // Remove notification
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                notification => notification.id !== action.payload
            );
        },

        // Clear all notifications
        clearNotifications: (state) => {
            state.notifications = [];
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Initialize user
            .addCase(initializeXPUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initializeXPUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(initializeXPUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Add XP
            .addCase(addXP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addXP.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.userData;

                // Add notifications for XP gain and level up
                if (action.payload.xpGained > 0) {
                    state.notifications.unshift({
                        id: Date.now(),
                        type: 'xp_gain',
                        message: `+${action.payload.xpGained} XP`,
                        timestamp: new Date().toISOString()
                    });
                }

                if (action.payload.levelUp) {
                    state.notifications.unshift({
                        id: Date.now() + 1,
                        type: 'level_up',
                        message: `Level Up! Bây giờ bạn là ${action.payload.newRank.name}`,
                        timestamp: new Date().toISOString()
                    });
                }

                // Add notifications for new achievements
                if (action.payload.newAchievements && action.payload.newAchievements.length > 0) {
                    action.payload.newAchievements.forEach(achievement => {
                        state.notifications.unshift({
                            id: Date.now() + Math.random(),
                            type: 'achievement',
                            message: `🏆 ${achievement.name}: ${achievement.description}`,
                            timestamp: new Date().toISOString()
                        });
                    });
                }

                // Giới hạn số lượng notifications
                if (state.notifications.length > 10) {
                    state.notifications = state.notifications.slice(0, 10);
                }
            })
            .addCase(addXP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update daily streak
            .addCase(updateDailyStreak.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDailyStreak.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.userData = action.payload;
                }
            })
            .addCase(updateDailyStreak.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Load leaderboard
            .addCase(loadLeaderboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadLeaderboard.fulfilled, (state, action) => {
                state.loading = false;
                state.leaderboard = action.payload;
            })
            .addCase(loadLeaderboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
    resetXPState,
    addNotification,
    removeNotification,
    clearNotifications,
    clearError
} = xpSlice.actions;

// Selectors
export const selectUserXPData = (state) => state.xp.userData;
export const selectXPLoading = (state) => state.xp.loading;
export const selectXPError = (state) => state.xp.error;
export const selectNotifications = (state) => state.xp.notifications;
export const selectLeaderboard = (state) => state.xp.leaderboard;

// Computed selectors
export const selectLevelUpInfo = (state) => {
    const userData = state.xp.userData;
    if (!userData) return null;
    
    return xpService.getLevelUpInfo(userData.level, userData.currentXP);
};

export const selectUserRank = (state) => {
    const userData = state.xp.userData;
    return userData ? userData.rank : null;
};

export const selectUserStats = (state) => {
    const userData = state.xp.userData;
    return userData ? userData.stats : null;
};

export const selectUserAchievements = (state) => {
    const userData = state.xp.userData;
    return userData ? userData.achievements : [];
};

export default xpSlice.reducer; 