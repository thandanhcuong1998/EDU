import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Gamepad2, Trophy, BarChart3, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './GameCenter.scss';

const GameCenter = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('games');

  // Mock data để test
  const mockGames = [
    {
      id: 'memory_match',
      title: 'Memory Match',
      description: 'Ghép các cặp từ tiếng Nhật với nghĩa tương ứng',
      icon: '🧠',
      color: '#4CAF50',
      difficulty: 'Dễ'
    },
    {
      id: 'word_scramble',
      title: 'Word Scramble',
      description: 'Sắp xếp lại các ký tự để tạo thành từ tiếng Nhật đúng',
      icon: '🔀',
      color: '#FF9800',
      difficulty: 'Trung bình'
    },
    {
      id: 'speed_typing',
      title: 'Speed Typing',
      description: 'Gõ nhanh romaji của từ tiếng Nhật',
      icon: '⌨️',
      color: '#2196F3',
      difficulty: 'Khó'
    }
  ];

  const mockStats = {
    totalGames: 15,
    totalScore: 1250,
    averageScore: 83,
    totalXP: 450
  };

  const handleGameSelect = (gameId) => {
    console.log(`Starting game: ${gameId}`);
    switch (gameId) {
      case 'memory_match':
        navigate('/learn/games/memory-match');
        break;
      case 'word_scramble':
        navigate('/learn/games/word-scramble');
        break;
      case 'speed_typing':
        navigate('/learn/games/speed-typing');
        break;
      default:
        console.log('Game not implemented yet');
    }
  };

  const renderGameCard = (game) => (
    <div 
      key={game.id}
      className="game-card"
      onClick={() => handleGameSelect(game.id)}
      style={{ borderColor: game.color }}
    >
      <div className="game-header">
        <div className="game-icon" style={{ backgroundColor: game.color }}>
          {game.icon}
        </div>
        <div className="game-info">
          <h3 className="game-title">{game.title}</h3>
          <p className="game-description">{game.description}</p>
        </div>
      </div>

      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-label">Độ khó</span>
          <span className="stat-value">{game.difficulty}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Điểm cao nhất</span>
          <span className="stat-value">0</span>
        </div>
      </div>

      <div className="game-actions">
        <button 
          className="play-btn"
          style={{ backgroundColor: game.color }}
        >
          Chơi ngay
        </button>
      </div>
    </div>
  );

  const renderStatsCard = () => (
    <div className="stats-card">
      <h3>📊 Thống kê tổng quan</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon">🎮</div>
          <div className="stat-info">
            <div className="stat-value">{mockStats.totalGames}</div>
            <div className="stat-label">Tổng số game</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">💎</div>
          <div className="stat-info">
            <div className="stat-value">{mockStats.totalScore}</div>
            <div className="stat-label">Tổng điểm</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-value">{mockStats.averageScore}</div>
            <div className="stat-label">Điểm trung bình</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <div className="stat-value">{mockStats.totalXP}</div>
            <div className="stat-label">XP kiếm được</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'games':
        return (
          <div className="games-grid">
            {mockGames.map(renderGameCard)}
          </div>
        );
      case 'stats':
        return renderStatsCard();
      case 'tournament':
        return (
          <div className="tournament-section">
            <h3>🏆 Giải đấu</h3>
            <p>Chức năng giải đấu sẽ được phát triển sớm!</p>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="leaderboard-section">
            <h3>📊 Bảng xếp hạng</h3>
            <p>Bảng xếp hạng game sẽ được cập nhật sớm!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="game-center">
      <div className="game-center-header">
        <h1>🎮 Game Center</h1>
        <p>Học tiếng Nhật thông qua các trò chơi thú vị!</p>
      </div>

      <div className="game-center-tabs">
        <button 
          className={`tab-button ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          <Gamepad2 size={20} />
          Games
        </button>
        <button 
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <BarChart3 size={20} />
          Thống kê
        </button>
        <button 
          className={`tab-button ${activeTab === 'tournament' ? 'active' : ''}`}
          onClick={() => setActiveTab('tournament')}
        >
          <Trophy size={20} />
          Giải đấu
        </button>
        <button 
          className={`tab-button ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Users size={20} />
          Bảng xếp hạng
        </button>
      </div>

      <div className="game-center-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default GameCenter; 