import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectUserStats, 
  selectGameHistory, 
  selectAchievements,
  selectGameLoading,
  loadGameStats 
} from '../state/gameSlice.js';
import { GAME_TYPES, GAME_DIFFICULTY, getGameDescription } from '../data/gamesData.js';
import Tournament from './Tournament.jsx';
import './GameCenter.scss';

const GameCenter = () => {
  const dispatch = useDispatch();
  const userStats = useSelector(selectUserStats);
  const gameHistory = useSelector(selectGameHistory);
  const achievements = useSelector(selectAchievements);
  const loading = useSelector(selectGameLoading);
  const [selectedDifficulty, setSelectedDifficulty] = useState(GAME_DIFFICULTY.EASY);
  const [showStats, setShowStats] = useState(false);
  const [activeTab, setActiveTab] = useState('games');

  useEffect(() => {
    dispatch(loadGameStats());
  }, [dispatch]);

  const gameTypes = Object.values(GAME_TYPES);
  const difficulties = Object.values(GAME_DIFFICULTY);

  const handleGameSelect = (gameType) => {
    // Navigate to specific game component
    console.log(`Starting ${gameType} game with difficulty ${selectedDifficulty}`);
    // In a real app, you would navigate to the specific game component
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case GAME_DIFFICULTY.EASY: return '#4CAF50';
      case GAME_DIFFICULTY.MEDIUM: return '#FF9800';
      case GAME_DIFFICULTY.HARD: return '#F44336';
      default: return '#6c757d';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case GAME_DIFFICULTY.EASY: return 'Dễ';
      case GAME_DIFFICULTY.MEDIUM: return 'Trung bình';
      case GAME_DIFFICULTY.HARD: return 'Khó';
      default: return 'Dễ';
    }
  };

  const renderGameCard = (gameType) => {
    const gameInfo = getGameDescription(gameType);
    const gamesPlayed = userStats.gamesPlayed[gameType] || 0;
    const bestScore = userStats.bestScores[`${gameType}_${selectedDifficulty}`] || 0;

    return (
      <div 
        key={gameType}
        className="game-card"
        onClick={() => handleGameSelect(gameType)}
        style={{ borderColor: gameInfo.color }}
      >
        <div className="game-header">
          <div className="game-icon" style={{ backgroundColor: gameInfo.color }}>
            {gameInfo.icon}
          </div>
          <div className="game-info">
            <h3 className="game-title">{gameInfo.title}</h3>
            <p className="game-description">{gameInfo.description}</p>
          </div>
        </div>

        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-label">Đã chơi</span>
            <span className="stat-value">{gamesPlayed}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Điểm cao nhất</span>
            <span className="stat-value">{bestScore}</span>
          </div>
        </div>

        <div className="game-actions">
          <button 
            className="play-btn"
            style={{ backgroundColor: gameInfo.color }}
          >
            Chơi ngay
          </button>
        </div>
      </div>
    );
  };

  const renderStatsCard = () => (
    <div className="stats-card">
      <h3>📊 Thống kê tổng quan</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon">🎮</div>
          <div className="stat-info">
            <div className="stat-value">{userStats.totalGames}</div>
            <div className="stat-label">Tổng số game</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">💎</div>
          <div className="stat-info">
            <div className="stat-value">{userStats.totalScore}</div>
            <div className="stat-label">Tổng điểm</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-value">{Math.round(userStats.averageScore)}</div>
            <div className="stat-label">Điểm trung bình</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <div className="stat-value">{userStats.totalXP}</div>
            <div className="stat-label">XP kiếm được</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievementsCard = () => (
    <div className="achievements-card">
      <h3>🏆 Thành tựu ({achievements.length})</h3>
      {achievements.length > 0 ? (
        <div className="achievements-list">
          {achievements.map((achievement, index) => (
            <div key={achievement.id} className="achievement-item">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-info">
                <div className="achievement-title">{achievement.title}</div>
                <div className="achievement-description">{achievement.description}</div>
                <div className="achievement-reward">+{achievement.xpReward} XP</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-achievements">
          <p>Chưa có thành tựu nào</p>
          <small>Chơi games để unlock thành tựu!</small>
        </div>
      )}
    </div>
  );

  const renderRecentGamesCard = () => (
    <div className="recent-games-card">
      <h3>📝 Game gần đây</h3>
      {gameHistory.length > 0 ? (
        <div className="recent-games-list">
          {gameHistory.slice(0, 5).map((game, index) => (
            <div key={game.id} className="recent-game-item">
              <div className="game-type">
                {getGameDescription(game.type).icon} {getGameDescription(game.type).title}
              </div>
              <div className="game-details">
                <span className="game-score">{game.score} điểm</span>
                <span className="game-difficulty" style={{ color: getDifficultyColor(game.difficulty) }}>
                  {getDifficultyLabel(game.difficulty)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-recent-games">
          <p>Chưa có game nào</p>
          <small>Bắt đầu chơi game đầu tiên!</small>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="game-center">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Đang tải Game Center...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'games':
        return (
          <>
            <div className="difficulty-selector">
              <h3>Chọn độ khó:</h3>
              <div className="difficulty-buttons">
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    className={`difficulty-btn ${selectedDifficulty === difficulty ? 'active' : ''}`}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    style={{ 
                      backgroundColor: selectedDifficulty === difficulty ? getDifficultyColor(difficulty) : 'transparent',
                      borderColor: getDifficultyColor(difficulty)
                    }}
                  >
                    {getDifficultyLabel(difficulty)}
                  </button>
                ))}
              </div>
            </div>

            <div className="games-grid">
              {gameTypes.map(renderGameCard)}
            </div>

            <div className="stats-toggle">
              <button 
                className="toggle-btn"
                onClick={() => setShowStats(!showStats)}
              >
                {showStats ? 'Ẩn thống kê' : 'Xem thống kê'}
              </button>
            </div>

            {showStats && (
              <div className="stats-section">
                <div className="stats-layout">
                  {renderStatsCard()}
                  {renderAchievementsCard()}
                  {renderRecentGamesCard()}
                </div>
              </div>
            )}
          </>
        );
      case 'tournament':
        return <Tournament />;
      default:
        return null;
    }
  };

  return (
    <div className="game-center">
      <div className="game-center-header">
        <h1>🎮 Game Center</h1>
        <p className="subtitle">
          Học tiếng Nhật thông qua các mini-games thú vị và đầy thử thách
        </p>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          <span className="tab-icon">🎮</span>
          <span className="tab-label">Mini Games</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'tournament' ? 'active' : ''}`}
          onClick={() => setActiveTab('tournament')}
        >
          <span className="tab-icon">🏆</span>
          <span className="tab-label">Tournament</span>
        </button>
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default GameCenter; 