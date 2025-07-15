import { 
  mockFriends, 
  mockFriendRequests, 
  mockActivities, 
  mockLeaderboard, 
  mockStudyGroups,
  FRIEND_STATUS,
  ACTIVITY_TYPES,
  getActivityIcon,
  getActivityColor
} from '../data/friendsData.js';

class SocialService {
  constructor() {
    this.friends = mockFriends;
    this.friendRequests = mockFriendRequests;
    this.activities = mockActivities;
    this.leaderboard = mockLeaderboard;
    this.studyGroups = mockStudyGroups;
  }

  // Friend Management
  getFriends(status = FRIEND_STATUS.ACCEPTED) {
    return this.friends.filter(friend => friend.status === status);
  }

  getFriendById(friendId) {
    return this.friends.find(friend => friend.id === friendId);
  }

  getOnlineFriends() {
    return this.friends.filter(friend => 
      friend.status === FRIEND_STATUS.ACCEPTED && friend.isOnline
    );
  }

  getFriendRequests() {
    return this.friendRequests;
  }

  acceptFriendRequest(requestId) {
    const request = this.friendRequests.find(req => req.id === requestId);
    if (request) {
      // Add to friends list
      this.friends.push({
        ...request.from,
        status: FRIEND_STATUS.ACCEPTED,
        isOnline: false,
        lastActive: new Date().toISOString(),
        mutualFriends: 0
      });
      
      // Remove from requests
      this.friendRequests = this.friendRequests.filter(req => req.id !== requestId);
      return true;
    }
    return false;
  }

  rejectFriendRequest(requestId) {
    this.friendRequests = this.friendRequests.filter(req => req.id !== requestId);
    return true;
  }

  sendFriendRequest(toUserId, message = '') {
    // Simulate sending friend request
    const newRequest = {
      id: `req_${Date.now()}`,
      from: {
        id: 'current_user',
        username: 'current_user',
        displayName: 'Bạn 👤',
        avatar: '👤',
        level: 10,
        rank: 'Intermediate'
      },
      message,
      sentAt: new Date().toISOString()
    };
    
    this.friendRequests.push(newRequest);
    return newRequest;
  }

  removeFriend(friendId) {
    this.friends = this.friends.filter(friend => friend.id !== friendId);
    return true;
  }

  // Activity Feed
  getActivities(limit = 20) {
    return this.activities.slice(0, limit);
  }

  getFriendActivities(friendId, limit = 10) {
    return this.activities
      .filter(activity => activity.userId === friendId)
      .slice(0, limit);
  }

  addActivity(activity) {
    const newActivity = {
      id: `act_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...activity
    };
    
    this.activities.unshift(newActivity);
    
    // Keep only last 100 activities
    if (this.activities.length > 100) {
      this.activities = this.activities.slice(0, 100);
    }
    
    return newActivity;
  }

  // Leaderboard
  getLeaderboard(limit = 10) {
    return this.leaderboard.slice(0, limit);
  }

  getLeaderboardByCategory(category = 'totalXP', limit = 10) {
    let sortedLeaderboard = [...this.leaderboard];
    
    switch (category) {
      case 'totalXP':
        sortedLeaderboard.sort((a, b) => b.totalXP - a.totalXP);
        break;
      case 'level':
        sortedLeaderboard.sort((a, b) => b.level - a.level);
        break;
      case 'streak':
        sortedLeaderboard.sort((a, b) => b.currentStreak - a.currentStreak);
        break;
      case 'badges':
        sortedLeaderboard.sort((a, b) => b.badges - a.badges);
        break;
      default:
        sortedLeaderboard.sort((a, b) => b.totalXP - a.totalXP);
    }
    
    return sortedLeaderboard.slice(0, limit);
  }

  getUserRank(userId) {
    const sortedLeaderboard = this.getLeaderboardByCategory('totalXP', 100);
    const userIndex = sortedLeaderboard.findIndex(user => user.userId === userId);
    return userIndex >= 0 ? userIndex + 1 : null;
  }

  // Study Groups
  getStudyGroups() {
    return this.studyGroups;
  }

  getStudyGroupById(groupId) {
    return this.studyGroups.find(group => group.id === groupId);
  }

  createStudyGroup(groupData) {
    const newGroup = {
      id: `group_${Date.now()}`,
      memberCount: 1,
      createdAt: new Date().toISOString(),
      ...groupData
    };
    
    this.studyGroups.push(newGroup);
    return newGroup;
  }

  joinStudyGroup(groupId, userId) {
    const group = this.getStudyGroupById(groupId);
    if (group && group.memberCount < group.maxMembers) {
      group.memberCount++;
      return true;
    }
    return false;
  }

  leaveStudyGroup(groupId, userId) {
    const group = this.getStudyGroupById(groupId);
    if (group && group.memberCount > 1) {
      group.memberCount--;
      return true;
    }
    return false;
  }

  // Search and Discovery
  searchUsers(query, limit = 10) {
    const searchTerm = query.toLowerCase();
    const allUsers = [...this.friends, ...this.leaderboard];
    
    return allUsers
      .filter(user => 
        user.username.toLowerCase().includes(searchTerm) ||
        user.displayName.toLowerCase().includes(searchTerm)
      )
      .slice(0, limit);
  }

  getSuggestedFriends(userId, limit = 5) {
    // Simulate friend suggestions based on mutual friends and similar levels
    const currentUser = this.getFriendById(userId) || this.leaderboard.find(u => u.userId === userId);
    if (!currentUser) return [];

    const suggestions = this.leaderboard
      .filter(user => 
        user.userId !== userId && 
        !this.friends.find(friend => friend.id === user.userId)
      )
      .sort((a, b) => {
        // Sort by level similarity and mutual friends
        const levelDiffA = Math.abs(a.level - currentUser.level);
        const levelDiffB = Math.abs(b.level - currentUser.level);
        return levelDiffA - levelDiffB;
      });

    return suggestions.slice(0, limit);
  }

  // Notifications
  getNotifications(userId) {
    const notifications = [];
    
    // Friend requests
    const pendingRequests = this.friendRequests.length;
    if (pendingRequests > 0) {
      notifications.push({
        id: 'friend_requests',
        type: 'friend_request',
        title: 'Lời mời kết bạn mới',
        message: `Bạn có ${pendingRequests} lời mời kết bạn chưa xem`,
        icon: '👥',
        count: pendingRequests,
        timestamp: new Date().toISOString()
      });
    }
    
    // New activities from friends
    const recentActivities = this.activities
      .filter(activity => 
        activity.userId !== userId && 
        new Date(activity.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      );
    
    if (recentActivities.length > 0) {
      notifications.push({
        id: 'friend_activities',
        type: 'friend_activity',
        title: 'Hoạt động mới từ bạn bè',
        message: `${recentActivities.length} hoạt động mới từ bạn bè`,
        icon: '📝',
        count: recentActivities.length,
        timestamp: new Date().toISOString()
      });
    }
    
    return notifications;
  }

  // Utility functions
  formatTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} tuần trước`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} tháng trước`;
  }

  getActivityIcon(type) {
    return getActivityIcon(type);
  }

  getActivityColor(type) {
    return getActivityColor(type);
  }
}

export default new SocialService(); 