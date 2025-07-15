import { GAME_TYPES, GAME_DIFFICULTY } from '../data/gamesData.js';

class TournamentService {
  constructor() {
    this.tournaments = new Map();
    this.participants = new Map();
    this.results = new Map();
    this.leaderboards = new Map();
    this.tournamentCallbacks = [];
  }

  // Tournament Management
  createTournament(tournamentData) {
    const tournamentId = `tournament_${Date.now()}`;
    const tournament = {
      id: tournamentId,
      name: tournamentData.name,
      description: tournamentData.description,
      gameType: tournamentData.gameType,
      difficulty: tournamentData.difficulty,
      startTime: tournamentData.startTime,
      endTime: tournamentData.endTime,
      maxParticipants: tournamentData.maxParticipants || 50,
      entryFee: tournamentData.entryFee || 0,
      prizePool: tournamentData.prizePool || { xp: 1000, coins: 100 },
      status: 'upcoming', // 'upcoming', 'active', 'completed', 'cancelled'
      rules: tournamentData.rules || [],
      createdBy: tournamentData.createdBy,
      createdAt: new Date().toISOString(),
      participants: [],
      rounds: [],
      currentRound: 0
    };

    this.tournaments.set(tournamentId, tournament);
    this.participants.set(tournamentId, []);
    this.results.set(tournamentId, []);
    this.leaderboards.set(tournamentId, []);

    return tournament;
  }

