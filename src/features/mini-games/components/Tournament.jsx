import React, { useState, useEffect, useRef } from 'react';
import TournamentService from '../services/tournamentService.js';
import { GAME_TYPES, GAME_DIFFICULTY, getGameDescription } from '../data/gamesData.js';
import './Tournament.scss';

const Tournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [userTournaments, setUserTournaments] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const tournamentService = useRef(new TournamentService());
  const currentUserId = 'current_user'; // In real app, get from auth

  useEffect(() => {
    initializeSampleData();
    loadTournaments();
    
    // Set up tournament listener
    const handleTournamentUpdate = (event) => {
      if (event.type === 'tournament_ended') {
        loadTournaments();
      }
    };

    tournamentService.current.addTournamentCallback(handleTournamentUpdate);

    return () => {
      tournamentService.current.removeTournamentCallback(handleTournamentUpdate);
    };
  }, []);

  const initializeSampleData = () => {
    // Create sample tournaments
    const templates = tournamentService.current.getTournamentTemplates();
    
    templates.forEach(template => {
      try {
        const tournament = tournamentService.current.createTournamentFromTemplate(
          template.id,
          { createdBy: 'system' }
        );
        
        // Add some sample participants
        const sampleUsers = [
          { userId: 'user1', username: 'user1', displayName: 'Mai Anh', avatar: '👩‍🎓', level: 15 },
          { userId: 'user2', username: 'user2', displayName: 'Hùng', avatar: '👨‍💻', level: 12 },
          { userId: 'user3', username: 'user3', displayName: 'Lan', avatar: '👩‍🏫', level: 18 }
        ];
        
        sampleUsers.forEach(user => {
          try {
            tournamentService.current.joinTournament(tournament.id, user.userId, user);
          } catch (error) {
            // User might already be joined
          }
        });
        
        // Start some tournaments
        if (template.id === 'daily_challenge') {
          tournamentService.current.updateTournamentStatus(tournament.id, 'active');
        }
      } catch (error) {
        console.error('Error creating tournament:', error);
      }
    });
  };

  const loadTournaments = () => {
    const allTournaments = tournamentService.current.getTournaments();
    setTournaments(allTournaments);
    
    // Get user's tournaments
    const userTours = allTournaments.filter(t => 
      tournamentService.current.getParticipants(t.id).some(p => p.userId === currentUserId)
    );
    setUserTournaments(userTours);
  };

  const handleJoinTournament = (tournamentId) => {
    try {
      const userData = {
        userId: currentUserId,
        username: 'current_user',
        displayName: 'Bạn 👤',
        avatar: '👤',
        level: 10
      };
      
      tournamentService.current.joinTournament(tournamentId, currentUserId, userData);
      loadTournaments();
      
      // Show success message
      alert('Đã tham gia tournament thành công!');
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    }
  };

  const handleLeaveTournament = (tournamentId) => {
    try {
      tournamentService.current.leaveTournament(tournamentId, currentUserId);
      loadTournaments();
      alert('Đã rời khỏi tournament!');
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    }
  };

  const handleCreateTournament = () => {
    if (!selectedTemplate) {
      alert('Vui lòng chọn template!');
      return;
    }

    setLoading(true);
    
    try {
      const tournament = tournamentService.current.createTournamentFromTemplate(
        selectedTemplate.id,
        { createdBy: currentUserId }
      );
      
      // Auto join the created tournament
      const userData = {
        userId: currentUserId,
        username: 'current_user',
        displayName: 'Bạn 👤',
        avatar: '👤',
        level: 10
      };
      
      tournamentService.current.joinTournament(tournament.id, currentUserId, userData);
      
      loadTournaments();
      setShowCreateModal(false);
      setSelectedTemplate(null);
      alert('Tạo tournament thành công!');
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return '#ffa726';
      case 'active': return '#4caf50';
      case 'completed': return '#9e9e9e';
      default: return '#6c757d';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'upcoming': return 'Sắp diễn ra';
      case 'active': return 'Đang diễn ra';
      case 'completed': return 'Đã kết thúc';
      default: return 'Không xác định';
    }
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

  const isUserParticipating = (tournamentId) => {
    const participants = tournamentService.current.getParticipants(tournamentId);
    return participants.some(p => p.userId === currentUserId);
  };

  const getUserRank = (tournamentId) => {
    return tournamentService.current.getUserRank(tournamentId, currentUserId);
  };

  const renderTournamentCard = (tournament) => {
    const participants = tournamentService.current.getParticipants(tournament.id);
    const stats = tournamentService.current.getTournamentStats(tournament.id);
    const gameInfo = getGameDescription(tournament.gameType);
    const isParticipating = isUserParticipating(tournament.id);
    const userRank = getUserRank(tournament.id);
    const timeRemaining = tournamentService.current.formatTimeRemaining(tournament.endTime);

    return (
      <div 
        key={tournament.id}
        className="tournament-card"
        onClick={() => setSelectedTournament(tournament)}
      >
        <div className="tournament-header">
          <div className="tournament-status" style={{ backgroundColor: getStatusColor(tournament.status) }}>
            {getStatusLabel(tournament.status)}
          </div>
          <div className="tournament-time">
            {timeRemaining}
          </div>
        </div>

        <div className="tournament-info">
          <h3 className="tournament-name">{tournament.name}</h3>
          <p className="tournament-description">{tournament.description}</p>
          
          <div className="tournament-details">
            <div className="detail-item">
              <span className="detail-icon">🎮</span>
              <span className="detail-text">{gameInfo.title}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📊</span>
              <span className="detail-text" style={{ color: getDifficultyColor(tournament.difficulty) }}>
                {getDifficultyLabel(tournament.difficulty)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">👥</span>
              <span className="detail-text">{participants.length}/{tournament.maxParticipants}</span>
            </div>
          </div>
        </div>

        <div className="tournament-prizes">
          <div className="prize-item">
            <span className="prize-icon">⭐</span>
            <span className="prize-text">{tournament.prizePool.xp} XP</span>
          </div>
          <div className="prize-item">
            <span className="prize-icon">💰</span>
            <span className="prize-text">{tournament.prizePool.coins} Coins</span>
          </div>
        </div>

        <div className="tournament-actions">
          {isParticipating ? (
            <div className="participant-info">
              <span className="participant-status">Đã tham gia</span>
              {userRank && (
                <span className="user-rank">Xếp hạng: #{userRank}</span>
              )}
              <button 
                className="leave-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLeaveTournament(tournament.id);
                }}
              >
                Rời khỏi
              </button>
            </div>
          ) : (
            <button 
              className="join-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleJoinTournament(tournament.id);
              }}
              disabled={tournament.status !== 'upcoming'}
            >
              Tham gia
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderTournamentDetail = () => {
    if (!selectedTournament) return null;

    const participants = tournamentService.current.getParticipants(selectedTournament.id);
    const leaderboard = tournamentService.current.getLeaderboard(selectedTournament.id, 10);
    const stats = tournamentService.current.getTournamentStats(selectedTournament.id);
    const gameInfo = getGameDescription(selectedTournament.gameType);

    return (
      <div className="tournament-detail">
        <div className="detail-header">
          <button 
            className="back-btn"
            onClick={() => setSelectedTournament(null)}
          >
            ← Quay lại
          </button>
          <h2>{selectedTournament.name}</h2>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h3>📋 Thông tin</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Mô tả:</span>
                <span className="info-value">{selectedTournament.description}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Game:</span>
                <span className="info-value">{gameInfo.title}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Độ khó:</span>
                <span className="info-value" style={{ color: getDifficultyColor(selectedTournament.difficulty) }}>
                  {getDifficultyLabel(selectedTournament.difficulty)}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Thời gian:</span>
                <span className="info-value">
                  {tournamentService.current.formatTimeRemaining(selectedTournament.endTime)}
                </span>
              </div>
            </div>
          </div>

          {stats && (
            <div className="detail-section">
              <h3>📊 Thống kê</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{stats.totalParticipants}</div>
                  <div className="stat-label">Tham gia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.activeParticipants}</div>
                  <div className="stat-label">Đã chơi</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.totalGames}</div>
                  <div className="stat-label">Tổng game</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.bestScore}</div>
                  <div className="stat-label">Điểm cao nhất</div>
                </div>
              </div>
            </div>
          )}

          <div className="detail-section">
            <h3>🏆 Bảng xếp hạng</h3>
            <div className="leaderboard">
              {leaderboard.map((participant, index) => (
                <div key={participant.userId} className="leaderboard-item">
                  <div className="rank">#{index + 1}</div>
                  <div className="participant-info">
                    <div className="participant-avatar">{participant.avatar}</div>
                    <div className="participant-details">
                      <div className="participant-name">{participant.displayName}</div>
                      <div className="participant-level">Level {participant.level}</div>
                    </div>
                  </div>
                  <div className="participant-score">
                    <div className="score-value">{participant.bestScore}</div>
                    <div className="score-label">điểm</div>
                  </div>
                  <div className="participant-status">
                    {participant.status === 'winner' && <span className="winner-badge">🥇</span>}
                    {participant.status === 'runner_up' && <span className="runner-up-badge">🥈</span>}
                    {participant.status === 'third_place' && <span className="third-badge">🥉</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCreateModal = () => {
    if (!showCreateModal) return null;

    const templates = tournamentService.current.getTournamentTemplates();

    return (
      <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>🏆 Tạo Tournament mới</h3>
            <button 
              className="close-btn"
              onClick={() => setShowCreateModal(false)}
            >
              ×
            </button>
          </div>

          <div className="modal-body">
            <div className="template-selection">
              <h4>Chọn template:</h4>
              <div className="template-grid">
                {templates.map(template => (
                  <div
                    key={template.id}
                    className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <h5>{template.name}</h5>
                    <p>{template.description}</p>
                    <div className="template-details">
                      <span>🎮 {getGameDescription(template.gameType).title}</span>
                      <span>📊 {getDifficultyLabel(template.difficulty)}</span>
                      <span>⏰ {Math.floor(template.duration / (1000 * 60 * 60))}h</span>
                    </div>
                    <div className="template-prize">
                      <span>🏆 {template.prizePool.xp} XP + {template.prizePool.coins} Coins</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button 
              className="cancel-btn"
              onClick={() => setShowCreateModal(false)}
            >
              Hủy
            </button>
            <button 
              className="create-btn"
              onClick={handleCreateTournament}
              disabled={!selectedTemplate || loading}
            >
              {loading ? 'Đang tạo...' : 'Tạo Tournament'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="tournament-container">
      <div className="tournament-header">
        <h1>🏆 Tournament</h1>
        <p className="tournament-subtitle">
          Tham gia các cuộc thi và cạnh tranh với người chơi khác để giành phần thưởng
        </p>
        <button 
          className="create-tournament-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + Tạo Tournament
        </button>
      </div>

      {selectedTournament ? (
        renderTournamentDetail()
      ) : (
        <div className="tournament-content">
          <div className="tournament-tabs">
            <div className="tab-section">
              <h3>🎯 Tournament đang diễn ra</h3>
              <div className="tournament-grid">
                {tournaments
                  .filter(t => t.status === 'active')
                  .map(renderTournamentCard)
                }
              </div>
            </div>

            <div className="tab-section">
              <h3>⏰ Tournament sắp diễn ra</h3>
              <div className="tournament-grid">
                {tournaments
                  .filter(t => t.status === 'upcoming')
                  .map(renderTournamentCard)
                }
              </div>
            </div>

            <div className="tab-section">
              <h3>🏁 Tournament đã kết thúc</h3>
              <div className="tournament-grid">
                {tournaments
                  .filter(t => t.status === 'completed')
                  .map(renderTournamentCard)
                }
              </div>
            </div>

            {userTournaments.length > 0 && (
              <div className="tab-section">
                <h3>👤 Tournament của bạn</h3>
                <div className="tournament-grid">
                  {userTournaments.map(renderTournamentCard)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {renderCreateModal()}
    </div>
  );
};

export default Tournament; 