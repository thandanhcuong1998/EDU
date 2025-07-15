import { mockFriends } from '../data/friendsData.js';

class ChatService {
  constructor() {
    this.conversations = new Map();
    this.messages = new Map();
    this.onlineUsers = new Set();
    this.messageCallbacks = [];
  }

  // Conversation Management
  getConversations(userId) {
    const userConversations = this.conversations.get(userId) || [];
    return userConversations.map(conv => ({
      ...conv,
      lastMessage: this.getLastMessage(conv.id),
      unreadCount: this.getUnreadCount(conv.id, userId)
    }));
  }

  getConversation(conversationId) {
    return this.conversations.get(conversationId);
  }

  createConversation(participants, type = 'direct') {
    const conversationId = `conv_${Date.now()}`;
    const conversation = {
      id: conversationId,
      type, // 'direct' or 'group'
      participants,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      name: type === 'direct' ? null : 'Study Group',
      avatar: type === 'direct' ? null : '👥'
    };

    // Initialize conversation for each participant
    participants.forEach(participantId => {
      if (!this.conversations.has(participantId)) {
        this.conversations.set(participantId, []);
      }
      this.conversations.get(participantId).push(conversation);
    });

    this.conversations.set(conversationId, conversation);
    this.messages.set(conversationId, []);

    return conversation;
  }

  // Message Management
  sendMessage(conversationId, senderId, content, type = 'text') {
    const message = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId,
      content,
      type, // 'text', 'image', 'file', 'voice'
      timestamp: new Date().toISOString(),
      status: 'sent', // 'sent', 'delivered', 'read'
      reactions: []
    };

    const conversationMessages = this.messages.get(conversationId) || [];
    conversationMessages.push(message);
    this.messages.set(conversationId, conversationMessages);

    // Update conversation last activity
    const conversation = this.getConversation(conversationId);
    if (conversation) {
      conversation.lastActivity = message.timestamp;
    }

    // Notify message callbacks
    this.notifyMessageCallbacks(message);

    return message;
  }

  getMessages(conversationId, limit = 50, offset = 0) {
    const messages = this.messages.get(conversationId) || [];
    return messages
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .slice(offset, offset + limit);
  }

  getLastMessage(conversationId) {
    const messages = this.messages.get(conversationId) || [];
    return messages.length > 0 ? messages[messages.length - 1] : null;
  }

  markMessageAsRead(conversationId, userId) {
    const messages = this.messages.get(conversationId) || [];
    messages.forEach(message => {
      if (message.senderId !== userId && message.status !== 'read') {
        message.status = 'read';
      }
    });
  }

  getUnreadCount(conversationId, userId) {
    const messages = this.messages.get(conversationId) || [];
    return messages.filter(message => 
      message.senderId !== userId && message.status !== 'read'
    ).length;
  }

  // Real-time Features
  addMessageCallback(callback) {
    this.messageCallbacks.push(callback);
  }

  removeMessageCallback(callback) {
    this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
  }

  notifyMessageCallbacks(message) {
    this.messageCallbacks.forEach(callback => callback(message));
  }

  // Online Status
  setUserOnline(userId) {
    this.onlineUsers.add(userId);
  }

  setUserOffline(userId) {
    this.onlineUsers.delete(userId);
  }

  isUserOnline(userId) {
    return this.onlineUsers.has(userId);
  }

  getOnlineUsers() {
    return Array.from(this.onlineUsers);
  }

  // Message Reactions
  addReaction(messageId, userId, reaction) {
    const message = this.findMessage(messageId);
    if (message) {
      const existingReaction = message.reactions.find(r => r.userId === userId);
      if (existingReaction) {
        existingReaction.reaction = reaction;
      } else {
        message.reactions.push({ userId, reaction, timestamp: new Date().toISOString() });
      }
    }
  }

  removeReaction(messageId, userId) {
    const message = this.findMessage(messageId);
    if (message) {
      message.reactions = message.reactions.filter(r => r.userId !== userId);
    }
  }

  // Search Messages
  searchMessages(conversationId, query) {
    const messages = this.messages.get(conversationId) || [];
    const searchTerm = query.toLowerCase();
    
    return messages.filter(message => 
      message.content.toLowerCase().includes(searchTerm) &&
      message.type === 'text'
    );
  }

  // File Sharing
  uploadFile(conversationId, senderId, file) {
    // Simulate file upload
    const fileMessage = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId,
      content: file.name,
      type: 'file',
      fileInfo: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      },
      timestamp: new Date().toISOString(),
      status: 'sent',
      reactions: []
    };

    const conversationMessages = this.messages.get(conversationId) || [];
    conversationMessages.push(fileMessage);
    this.messages.set(conversationId, conversationMessages);

    return fileMessage;
  }

  // Voice Messages
  sendVoiceMessage(conversationId, senderId, audioBlob) {
    const voiceMessage = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId,
      content: 'Voice message',
      type: 'voice',
      audioInfo: {
        url: URL.createObjectURL(audioBlob),
        duration: 0, // Would be calculated from audio
        size: audioBlob.size
      },
      timestamp: new Date().toISOString(),
      status: 'sent',
      reactions: []
    };

    const conversationMessages = this.messages.get(conversationId) || [];
    conversationMessages.push(voiceMessage);
    this.messages.set(conversationId, conversationMessages);

    return voiceMessage;
  }

  // Helper Methods
  findMessage(messageId) {
    for (const [conversationId, messages] of this.messages) {
      const message = messages.find(msg => msg.id === messageId);
      if (message) return message;
    }
    return null;
  }

  formatTimeAgo(timestamp) {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
  }

  // Typing Indicators
  setTypingStatus(conversationId, userId, isTyping) {
    // In a real app, this would be sent to other participants
    console.log(`User ${userId} is ${isTyping ? 'typing' : 'not typing'} in conversation ${conversationId}`);
  }

  // Message Status Updates
  updateMessageStatus(messageId, status) {
    const message = this.findMessage(messageId);
    if (message) {
      message.status = status;
    }
  }

  // Conversation Management
  leaveConversation(conversationId, userId) {
    const conversation = this.getConversation(conversationId);
    if (conversation && conversation.type === 'group') {
      conversation.participants = conversation.participants.filter(id => id !== userId);
      
      // Remove from user's conversation list
      const userConversations = this.conversations.get(userId) || [];
      const updatedUserConversations = userConversations.filter(conv => conv.id !== conversationId);
      this.conversations.set(userId, updatedUserConversations);
    }
  }

  addParticipantToGroup(conversationId, userId) {
    const conversation = this.getConversation(conversationId);
    if (conversation && conversation.type === 'group') {
      if (!conversation.participants.includes(userId)) {
        conversation.participants.push(userId);
        
        // Add conversation to user's list
        if (!this.conversations.has(userId)) {
          this.conversations.set(userId, []);
        }
        this.conversations.get(userId).push(conversation);
      }
    }
  }
}

export default ChatService; 