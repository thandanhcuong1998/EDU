import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUnlockedBadges, selectBadgeStats, clearNewBadge } from '../state/badgeSlice.js';
import badgeService from '../services/badgeService.js';
import './BadgeDisplay.scss';

const BadgeDisplay = ({ showUnlocked = true, showStats = true, maxDisplay = 6 }) => {
  const dispatch = useDispatch();
  const unlockedBadges = useSelector(selectUnlockedBadges);
  const stats = useSelector(selectBadgeStats);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const unlockedBadgeDetails = unlockedBadges
    .map(badgeId => badgeService.getBadgeById(badgeId))
    .filter(Boolean)
    .slice(0, maxDisplay);

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
    setShowModal(true);
    // Xóa khỏi danh sách mới nếu có
    dispatch(clearNewBadge(badge.id));
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBadge(null);
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

  if (!showUnlocked && !showStats) {
    return null;
  }

  return (
    <div className="badge-display">
      {showStats && (
        <div className="badge-stats">
          <div className="stats-header">
            <h3>🏆 Thành tích</h3>
            <div className="progress-info">
              <span>{stats.unlocked}/{stats.total}</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${stats.progress}%` }}
                ></div>
              </div>
              <span>{stats.progress}%</span>
            </div>
          </div>
          
          <div className="stats-breakdown">
            <div className="stat-item">
              <span className="stat-label">Bài học</span>
              <span className="stat-value">{stats.byType.lesson?.unlocked || 0}/{stats.byType.lesson?.total || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Streak</span>
              <span className="stat-value">{stats.byType.streak?.unlocked || 0}/{stats.byType.streak?.total || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">SRS</span>
              <span className="stat-value">{stats.byType.srs?.unlocked || 0}/{stats.byType.srs?.total || 0}</span>
            </div>
          </div>
        </div>
      )}

      {showUnlocked && (
        <div className="badge-grid">
          <h3>Badges đã đạt được</h3>
          {unlockedBadgeDetails.length > 0 ? (
            <div className="badges-container">
              {unlockedBadgeDetails.map((badge) => (
                <div
                  key={badge.id}
                  className="badge-item unlocked"
                  onClick={() => handleBadgeClick(badge)}
                  style={{ 
                    borderColor: getRarityColor(badge.rarity),
                    boxShadow: `0 0 10px ${getRarityColor(badge.rarity)}40`
                  }}
                >
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-info">
                    <div className="badge-name">{badge.name}</div>
                    <div className="badge-rarity" style={{ color: getRarityColor(badge.rarity) }}>
                      {getRarityName(badge.rarity)}
                    </div>
                  </div>
                  <div className="badge-xp">+{badge.xpReward} XP</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-badges">
              <div className="no-badges-icon">🏆</div>
              <p>Chưa có badges nào</p>
              <small>Hãy học tập để nhận badges đầu tiên!</small>
            </div>
          )}
        </div>
      )}

      {/* Modal chi tiết badge */}
      {showModal && selectedBadge && (
        <div className="badge-modal-overlay" onClick={closeModal}>
          <div className="badge-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-content">
              <div 
                className="badge-detail"
                style={{ borderColor: getRarityColor(selectedBadge.rarity) }}
              >
                <div className="badge-icon-large">{selectedBadge.icon}</div>
                <h2>{selectedBadge.name}</h2>
                <p className="badge-description">{selectedBadge.description}</p>
                
                <div className="badge-meta">
                  <div className="meta-item">
                    <span className="meta-label">Độ hiếm:</span>
                    <span 
                      className="meta-value" 
                      style={{ color: getRarityColor(selectedBadge.rarity) }}
                    >
                      {getRarityName(selectedBadge.rarity)}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Loại:</span>
                    <span className="meta-value">{selectedBadge.type}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Phần thưởng:</span>
                    <span className="meta-value xp-reward">+{selectedBadge.xpReward} XP</span>
                  </div>
                </div>

                <div className="badge-actions">
                  <button className="btn-share">Chia sẻ</button>
                  <button className="btn-close" onClick={closeModal}>Đóng</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay; 