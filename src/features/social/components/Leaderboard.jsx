import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectLeaderboard, 
  selectLeaderboardCategory,
  selectSocialLoading,
  loadLeaderboard 
} from '../state/socialSlice.js';
import './Leaderboard.scss';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector(selectLeaderboard);
  const category = useSelector(selectLeaderboardCategory);
  const loading = useSelector(selectSocialLoading);
  const [selectedCategory, setSelectedCategory] = useState('totalXP');

  useEffect(() => {
    dispatch(loadLeaderboard({ category: selectedCategory, limit: 20 }));
  }, [dispatch, selectedCategory]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'totalXP': return '💎';
      case 'level': return '⭐';
      case 'streak': return '🔥';
      case 'badges': return '🏆';
      default: return '📊';
    }
  };

  const getCategoryName = (cat) => {
    switch (cat) {
      case 'totalXP': return 'Tổng XP';
      case 'level': return 'Cấp độ';
      case 'streak': return 'Streak';
      case 'badges': return 'Badges';
      default: return 'Tổng XP';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return 'var(--text-secondary)';
    }
  };

  const getRankBackground = (rank) => {
    switch (rank) {
      case 1: return 'linear-gradient(135deg, #FFD700, #FFA500)';
      case 2: return 'linear-gradient(135deg, #C0C0C0, #A9A9A9)';
      case 3: return 'linear-gradient(135deg, #CD7F32, #B8860B)';
      default: return 'var(--bg-secondary)';
    }
  };

  const getValueDisplay = (user, cat) => {
    switch (cat) {
      case 'totalXP':
        return user.totalXP.toLocaleString();
      case 'level':
        return `Lv.${user.level}`;
      case 'streak':
        return `${user.currentStreak} ngày`;
      case 'badges':
        return `${user.badges} badges`;
      default:
        return user.totalXP.toLocaleString();
    }
  };

  const renderLeaderboardItem = (user, index) => (
    <div 
      key={user.userId} 
      className={`leaderboard-item ${index < 3 ? 'top-three' : ''}`}
      style={{
        background: getRankBackground(user.rank),
        border: index < 3 ? '2px solid rgba(255, 255, 255, 0.3)' : 'none'
      }}
    >
      <div className="rank-section">
        <div 
          className="rank-icon"
          style={{ color: getRankColor(user.rank) }}
        >
          {getRankIcon(user.rank)}
        </div>
        <div className="rank-number">{user.rank}</div>
      </div>

      <div className="user-section">
        <div className="user-avatar">
          <span className="avatar-emoji">{user.avatar}</span>
        </div>
        <div className="user-info">
          <div className="user-name">{user.displayName}</div>
          <div className="user-level">
            <span className="level-badge">
              Lv.{user.level} {user.rank}
            </span>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="main-stat">
          <span className="stat-icon">{getCategoryIcon(selectedCategory)}</span>
          <span className="stat-value">{getValueDisplay(user, selectedCategory)}</span>
        </div>
        <div className="secondary-stats">
          <span className="secondary-stat">🔥 {user.currentStreak}</span>
          <span className="secondary-stat">🏆 {user.badges}</span>
        </div>
      </div>

      {index < 3 && (
        <div className="crown-decoration">
          {index === 0 && '👑'}
        </div>
      )}
    </div>
  );

  const renderCategoryTabs = () => (
    <div className="category-tabs">
      {['totalXP', 'level', 'streak', 'badges'].map(cat => (
        <button
          key={cat}
          className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => handleCategoryChange(cat)}
        >
          <span className="tab-icon">{getCategoryIcon(cat)}</span>
          <span className="tab-label">{getCategoryName(cat)}</span>
        </button>
      ))}
    </div>
  );

  if (loading && leaderboard.length === 0) {
    return (
      <div className="leaderboard">
        <div className="leaderboard-header">
          <h2>🏆 Bảng xếp hạng</h2>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Đang tải bảng xếp hạng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>🏆 Bảng xếp hạng</h2>
        <div className="header-actions">
          <button 
            className="refresh-btn" 
            onClick={() => dispatch(loadLeaderboard({ category: selectedCategory, limit: 20 }))}
          >
            🔄 Làm mới
          </button>
        </div>
      </div>

      {renderCategoryTabs()}

      <div className="leaderboard-content">
        {leaderboard.length > 0 ? (
          <div className="leaderboard-list">
            {leaderboard.map((user, index) => renderLeaderboardItem(user, index))}
            
            <div className="leaderboard-footer">
              <p className="update-info">
                Cập nhật lần cuối: {new Date().toLocaleTimeString('vi-VN')}
              </p>
              <p className="info-text">
                Bảng xếp hạng được cập nhật theo thời gian thực
              </p>
            </div>
          </div>
        ) : (
          <div className="no-leaderboard">
            <div className="no-leaderboard-icon">🏆</div>
            <p>Chưa có dữ liệu xếp hạng</p>
            <small>Hãy bắt đầu học để xuất hiện trên bảng xếp hạng!</small>
          </div>
        )}
      </div>

      {leaderboard.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>Chưa có bảng xếp hạng</h3>
          <p>Hoàn thành bài học đầu tiên để xuất hiện trên bảng xếp hạng!</p>
          <button className="btn-primary">Bắt đầu học</button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard; 