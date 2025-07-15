import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectActivities, 
  selectSocialLoading,
  loadActivities 
} from '../state/socialSlice.js';
import socialService from '../services/socialService.js';
import './ActivityFeed.scss';

const ActivityFeed = () => {
  const dispatch = useDispatch();
  const activities = useSelector(selectActivities);
  const loading = useSelector(selectSocialLoading);
  const [filter, setFilter] = useState('all');
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    dispatch(loadActivities(20));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(loadActivities(activities.length + 10));
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  const getActivityIcon = (type) => {
    return socialService.getActivityIcon(type);
  };

  const getActivityColor = (type) => {
    return socialService.getActivityColor(type);
  };

  const formatTimeAgo = (timestamp) => {
    return socialService.formatTimeAgo(timestamp);
  };

  const getActivityTitle = (activity) => {
    switch (activity.type) {
      case 'lesson_completed':
        return 'Hoàn thành bài học';
      case 'badge_unlocked':
        return 'Unlock badge mới';
      case 'challenge_completed':
        return 'Hoàn thành thử thách';
      case 'level_up':
        return 'Lên cấp';
      case 'streak_milestone':
        return 'Đạt milestone streak';
      case 'srs_review':
        return 'Ôn tập SRS';
      default:
        return 'Hoạt động mới';
    }
  };

  const renderActivityCard = (activity) => (
    <div key={activity.id} className="activity-card">
      <div className="activity-header">
        <div className="user-info">
          <div className="user-avatar">
            <span className="avatar-emoji">{activity.avatar}</span>
          </div>
          <div className="user-details">
            <div className="user-name">{activity.displayName}</div>
            <div className="activity-time">{formatTimeAgo(activity.timestamp)}</div>
          </div>
        </div>
        <div 
          className="activity-icon"
          style={{ backgroundColor: getActivityColor(activity.type) }}
        >
          {getActivityIcon(activity.type)}
        </div>
      </div>

      <div className="activity-content">
        <div className="activity-title">{activity.title}</div>
        <div className="activity-description">{activity.description}</div>
        {activity.xpEarned > 0 && (
          <div className="xp-earned">
            <span className="xp-icon">💎</span>
            <span className="xp-amount">+{activity.xpEarned} XP</span>
          </div>
        )}
      </div>

      <div className="activity-footer">
        <button className="action-btn like-btn">
          <span className="like-icon">👍</span>
          <span className="like-count">0</span>
        </button>
        <button className="action-btn comment-btn">
          <span className="comment-icon">💬</span>
          <span className="comment-count">0</span>
        </button>
        <button className="action-btn share-btn">
          <span className="share-icon">📤</span>
        </button>
      </div>
    </div>
  );

  const renderFilterTabs = () => (
    <div className="filter-tabs">
      <button
        className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        Tất cả ({activities.length})
      </button>
      <button
        className={`filter-tab ${filter === 'lesson_completed' ? 'active' : ''}`}
        onClick={() => setFilter('lesson_completed')}
      >
        📚 Bài học ({activities.filter(a => a.type === 'lesson_completed').length})
      </button>
      <button
        className={`filter-tab ${filter === 'badge_unlocked' ? 'active' : ''}`}
        onClick={() => setFilter('badge_unlocked')}
      >
        🏆 Badges ({activities.filter(a => a.type === 'badge_unlocked').length})
      </button>
      <button
        className={`filter-tab ${filter === 'level_up' ? 'active' : ''}`}
        onClick={() => setFilter('level_up')}
      >
        ⭐ Lên cấp ({activities.filter(a => a.type === 'level_up').length})
      </button>
    </div>
  );

  if (loading && activities.length === 0) {
    return (
      <div className="activity-feed">
        <div className="feed-header">
          <h2>📝 Hoạt động</h2>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Đang tải hoạt động...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-feed">
      <div className="feed-header">
        <h2>📝 Hoạt động</h2>
        <div className="feed-actions">
          <button className="refresh-btn" onClick={() => dispatch(loadActivities(20))}>
            🔄 Làm mới
          </button>
        </div>
      </div>

      {renderFilterTabs()}

      <div className="feed-content">
        {filteredActivities.length > 0 ? (
          <div className="activities-list">
            {filteredActivities.map(renderActivityCard)}
            
            {showLoadMore && activities.length >= 20 && (
              <div className="load-more-section">
                <button 
                  className="load-more-btn"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? 'Đang tải...' : 'Tải thêm'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="no-activities">
            <div className="no-activities-icon">📝</div>
            <p>Chưa có hoạt động nào</p>
            <small>Khi bạn bè có hoạt động mới, bạn sẽ thấy ở đây</small>
          </div>
        )}
      </div>

      {activities.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>Chưa có hoạt động</h3>
          <p>Kết bạn với những người học tiếng Nhật khác để xem hoạt động của họ!</p>
          <button className="btn-primary">Tìm bạn bè</button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed; 