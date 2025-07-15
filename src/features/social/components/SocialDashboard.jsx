import React, { useState } from 'react';
import FriendsList from './FriendsList.jsx';
import ActivityFeed from './ActivityFeed.jsx';
import Leaderboard from './Leaderboard.jsx';
import Chat from './Chat.jsx';
import './SocialDashboard.scss';

const SocialDashboard = () => {
  const [activeTab, setActiveTab] = useState('friends');

  const tabs = [
    { id: 'friends', label: '👥 Bạn bè', icon: '👥' },
    { id: 'chat', label: '💬 Chat', icon: '💬' },
    { id: 'activities', label: '📝 Hoạt động', icon: '📝' },
    { id: 'leaderboard', label: '🏆 Bảng xếp hạng', icon: '🏆' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'friends':
        return <FriendsList />;
      case 'chat':
        return <Chat />;
      case 'activities':
        return <ActivityFeed />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <FriendsList />;
    }
  };

  return (
    <div className="social-dashboard">
      <div className="dashboard-header">
        <h1>🌐 Cộng đồng</h1>
        <p className="dashboard-subtitle">
          Kết nối với cộng đồng học tiếng Nhật, theo dõi hoạt động và cạnh tranh trên bảng xếp hạng
        </p>
      </div>

      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>

      <div className="social-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-value">4</div>
              <div className="stat-label">Bạn bè</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📨</div>
            <div className="stat-info">
              <div className="stat-value">2</div>
              <div className="stat-label">Lời mời</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <div className="stat-value">4</div>
              <div className="stat-label">Hoạt động</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <div className="stat-value">#5</div>
              <div className="stat-label">Xếp hạng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialDashboard; 