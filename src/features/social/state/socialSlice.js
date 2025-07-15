import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import socialService from '../services/socialService.js';

// Async thunk để load friends
export const loadFriends = createAsyncThunk(
  'social/loadFriends',
  async (_, { rejectWithValue }) => {
    try {
      const friends = socialService.getFriends();
      return friends;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để load friend requests
export const loadFriendRequests = createAsyncThunk(
  'social/loadFriendRequests',
  async (_, { rejectWithValue }) => {
    try {
      const requests = socialService.getFriendRequests();
      return requests;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để load activities
export const loadActivities = createAsyncThunk(
  'social/loadActivities',
  async (limit = 20, { rejectWithValue }) => {
    try {
      const activities = socialService.getActivities(limit);
      return activities;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để load leaderboard
export const loadLeaderboard = createAsyncThunk(
  'social/loadLeaderboard',
  async ({ category = 'totalXP', limit = 10 }, { rejectWithValue }) => {
    try {
      const leaderboard = socialService.getLeaderboardByCategory(category, limit);
      return { leaderboard, category };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để load study groups
export const loadStudyGroups = createAsyncThunk(
  'social/loadStudyGroups',
  async (_, { rejectWithValue }) => {
    try {
      const groups = socialService.getStudyGroups();
      return groups;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để accept friend request
export const acceptFriendRequest = createAsyncThunk(
  'social/acceptFriendRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const success = socialService.acceptFriendRequest(requestId);
      if (success) {
        return requestId;
      } else {
        throw new Error('Failed to accept friend request');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để reject friend request
export const rejectFriendRequest = createAsyncThunk(
  'social/rejectFriendRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const success = socialService.rejectFriendRequest(requestId);
      if (success) {
        return requestId;
      } else {
        throw new Error('Failed to reject friend request');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để send friend request
export const sendFriendRequest = createAsyncThunk(
  'social/sendFriendRequest',
  async ({ toUserId, message }, { rejectWithValue }) => {
    try {
      const request = socialService.sendFriendRequest(toUserId, message);
      return request;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để search users
export const searchUsers = createAsyncThunk(
  'social/searchUsers',
  async ({ query, limit = 10 }, { rejectWithValue }) => {
    try {
      const users = socialService.searchUsers(query, limit);
      return users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  friends: [],
  friendRequests: [],
  activities: [],
  leaderboard: [],
  leaderboardCategory: 'totalXP',
  studyGroups: [],
  searchResults: [],
  notifications: [],
  loading: false,
  error: null,
  lastUpdated: null
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    // Add new activity
    addActivity: (state, action) => {
      state.activities.unshift(action.payload);
    },

    // Remove friend
    removeFriend: (state, action) => {
      const friendId = action.payload;
      state.friends = state.friends.filter(friend => friend.id !== friendId);
    },

    // Update friend status
    updateFriendStatus: (state, action) => {
      const { friendId, status } = action.payload;
      const friend = state.friends.find(f => f.id === friendId);
      if (friend) {
        friend.status = status;
      }
    },

    // Clear search results
    clearSearchResults: (state) => {
      state.searchResults = [];
    },

    // Update notifications
    updateNotifications: (state, action) => {
      state.notifications = action.payload;
    },

    // Mark notification as read
    markNotificationAsRead: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(n => n.id !== notificationId);
    },

    // Reset social state
    resetSocialState: (state) => {
      state.friends = [];
      state.friendRequests = [];
      state.activities = [];
      state.leaderboard = [];
      state.leaderboardCategory = 'totalXP';
      state.studyGroups = [];
      state.searchResults = [];
      state.notifications = [];
      state.lastUpdated = null;
    },

    // Update last updated time
    updateLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      // loadFriends
      .addCase(loadFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(loadFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loadFriendRequests
      .addCase(loadFriendRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(loadFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loadActivities
      .addCase(loadActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(loadActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loadLeaderboard
      .addCase(loadLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload.leaderboard;
        state.leaderboardCategory = action.payload.category;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(loadLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loadStudyGroups
      .addCase(loadStudyGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadStudyGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.studyGroups = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(loadStudyGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // acceptFriendRequest
      .addCase(acceptFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        // Remove from requests and add to friends
        state.friendRequests = state.friendRequests.filter(req => req.id !== action.payload);
        // Note: In a real app, you'd reload friends here
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // rejectFriendRequest
      .addCase(rejectFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = state.friendRequests.filter(req => req.id !== action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(rejectFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // sendFriendRequest
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        // In a real app, this would be sent to the other user
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // searchUsers
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  addActivity,
  removeFriend,
  updateFriendStatus,
  clearSearchResults,
  updateNotifications,
  markNotificationAsRead,
  resetSocialState,
  updateLastUpdated
} = socialSlice.actions;

// Selectors
export const selectFriends = (state) => state.social.friends;
export const selectFriendRequests = (state) => state.social.friendRequests;
export const selectActivities = (state) => state.social.activities;
export const selectLeaderboard = (state) => state.social.leaderboard;
export const selectLeaderboardCategory = (state) => state.social.leaderboardCategory;
export const selectStudyGroups = (state) => state.social.studyGroups;
export const selectSearchResults = (state) => state.social.searchResults;
export const selectNotifications = (state) => state.social.notifications;
export const selectSocialLoading = (state) => state.social.loading;
export const selectSocialError = (state) => state.social.error;
export const selectLastUpdated = (state) => state.social.lastUpdated;

// Derived selectors
export const selectOnlineFriends = (state) => 
  state.social.friends.filter(friend => friend.isOnline);

export const selectPendingFriendRequests = (state) => 
  state.social.friendRequests.length;

export const selectFriendCount = (state) => 
  state.social.friends.length;

export const selectActivityCount = (state) => 
  state.social.activities.length;

export const selectNotificationCount = (state) => 
  state.social.notifications.length;

export default socialSlice.reducer; 