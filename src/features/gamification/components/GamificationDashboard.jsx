import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserStats, selectCurrentLevel, selectCurrentRank } from '../../xp/state/xpSlice.js';
import { selectBadgeStats, selectNearUnlockBadges } from '../../achievements/state/badgeSlice.js';
import { selectChallengeStats, selectNearCompletionChallenges } from '../../daily-challenges/state/challengeSlice.js';
import BadgeDisplay from '../../achievements/components/BadgeDisplay.jsx';
import DailyChallenges from '../../daily-challenges/components/DailyChallenges.jsx';
import XPDisplay from '../../xp/components/XPDisplay.jsx';
import './GamificationDashboard.scss';

const GamificationDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const userStats = useSelector(selectUserStats);
  const currentLevel = useSelector(selectCurrentLevel);
  const currentRank = useSelector(selectCurrentRank);
  const badgeStats = useSelector(selectBadgeStats);
  const nearUnlockBadges = useSelector(selectNearUnlockBadges);
  const challengeStats = useSelector(selectChallengeStats);
  const nearCompletionChallenges = useSelector(selectNearCompletionChallenges);

  const tabs = [
    { id: 'overview', name: 'Tổng quan', icon: '📊' },
    { id: 'badges', name: 'Thành tích', icon: '🏆' },
    { id: 'challenges', name: 'Thử thách', icon: '🎯' },
    { id: 'progress', name: 'Tiến độ', icon: '📈' }
  ];

  const renderOverview = () => (
    <div className="overview-section">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{currentLevel}</div>
            <div className="stat-label">Cấp độ</div>
            <div className="stat-subtitle">{currentRank?.name}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value">{badgeStats.unlocked}</div>
            <div className="stat-label">Badges</div>
            <div className="stat-subtitle">{badgeStats.progress}% hoàn thành</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{challengeStats.daily.completed + challengeStats.weekly.completed}</div>
            <div className="stat-label">Thử thách</div>
            <div className="stat-subtitle">Đã hoàn thành</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">{userStats.currentStreak || 0}</div>
            <div className="stat-label">Streak</div>
            <div className="stat-subtitle">Ngày liên tiếp</div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>🚀 Hành động nhanh</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <span className="action-icon">📚</span>
            <span className="action-text">Học bài mới</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🔄</span>
            <span className="action-text">Ôn tập SRS</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🎯</span>
            <span className="action-text">Xem thử thách</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🏆</span>
            <span className="action-text">Xem thành tích</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="progress-section">
      <div className="progress-cards">
        <div className="progress-card">
          <h3>📚 Bài học</h3>
          <div className="progress-info">
            <div className="progress-stats">
              <span className="current">{userStats.lessonsCompleted || 0}</span>
              <span className="separator">/</span>
              <span className="target">∞</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        <div className="progress-card">
          <h3>🔄 SRS Reviews</h3>
          <div className="progress-info">
            <div className="progress-stats">
              <span className="current">{userStats.srsReviews || 0}</span>
              <span className="separator">/</span>
              <span className="target">∞</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        <div className="progress-card">
          <h3>⭐ Perfect Scores</h3>
          <div className="progress-info">
            <div className="progress-stats">
              <span className="current">{userStats.perfectScores || 0}</span>
              <span className="separator">/</span>
              <span className="target">∞</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="near-completion">
        <h3>🎯 Gần hoàn thành</h3>
        <div className="near-items">
          {nearUnlockBadges.slice(0, 3).map((badge) => (
            <div key={badge.id} className="near-item">
              <div className="near-icon">{badge.icon}</div>
              <div className="near-info">
                <div className="near-name">{badge.name}</div>
                <div className="near-progress">{badge.progress}%</div>
              </div>
            </div>
          ))}
          {nearCompletionChallenges.slice(0, 3).map((challenge) => (
            <div key={challenge.id} className="near-item">
              <div className="near-icon">{challenge.icon}</div>
              <div className="near-info">
                <div className="near-name">{challenge.name}</div>
                <div className="near-progress">{challenge.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="gamification-dashboard">
      <div className="dashboard-header">
        <h1>🎮 Gamification Dashboard</h1>
        <p>Theo dõi tiến độ học tập và thành tích của bạn</p>
      </div>

      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-name">{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'badges' && <BadgeDisplay showStats={true} showUnlocked={true} />}
        {activeTab === 'challenges' && <DailyChallenges />}
        {activeTab === 'progress' && renderProgress()}
      </div>

      <div className="xp-display-container">
        <XPDisplay />
      </div>
    </div>
  );
};

export default GamificationDashboard; 