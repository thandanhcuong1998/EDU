import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNewBadges, clearNewBadge } from '../state/badgeSlice.js';
import './BadgeNotification.scss';

const BadgeNotification = () => {
  const dispatch = useDispatch();
  const newBadges = useSelector(selectNewBadges);
  const [visibleBadges, setVisibleBadges] = useState([]);

  useEffect(() => {
    if (newBadges.length > 0) {
      // Hiển thị badge mới nhất
      const latestBadge = newBadges[newBadges.length - 1];
      setVisibleBadges(prev => [...prev, { ...latestBadge, id: `${latestBadge.id}-${Date.now()}` }]);
    }
  }, [newBadges]);

  const handleClose = (badgeId) => {
    setVisibleBadges(prev => prev.filter(badge => badge.id !== badgeId));
    // Xóa khỏi Redux store
    const originalBadgeId = badgeId.split('-')[0];
    dispatch(clearNewBadge(originalBadgeId));
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#6c757d';
      case 'rare': return '#007bff';
      case 'epic': return '#6f42c1';
      case 'legendary': return '#fd7e14';
      default: return '#6c757d';
    }
  };

  const getRarityName = (rarity) => {
    switch (rarity) {
      case 'common': return 'Thường';
      case 'rare': return 'Hiếm';
      case 'epic': return 'Epic';
      case 'legendary': return 'Huyền thoại';
      default: return 'Thường';
    }
  };

  if (visibleBadges.length === 0) {
    return null;
  }

  return (
    <div className="badge-notifications">
      {visibleBadges.map((badge) => (
        <div
          key={badge.id}
          className="badge-notification"
          style={{ borderColor: getRarityColor(badge.rarity) }}
        >
          <div className="notification-content">
            <div className="badge-icon">{badge.icon}</div>
            <div className="badge-info">
              <div className="badge-title">Badge mới!</div>
              <div className="badge-name">{badge.name}</div>
              <div className="badge-description">{badge.description}</div>
              <div className="badge-meta">
                <span 
                  className="badge-rarity" 
                  style={{ color: getRarityColor(badge.rarity) }}
                >
                  {getRarityName(badge.rarity)}
                </span>
                <span className="badge-xp">+{badge.xpReward} XP</span>
              </div>
            </div>
            <button 
              className="close-btn"
              onClick={() => handleClose(badge.id)}
            >
              ×
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="notification-progress">
            <div className="progress-fill"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgeNotification; 