  getTournaments(status = null) {
    let tournaments = Array.from(this.tournaments.values());
    
    if (status) {
      tournaments = tournaments.filter(t => t.status === status);
    }
    
    return tournaments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getTournament(tournamentId) {
    return this.tournaments.get(tournamentId);
  }

  updateTournamentStatus(tournamentId, status) {
    const tournament = this.getTournament(tournamentId);
    if (tournament) {
      tournament.status = status;
      
      if (status === 'active') {
        tournament.startTime = new Date().toISOString();
      } else if (status === 'completed') {
        tournament.endTime = new Date().toISOString();
        this.calculateFinalResults(tournamentId);
      }
    }
  }

  // Participant Management
  joinTournament(tournamentId, userId, userData) {
    const tournament = this.getTournament(tournamentId);
    const participants = this.participants.get(tournamentId) || [];
    
    if (!tournament || tournament.status !== 'upcoming') {
      throw new Error('Tournament is not available for joining');
    }
    
    if (participants.length >= tournament.maxParticipants) {
      throw new Error('Tournament is full');
    }
    
    if (participants.find(p => p.userId === userId)) {
      throw new Error('Already joined this tournament');
    }

    const participant = {
      userId,
      username: userData.username,
      displayName: userData.displayName,
      avatar: userData.avatar,
      level: userData.level,
      joinedAt: new Date().toISOString(),
      status: 'active', // 'active', 'eliminated', 'winner'
      currentScore: 0,
      bestScore: 0,
      gamesPlayed: 0,
      totalTime: 0
    };

    participants.push(participant);
    this.participants.set(tournamentId, participants);
    tournament.participants = participants.map(p => p.userId);

    return participant;
  }

  leaveTournament(tournamentId, userId) {
    const participants = this.participants.get(tournamentId) || [];
    const updatedParticipants = participants.filter(p => p.userId !== userId);
    this.participants.set(tournamentId, updatedParticipants);
    
    const tournament = this.getTournament(tournamentId);
    if (tournament) {
      tournament.participants = updatedParticipants.map(p => p.userId);
    }
  }

  getParticipants(tournamentId) {
    return this.participants.get(tournamentId) || [];
  }

  // Game Results
  submitGameResult(tournamentId, userId, gameResult) {
    const tournament = this.getTournament(tournamentId);
    const participants = this.getParticipants(tournamentId);
    const participant = participants.find(p => p.userId === userId);
    
    if (!tournament || tournament.status !== 'active' || !participant) {
      throw new Error('Cannot submit result for this tournament');
    }

    const result = {
      id: `result_${Date.now()}`,
      tournamentId,
      userId,
      gameId: gameResult.gameId,
      score: gameResult.score,
      timeSpent: gameResult.timeSpent,
      mistakes: gameResult.mistakes,
      accuracy: gameResult.accuracy,
      submittedAt: new Date().toISOString()
    };

    // Update participant stats
    participant.currentScore = Math.max(participant.currentScore, gameResult.score);
    participant.bestScore = Math.max(participant.bestScore, gameResult.score);
    participant.gamesPlayed++;
    participant.totalTime += gameResult.timeSpent;

    // Add to results
    const results = this.results.get(tournamentId) || [];
    results.push(result);
    this.results.set(tournamentId, results);

    // Update leaderboard
    this.updateLeaderboard(tournamentId);

    // Check if tournament should end
    this.checkTournamentEnd(tournamentId);

    return result;
  }

  getResults(tournamentId, userId = null) {
    let results = this.results.get(tournamentId) || [];
    
    if (userId) {
      results = results.filter(r => r.userId === userId);
    }
    
    return results.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }

  // Leaderboard
  updateLeaderboard(tournamentId) {
    const participants = this.getParticipants(tournamentId);
    const results = this.getResults(tournamentId);
    
    const leaderboard = participants.map(participant => {
      const userResults = results.filter(r => r.userId === participant.userId);
      const bestResult = userResults.reduce((best, current) => 
        current.score > best.score ? current : best, { score: 0 }
      );
      
      return {
        ...participant,
        bestScore: bestResult.score,
        gamesPlayed: userResults.length,
        lastGameAt: userResults.length > 0 ? userResults[0].submittedAt : null
      };
    });

    // Sort by best score, then by games played (more games = better)
    leaderboard.sort((a, b) => {
      if (b.bestScore !== a.bestScore) {
        return b.bestScore - a.bestScore;
      }
      return b.gamesPlayed - a.gamesPlayed;
    });

    this.leaderboards.set(tournamentId, leaderboard);
  }

  getLeaderboard(tournamentId, limit = 10) {
    const leaderboard = this.leaderboards.get(tournamentId) || [];
    return leaderboard.slice(0, limit);
  }

  getUserRank(tournamentId, userId) {
    const leaderboard = this.getLeaderboard(tournamentId, 100);
    const userIndex = leaderboard.findIndex(p => p.userId === userId);
    return userIndex >= 0 ? userIndex + 1 : null;
  }

  // Tournament Progress
  checkTournamentEnd(tournamentId) {
    const tournament = this.getTournament(tournamentId);
    const participants = this.getParticipants(tournamentId);
    
    if (!tournament || tournament.status !== 'active') return;

    const now = new Date();
    const endTime = new Date(tournament.endTime);
    
    // Check if tournament time is up
    if (now >= endTime) {
      this.endTournament(tournamentId);
    }
    
    // Check if all participants have played at least one game
    const activeParticipants = participants.filter(p => p.gamesPlayed > 0);
    if (activeParticipants.length === participants.length && participants.length > 0) {
      // All participants have played, can end early if configured
      if (tournament.autoEndWhenComplete) {
        this.endTournament(tournamentId);
      }
    }
  }

  endTournament(tournamentId) {
    const tournament = this.getTournament(tournamentId);
    if (!tournament || tournament.status !== 'active') return;

    tournament.status = 'completed';
    tournament.endTime = new Date().toISOString();
    
    this.calculateFinalResults(tournamentId);
    this.distributePrizes(tournamentId);
    
    // Notify callbacks
    this.notifyTournamentCallbacks({
      type: 'tournament_ended',
      tournamentId,
      tournament
    });
  }

  calculateFinalResults(tournamentId) {
    const leaderboard = this.getLeaderboard(tournamentId, 100);
    
    // Mark winners
    if (leaderboard.length > 0) {
      leaderboard[0].status = 'winner';
      
      // Mark top 3 if there are enough participants
      if (leaderboard.length >= 3) {
        leaderboard[1].status = 'runner_up';
        leaderboard[2].status = 'third_place';
      }
    }
    
    // Mark others as eliminated
    leaderboard.slice(3).forEach(p => {
      p.status = 'eliminated';
    });
  }

  distributePrizes(tournamentId) {
    const tournament = this.getTournament(tournamentId);
    const leaderboard = this.getLeaderboard(tournamentId, 3);
    
    if (!tournament || !tournament.prizePool) return;

    const prizes = [
      { rank: 1, multiplier: 1.0 },
      { rank: 2, multiplier: 0.6 },
      { rank: 3, multiplier: 0.3 }
    ];

    prizes.forEach(prize => {
      const participant = leaderboard[prize.rank - 1];
      if (participant) {
        const xpReward = Math.floor(tournament.prizePool.xp * prize.multiplier);
        const coinReward = Math.floor(tournament.prizePool.coins * prize.multiplier);
        
        // In a real app, this would update the user's XP and coins
        console.log(`User ${participant.userId} won ${xpReward} XP and ${coinReward} coins for rank ${prize.rank}`);
      }
    });
  }

  // Tournament Statistics
  getTournamentStats(tournamentId) {
    const tournament = this.getTournament(tournamentId);
    const participants = this.getParticipants(tournamentId);
    const results = this.getResults(tournamentId);
    
    if (!tournament) return null;

    const totalGames = results.length;
    const averageScore = totalGames > 0 ? 
      results.reduce((sum, r) => sum + r.score, 0) / totalGames : 0;
    
    const bestScore = results.length > 0 ? 
      Math.max(...results.map(r => r.score)) : 0;
    
    const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);
    const averageTime = totalGames > 0 ? totalTime / totalGames : 0;

    return {
      tournamentId,
      totalParticipants: participants.length,
      activeParticipants: participants.filter(p => p.gamesPlayed > 0).length,
      totalGames,
      averageScore: Math.round(averageScore),
      bestScore,
      averageTime: Math.round(averageTime),
      tournamentDuration: tournament.endTime ? 
        new Date(tournament.endTime) - new Date(tournament.startTime) : 0
    };
  }

