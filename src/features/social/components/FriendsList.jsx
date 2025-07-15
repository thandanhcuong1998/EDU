import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectFriends, 
  selectOnlineFriends, 
  selectFriendRequests,
  selectPendingFriendRequests,
  loadFriends,
  loadFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend
} from '../state/socialSlice.js';
import socialService from '../services/socialService.js';
import './FriendsList.scss';

const FriendsList = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const onlineFriends = useSelector(selectOnlineFriends);
  const friendRequests = useSelector(selectFriendRequests);
  const pendingRequests = useSelector(selectPendingFriendRequests);
  const [activeTab, setActiveTab] = useState('friends');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showFriendModal, setShowFriendModal] = useState(false);

  useEffect(() => {
    dispatch(loadFriends());
    dispatch(loadFriendRequests());
  }, [dispatch]);

  const handleAcceptRequest = (requestId) => {
    dispatch(acceptFriendRequest(requestId));
  };

  const handleRejectRequest = (requestId) => {
    dispatch(rejectFriendRequest(requestId));
  };

  const handleRemoveFriend = (friendId) => {
    if (window.confirm('Bạn có chắc muốn xóa bạn bè này?')) {
      dispatch(removeFriend(friendId));
    }
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setShowFriendModal(true);
  };

  const closeFriendModal = () => {
    setShowFriendModal(false);
    setSelectedFriend(null);
  };

  const formatLastActive = (timestamp) => {
    return socialService.formatTimeAgo(timestamp);
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      case 'Expert': return '#9C27B0';
      default: return '#6c757d';
    }
  };

  const renderFriendCard = (friend) => (
    <div 
      key={friend.id}
      className={`friend-card ${friend.isOnline ? 'online' : 'offline'}`}
      onClick={() => handleFriendClick(friend)}
    >
      <div className="friend-avatar">
        <span className="avatar-emoji">{friend.avatar}</span>
        {friend.isOnline && <div className="online-indicator"></div>}
      </div>
      
      <div className="friend-info">
        <div className="friend-name">{friend.displayName}</div>
        <div className="friend-level">
          <span className="level-badge" style={{ backgroundColor: getRankColor(friend.rank) }}>
            Lv.{friend.level} {friend.rank}
          </span>
        </div>
        <div className="friend-stats">
          <span className="stat">🔥 {friend.currentStreak} ngày</span>
          <span className="stat">💎 {friend.totalXP.toLocaleString()} XP</span>
        </div>
        {!friend.isOnline && (
          <div className="last-active">
            Hoạt động {formatLastActive(friend.lastActive)}
          </div>
        )}
      </div>

      <div className="friend-actions">
        <button 
          className="action-btn remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFriend(friend.id);
          }}
          title="Xóa bạn bè"
        >
          🗑️
        </button>
      </div>
    </div>
  );

  const renderFriendRequest = (request) => (
    <div key={request.id} className="friend-request-card">
      <div className="request-avatar">
        <span className="avatar-emoji">{request.from.avatar}</span>
      </div>
      
      <div className="request-info">
        <div className="request-name">{request.from.displayName}</div>
        <div className="request-level">
          <span className="level-badge" style={{ backgroundColor: getRankColor(request.from.rank) }}>
            Lv.{request.from.level} {request.from.rank}
          </span>
        </div>
        <div className="request-message">{request.message}</div>
        <div className="request-time">
          {formatLastActive(request.sentAt)}
        </div>
      </div>

      <div className="request-actions">
        <button 
          className="action-btn accept-btn"
          onClick={() => handleAcceptRequest(request.id)}
        >
          ✓
        </button>
        <button 
          className="action-btn reject-btn"
          onClick={() => handleRejectRequest(request.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );

  const renderFriendModal = () => (
    <div className="friend-modal-overlay" onClick={closeFriendModal}>
      <div className="friend-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={closeFriendModal}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="friend-detail">
            <div className="detail-avatar">
              <span className="avatar-emoji">{selectedFriend?.avatar}</span>
              {selectedFriend?.isOnline && <div className="online-indicator"></div>}
            </div>
            
            <h2>{selectedFriend?.displayName}</h2>
            <p className="friend-username">@{selectedFriend?.username}</p>
            
            <div className="friend-stats-grid">
              <div className="stat-item">
                <div className="stat-value">{selectedFriend?.level}</div>
                <div className="stat-label">Cấp độ</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{selectedFriend?.currentStreak}</div>
                <div className="stat-label">Streak</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{selectedFriend?.totalXP.toLocaleString()}</div>
                <div className="stat-label">XP</div>
              </div>
            </div>

            <div className="friend-actions-modal">
              <button className="btn-primary">Nhắn tin</button>
              <button className="btn-secondary">Xem hồ sơ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="friends-list">
      <div className="friends-header">
        <h2>👥 Bạn bè</h2>
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            Bạn bè ({friends.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Lời mời ({pendingRequests})
          </button>
        </div>
      </div>

      <div className="friends-content">
        {activeTab === 'friends' ? (
          <div className="friends-section">
            {onlineFriends.length > 0 && (
              <div className="online-friends">
                <h3>🟢 Đang online ({onlineFriends.length})</h3>
                <div className="friends-grid">
                  {onlineFriends.map(renderFriendCard)}
                </div>
              </div>
            )}

            <div className="all-friends">
              <h3>👥 Tất cả bạn bè</h3>
              {friends.length > 0 ? (
                <div className="friends-grid">
                  {friends.map(renderFriendCard)}
                </div>
              ) : (
                <div className="no-friends">
                  <div className="no-friends-icon">👥</div>
                  <p>Chưa có bạn bè nào</p>
                  <small>Hãy tìm và kết bạn với những người học tiếng Nhật khác!</small>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="requests-section">
            <h3>📨 Lời mời kết bạn</h3>
            {friendRequests.length > 0 ? (
              <div className="requests-grid">
                {friendRequests.map(renderFriendRequest)}
              </div>
            ) : (
              <div className="no-requests">
                <div className="no-requests-icon">📨</div>
                <p>Không có lời mời kết bạn nào</p>
                <small>Khi có người gửi lời mời kết bạn, bạn sẽ thấy ở đây</small>
              </div>
            )}
          </div>
        )}
      </div>

      {showFriendModal && selectedFriend && renderFriendModal()}
    </div>
  );
};

export default FriendsList; 