import React, { useState, useEffect, useRef } from 'react';
import ChatService from '../services/chatService.js';
import './Chat.scss';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  
  const chatService = useRef(new ChatService());
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentUserId = 'current_user'; // In real app, get from auth

  useEffect(() => {
    // Initialize with some sample conversations
    initializeSampleData();
    
    // Set up message listener
    const handleNewMessage = (message) => {
      if (selectedConversation && message.conversationId === selectedConversation.id) {
        setMessages(prev => [...prev, message]);
      }
      updateConversations();
    };

    chatService.current.addMessageCallback(handleNewMessage);
    
    // Set user as online
    chatService.current.setUserOnline(currentUserId);

    return () => {
      chatService.current.removeMessageCallback(handleNewMessage);
      chatService.current.setUserOffline(currentUserId);
    };
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeSampleData = () => {
    // Create sample conversations
    const friend1 = { id: 'friend1', name: 'Mai Anh', avatar: '👩‍🎓' };
    const friend2 = { id: 'friend2', name: 'Hùng', avatar: '👨‍💻' };
    const friend3 = { id: 'friend3', name: 'Study Group N5', avatar: '👥' };

    const conv1 = chatService.current.createConversation([currentUserId, friend1.id], 'direct');
    const conv2 = chatService.current.createConversation([currentUserId, friend2.id], 'direct');
    const conv3 = chatService.current.createConversation([currentUserId, friend1.id, friend2.id], 'group');

    // Add some sample messages
    chatService.current.sendMessage(conv1.id, friend1.id, 'Chào bạn! Hôm nay học gì vậy?');
    chatService.current.sendMessage(conv1.id, currentUserId, 'Chào! Mình đang học kanji N5');
    chatService.current.sendMessage(conv1.id, friend1.id, 'Tuyệt! Mình cũng vậy. Có muốn học cùng không?');
    
    chatService.current.sendMessage(conv2.id, friend2.id, 'Bạn có biết cách học từ vựng hiệu quả không?');
    chatService.current.sendMessage(conv2.id, currentUserId, 'Mình dùng SRS, rất hiệu quả!');
    
    chatService.current.sendMessage(conv3.id, friend1.id, 'Chào cả nhóm! Hôm nay chúng ta học gì?');
    chatService.current.sendMessage(conv3.id, friend2.id, 'Mình đề xuất học grammar N5');
    chatService.current.sendMessage(conv3.id, currentUserId, 'Đồng ý! Grammar rất quan trọng');

    updateConversations();
  };

  const updateConversations = () => {
    const userConversations = chatService.current.getConversations(currentUserId);
    setConversations(userConversations);
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    const conversationMessages = chatService.current.getMessages(conversation.id);
    setMessages(conversationMessages);
    chatService.current.markMessageAsRead(conversation.id, currentUserId);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    chatService.current.sendMessage(selectedConversation.id, currentUserId, newMessage.trim());
    setNewMessage('');
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && selectedConversation) {
      chatService.current.uploadFile(selectedConversation.id, currentUserId, file);
    }
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        chatService.current.sendVoiceMessage(selectedConversation.id, currentUserId, blob);
        setIsRecording(false);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getConversationName = (conversation) => {
    if (conversation.name) return conversation.name;
    if (conversation.type === 'direct') {
      const otherParticipant = conversation.participants.find(p => p !== currentUserId);
      return otherParticipant || 'Unknown';
    }
    return 'Group Chat';
  };

  const getConversationAvatar = (conversation) => {
    if (conversation.avatar) return conversation.avatar;
    if (conversation.type === 'direct') {
      return '👤';
    }
    return '👥';
  };

  const filteredConversations = conversations.filter(conv =>
    getConversationName(conv).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const emojis = ['😊', '👍', '❤️', '🎉', '🔥', '💯', '👏', '🙏', '🤔', '😅'];

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h3>💬 Tin nhắn</h3>
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="conversations-list">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
              onClick={() => handleConversationSelect(conversation)}
            >
              <div className="conversation-avatar">
                {getConversationAvatar(conversation)}
              </div>
              <div className="conversation-info">
                <div className="conversation-name">
                  {getConversationName(conversation)}
                </div>
                <div className="conversation-preview">
                  {conversation.lastMessage?.content || 'Chưa có tin nhắn'}
                </div>
              </div>
              {conversation.unreadCount > 0 && (
                <div className="unread-badge">{conversation.unreadCount}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  {getConversationAvatar(selectedConversation)}
                </div>
                <div className="chat-details">
                  <h4>{getConversationName(selectedConversation)}</h4>
                  <span className="chat-status">
                    {selectedConversation.type === 'group' ? `${selectedConversation.participants.length} thành viên` : 'Online'}
                  </span>
                </div>
              </div>
              <div className="chat-actions">
                <button className="action-btn" title="Tìm kiếm">
                  🔍
                </button>
                <button className="action-btn" title="Thêm thành viên">
                  👥
                </button>
                <button className="action-btn" title="Cài đặt">
                  ⚙️
                </button>
              </div>
            </div>

            <div className="messages-container">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    {message.type === 'text' && (
                      <div className="text-message">
                        {message.content}
                        {message.reactions.length > 0 && (
                          <div className="message-reactions">
                            {message.reactions.map((reaction, index) => (
                              <span key={index} className="reaction">{reaction.reaction}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {message.type === 'file' && (
                      <div className="file-message">
                        <div className="file-info">
                          <span className="file-icon">📎</span>
                          <span className="file-name">{message.content}</span>
                        </div>
                        <button className="download-btn">Tải xuống</button>
                      </div>
                    )}
                    {message.type === 'voice' && (
                      <div className="voice-message">
                        <div className="voice-info">
                          <span className="voice-icon">🎤</span>
                          <span className="voice-duration">0:30</span>
                        </div>
                        <button className="play-btn">▶️</button>
                      </div>
                    )}
                    <div className="message-time">
                      {chatService.current.formatTimeAgo(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input-container">
              <div className="input-actions">
                <button
                  className="action-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title="Gửi file"
                >
                  📎
                </button>
                <button
                  className="action-btn"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  title="Emoji"
                >
                  😊
                </button>
                <button
                  className={`action-btn ${isRecording ? 'recording' : ''}`}
                  onMouseDown={startVoiceRecording}
                  onMouseUp={stopVoiceRecording}
                  onMouseLeave={stopVoiceRecording}
                  title="Ghi âm"
                >
                  🎤
                </button>
              </div>

              <div className="message-input-wrapper">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  rows="1"
                />
                <button
                  className="send-btn"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  ➤
                </button>
              </div>

              {showEmojiPicker && (
                <div className="emoji-picker">
                  {emojis.map(emoji => (
                    <button
                      key={emoji}
                      className="emoji-btn"
                      onClick={() => {
                        setNewMessage(prev => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </>
        ) : (
          <div className="no-conversation">
            <div className="no-conversation-content">
              <div className="no-conversation-icon">💬</div>
              <h3>Chọn cuộc trò chuyện</h3>
              <p>Chọn một cuộc trò chuyện từ danh sách để bắt đầu nhắn tin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat; 