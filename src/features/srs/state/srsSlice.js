import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import srsService from '@/shared/services/srsService.js';

// Async thunks
export const initializeSRSItem = createAsyncThunk(
    'srs/initializeItem',
    async ({ itemId, itemType, metadata }) => {
        return srsService.initializeItem(itemId, itemType, metadata);
    }
);

export const reviewSRSItem = createAsyncThunk(
    'srs/reviewItem',
    async ({ itemId, difficulty }) => {
        return srsService.reviewItem(itemId, difficulty);
    }
);

export const loadSRSStats = createAsyncThunk(
    'srs/loadStats',
    async (itemType = null) => {
        return srsService.getStats(itemType);
    }
);

export const loadDueItems = createAsyncThunk(
    'srs/loadDueItems',
    async (itemType = null) => {
        return srsService.getDueItems(itemType);
    }
);

const initialState = {
    // SRS data
    items: {},
    dueItems: [],
    stats: {
        totalItems: 0,
        newItems: 0,
        learningItems: 0,
        reviewingItems: 0,
        suspendedItems: 0,
        totalReviews: 0,
        correctReviews: 0,
        accuracy: 0,
        dueItems: 0
    },
    // UI state
    loading: false,
    error: null,
    // Review session
    currentReviewSession: {
        isActive: false,
        items: [],
        currentIndex: 0,
        results: []
    }
};

const srsSlice = createSlice({
    name: 'srs',
    initialState,
    reducers: {
        // Reset state
        resetSRSState: (state) => {
            state.items = {};
            state.dueItems = [];
            state.stats = initialState.stats;
            state.currentReviewSession = initialState.currentReviewSession;
        },

        // Review session management
        startReviewSession: (state, action) => {
            const { items } = action.payload;
            state.currentReviewSession = {
                isActive: true,
                items: items || state.dueItems,
                currentIndex: 0,
                results: []
            };
        },

        endReviewSession: (state) => {
            state.currentReviewSession = initialState.currentReviewSession;
        },

        nextReviewItem: (state) => {
            if (state.currentReviewSession.currentIndex < state.currentReviewSession.items.length - 1) {
                state.currentReviewSession.currentIndex++;
            }
        },

        previousReviewItem: (state) => {
            if (state.currentReviewSession.currentIndex > 0) {
                state.currentReviewSession.currentIndex--;
            }
        },

        addReviewResult: (state, action) => {
            const { itemId, difficulty, isCorrect } = action.payload;
            state.currentReviewSession.results.push({
                itemId,
                difficulty,
                isCorrect,
                timestamp: new Date().toISOString()
            });
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Initialize item
            .addCase(initializeSRSItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initializeSRSItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items[action.payload.id] = action.payload;
            })
            .addCase(initializeSRSItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Review item
            .addCase(reviewSRSItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(reviewSRSItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items[action.payload.id] = action.payload;
            })
            .addCase(reviewSRSItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Load stats
            .addCase(loadSRSStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadSRSStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(loadSRSStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Load due items
            .addCase(loadDueItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadDueItems.fulfilled, (state, action) => {
                state.loading = false;
                state.dueItems = action.payload;
            })
            .addCase(loadDueItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
    resetSRSState,
    startReviewSession,
    endReviewSession,
    nextReviewItem,
    previousReviewItem,
    addReviewResult,
    clearError
} = srsSlice.actions;

// Selectors
export const selectSRSStats = (state) => state.srs.stats;
export const selectDueItems = (state) => state.srs.dueItems;
export const selectSRSLoading = (state) => state.srs.loading;
export const selectSRSError = (state) => state.srs.error;
export const selectCurrentReviewSession = (state) => state.srs.currentReviewSession;
export const selectCurrentReviewItem = (state) => {
    const session = state.srs.currentReviewSession;
    if (session.isActive && session.items.length > 0) {
        return session.items[session.currentIndex];
    }
    return null;
};

export default srsSlice.reducer; 