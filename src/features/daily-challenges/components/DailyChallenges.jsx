import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectDailyChallenges, 
  selectWeeklyChallenges, 
  selectCompletedChallenges,
  selectChallengeStats,
  selectChallengeLoading,
  loadDailyChallenges,
  loadWeeklyChallenges,
  completeChallenge,
  clearNewCompletion
} from '../state/challengeSlice.js';
import { selectUserStats } from '../../xp/state/xpSlice.js';
import './DailyChallenges.scss';

const DailyChallenges = () => {
  const dispatch = useDispatch();
  const dailyChallenges = useSelector(selectDailyChallenges);
  const weeklyChallenges = useSelector(selectWeeklyChallenges);
  const completedChallenges = useSelector(selectCompletedChallenges);
  const stats = useSelector(selectChallengeStats);
  const loading = useSelector(selectChallengeLoading);
  const userStats = useSelector(selectUserStats);
  const [activeTab, setActiveTab] = useState('daily');

  useEffect(() => {
    if (dailyChallenges.length === 0) {
      dispatch(loadDailyChallenges());
    }
    if (weeklyChallenges.length === 0) {
      dispatch(loadWeeklyChallenges());
    }
  }, [dispatch, dailyChallenges.length, weeklyChallenges.length]);

  const handleChallengeClick = (challenge) => {
    if (!completedChallenges.includes(challenge.id)) {
      dispatch(completeChallenge(challenge.id));
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#6c757d';
    }
  };

  const getDifficultyName = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Khó';
      default: return 'Dễ';
    }
  };

  const renderChallengeCard = (challenge) => {
    const isCompleted = completedChallenges.includes(challenge.id);
    const progress = challenge.progress || 0;

    return (
      <div
        key={challenge.id}
        className={`challenge-card ${isCompleted ? 'completed' : ''}`}
        onClick={() => handleChallengeClick(challenge)}
      >
        <div className="challenge-header">
          <div className="challenge-icon">{challenge.icon}</div>
          <div className="challenge-info">
            <h4 className="challenge-name">{challenge.name}</h4>
            <p className="challenge-description">{challenge.description}</p>
          </div>
          <div 
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
          >
            {getDifficultyName(challenge.difficulty)}
          </div>
        </div>

        <div className="challenge-progress">
          <div className="progress-info">
            <span className="progress-text">
              {challenge.currentProgress || 0}/{challenge.target}
            </span>
            <span className="progress-percentage">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${progress}%`,
                backgroundColor: getDifficultyColor(challenge.difficulty)
              }}
            ></div>
          </div>
        </div>

        <div className="challenge-reward">
          <span className="xp-reward">+{challenge.xpReward} XP</span>
          {isCompleted && (
            <div className="completion-badge">
              <span>✓</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStats = () => (
    <div className="challenge-stats">
      <div className="stats-header">
        <h3>📊 Thống kê thử thách</h3>
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.daily.completed}/{stats.daily.total}</div>
            <div className="stat-label">Hàng ngày</div>
            <div className="stat-progress">
              <div 
                className="progress-fill" 
                style={{ width: `${stats.daily.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{stats.weekly.completed}/{stats.weekly.total}</div>
            <div className="stat-label">Hàng tuần</div>
            <div className="stat-progress">
              <div 
                className="progress-fill" 
                style={{ width: `${stats.weekly.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">💎</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalXpEarned}</div>
            <div className="stat-label">XP kiếm được</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="daily-challenges">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Đang tải thử thách...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="daily-challenges">
      <div className="challenges-header">
        <h2>🎯 Thử thách</h2>
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            Hàng ngày
          </button>
          <button
            className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            Hàng tuần
          </button>
        </div>
      </div>

      {renderStats()}

      <div className="challenges-content">
        {activeTab === 'daily' ? (
          <div className="challenges-grid">
            {dailyChallenges.length > 0 ? (
              dailyChallenges.map(renderChallengeCard)
            ) : (
              <div className="no-challenges">
                <div className="no-challenges-icon">🎯</div>
                <p>Chưa có thử thách hàng ngày</p>
                <small>Thử thách mới sẽ xuất hiện vào ngày mai!</small>
              </div>
            )}
          </div>
        ) : (
          <div className="challenges-grid">
            {weeklyChallenges.length > 0 ? (
              weeklyChallenges.map(renderChallengeCard)
            ) : (
              <div className="no-challenges">
                <div className="no-challenges-icon">📅</div>
                <p>Chưa có thử thách hàng tuần</p>
                <small>Thử thách mới sẽ xuất hiện vào tuần tới!</small>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyChallenges; 