  // Real-time Updates
  addTournamentCallback(callback) {
    this.tournamentCallbacks.push(callback);
  }

  removeTournamentCallback(callback) {
    this.tournamentCallbacks = this.tournamentCallbacks.filter(cb => cb !== callback);
  }

  notifyTournamentCallbacks(event) {
    this.tournamentCallbacks.forEach(callback => callback(event));
  }

  // Tournament Templates
  getTournamentTemplates() {
    return [
      {
        id: 'daily_challenge',
        name: 'Thử thách hàng ngày',
        description: 'Cuộc thi hàng ngày với phần thưởng XP và coins',
        gameType: GAME_TYPES.MEMORY_MATCH,
        difficulty: GAME_DIFFICULTY.MEDIUM,
        duration: 24 * 60 * 60 * 1000, // 24 hours
        maxParticipants: 100,
        entryFee: 0,
        prizePool: { xp: 500, coins: 50 }
      },
      {
        id: 'weekly_championship',
        name: 'Giải vô địch tuần',
        description: 'Cuộc thi hàng tuần với phần thưởng lớn',
        gameType: GAME_TYPES.WORD_SCRAMBLE,
        difficulty: GAME_DIFFICULTY.HARD,
        duration: 7 * 24 * 60 * 60 * 1000, // 7 days
        maxParticipants: 200,
        entryFee: 10,
        prizePool: { xp: 2000, coins: 200 }
      },
      {
        id: 'speed_challenge',
        name: 'Thử thách tốc độ',
        description: 'Cuộc thi về tốc độ và độ chính xác',
        gameType: GAME_TYPES.SPEED_TYPING,
        difficulty: GAME_DIFFICULTY.MEDIUM,
        duration: 2 * 60 * 60 * 1000, // 2 hours
        maxParticipants: 50,
        entryFee: 5,
        prizePool: { xp: 800, coins: 80 }
      }
    ];
  }

  createTournamentFromTemplate(templateId, customData = {}) {
    const templates = this.getTournamentTemplates();
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
      throw new Error('Template not found');
    }

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + template.duration);

    const tournamentData = {
      name: customData.name || template.name,
      description: customData.description || template.description,
      gameType: customData.gameType || template.gameType,
      difficulty: customData.difficulty || template.difficulty,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      maxParticipants: customData.maxParticipants || template.maxParticipants,
      entryFee: customData.entryFee || template.entryFee,
      prizePool: customData.prizePool || template.prizePool,
      createdBy: customData.createdBy || 'system'
    };

    return this.createTournament(tournamentData);
  }

  // Helper Methods
  formatTimeRemaining(endTime) {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return 'Đã kết thúc';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} ngày còn lại`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m còn lại`;
    } else {
      return `${minutes}m còn lại`;
    }
  }

  getTournamentStatus(tournament) {
    const now = new Date();
    const startTime = new Date(tournament.startTime);
    const endTime = new Date(tournament.endTime);
    
    if (now < startTime) return 'upcoming';
    if (now >= startTime && now < endTime) return 'active';
    if (now >= endTime) return 'completed';
    return 'unknown';
  }
}

export default TournamentService; 