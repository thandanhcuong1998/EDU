import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Volume2, VolumeX, Settings, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MemoryMatch.scss';

const MemoryMatch = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [difficulty, setDifficulty] = useState('easy'); // easy, medium, hard
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestTime, setBestTime] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  // Enhanced game data with more categories
  const gameData = {
    easy: [
      { id: 1, word: 'こんにちは', meaning: 'Xin chào', emoji: '👋', category: 'greetings' },
      { id: 2, word: 'ありがとう', meaning: 'Cảm ơn', emoji: '🙏', category: 'greetings' },
      { id: 3, word: 'おはよう', meaning: 'Chào buổi sáng', emoji: '🌅', category: 'greetings' },
      { id: 4, word: 'さようなら', meaning: 'Tạm biệt', emoji: '👋', category: 'greetings' },
      { id: 5, word: 'おやすみ', meaning: 'Chúc ngủ ngon', emoji: '😴', category: 'greetings' },
      { id: 6, word: 'いただきます', meaning: 'Mời ăn', emoji: '🍽️', category: 'food' }
    ],
    medium: [
      { id: 1, word: 'こんにちは', meaning: 'Xin chào', emoji: '👋', category: 'greetings' },
      { id: 2, word: 'ありがとう', meaning: 'Cảm ơn', emoji: '🙏', category: 'greetings' },
      { id: 3, word: 'おはよう', meaning: 'Chào buổi sáng', emoji: '🌅', category: 'greetings' },
      { id: 4, word: 'さようなら', meaning: 'Tạm biệt', emoji: '👋', category: 'greetings' },
      { id: 5, word: 'おやすみ', meaning: 'Chúc ngủ ngon', emoji: '😴', category: 'greetings' },
      { id: 6, word: 'いただきます', meaning: 'Mời ăn', emoji: '🍽️', category: 'food' },
      { id: 7, word: 'おいしい', meaning: 'Ngon', emoji: '😋', category: 'food' },
      { id: 8, word: 'お腹が空いた', meaning: 'Đói bụng', emoji: '🍽️', category: 'food' },
      { id: 9, word: '水', meaning: 'Nước', emoji: '💧', category: 'drinks' },
      { id: 10, word: 'お茶', meaning: 'Trà', emoji: '🍵', category: 'drinks' }
    ],
    hard: [
      { id: 1, word: 'こんにちは', meaning: 'Xin chào', emoji: '👋', category: 'greetings' },
      { id: 2, word: 'ありがとう', meaning: 'Cảm ơn', emoji: '🙏', category: 'greetings' },
      { id: 3, word: 'おはよう', meaning: 'Chào buổi sáng', emoji: '🌅', category: 'greetings' },
      { id: 4, word: 'さようなら', meaning: 'Tạm biệt', emoji: '👋', category: 'greetings' },
      { id: 5, word: 'おやすみ', meaning: 'Chúc ngủ ngon', emoji: '😴', category: 'greetings' },
      { id: 6, word: 'いただきます', meaning: 'Mời ăn', emoji: '🍽️', category: 'food' },
      { id: 7, word: 'おいしい', meaning: 'Ngon', emoji: '😋', category: 'food' },
      { id: 8, word: 'お腹が空いた', meaning: 'Đói bụng', emoji: '🍽️', category: 'food' },
      { id: 9, word: '水', meaning: 'Nước', emoji: '💧', category: 'drinks' },
      { id: 10, word: 'お茶', meaning: 'Trà', emoji: '🍵', category: 'drinks' },
      { id: 11, word: '家族', meaning: 'Gia đình', emoji: '👨‍👩‍👧‍👦', category: 'family' },
      { id: 12, word: '友達', meaning: 'Bạn bè', emoji: '👥', category: 'family' },
      { id: 13, word: '学校', meaning: 'Trường học', emoji: '🏫', category: 'education' },
      { id: 14, word: '勉強', meaning: 'Học tập', emoji: '📚', category: 'education' },
      { id: 15, word: '仕事', meaning: 'Công việc', emoji: '💼', category: 'work' }
    ]
  };

  // Load best scores from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('memoryMatchBestScore');
    const savedBestTime = localStorage.getItem('memoryMatchBestTime');
    if (savedBestScore) setBestScore(parseInt(savedBestScore));
    if (savedBestTime) setBestTime(parseInt(savedBestTime));
  }, []);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    
    // Simple sound simulation with Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'flip':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        break;
      case 'match':
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
        break;
      case 'wrong':
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        break;
      case 'complete':
        oscillator.frequency.setValueAtTime(1500, audioContext.currentTime);
        break;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }, [soundEnabled]);

  const initializeGame = () => {
    const currentData = gameData[difficulty];
    
    // Create pairs of cards (word and meaning)
    const cardPairs = [];
    currentData.forEach((item, index) => {
      // Word card
      cardPairs.push({
        id: `word_${index}`,
        type: 'word',
        content: item.word,
        meaning: item.meaning,
        emoji: item.emoji,
        category: item.category,
        pairId: index,
        matched: false
      });
      // Meaning card
      cardPairs.push({
        id: `meaning_${index}`,
        type: 'meaning',
        content: item.meaning,
        word: item.word,
        emoji: item.emoji,
        category: item.category,
        pairId: index,
        matched: false
      });
    });

    // Shuffle cards
    const shuffledCards = shuffleArray(cardPairs);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setMoves(0);
    setGameCompleted(false);
    setGameStarted(false);
    setTimer(0);
    setStreak(0);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const calculateScore = (baseScore, currentStreak) => {
    const streakBonus = Math.floor(currentStreak / 3) * 5;
    const timeBonus = Math.max(0, 10 - Math.floor(timer / 30));
    return baseScore + streakBonus + timeBonus;
  };

  const handleCardClick = (cardId) => {
    if (!gameStarted) setGameStarted(true);
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.matched || flippedCards.includes(cardId)) return;

    playSound('flip');
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        const newStreak = streak + 1;
        setStreak(newStreak);
        const scoreGain = calculateScore(10, newStreak);
        
        playSound('match');
        setMatchedPairs(prev => [...prev, firstCard.pairId]);
        setScore(prev => prev + scoreGain);
        
        // Update cards as matched
        setCards(prev => prev.map(c => 
          c.pairId === firstCard.pairId ? { ...c, matched: true } : c
        ));
        
        setFlippedCards([]);
        
        // Check if game is completed
        if (matchedPairs.length + 1 === gameData[difficulty].length) {
          playSound('complete');
          setGameCompleted(true);
          
          // Update best scores
          if (score + scoreGain > bestScore) {
            setBestScore(score + scoreGain);
            localStorage.setItem('memoryMatchBestScore', (score + scoreGain).toString());
          }
          if (timer < bestTime || bestTime === 0) {
            setBestTime(timer);
            localStorage.setItem('memoryMatchBestTime', timer.toString());
          }
        }
      } else {
        // No match, flip cards back after delay
        playSound('wrong');
        setStreak(0);
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCardContent = (card) => {
    if (card.type === 'word') {
      return (
        <div className="card-content word-card">
          <div className="card-emoji">{card.emoji}</div>
          <div className="card-text">{card.content}</div>
          <div className="card-category">{card.category}</div>
        </div>
      );
    } else {
      return (
        <div className="card-content meaning-card">
          <div className="card-text">{card.content}</div>
          <div className="card-category">{card.category}</div>
        </div>
      );
    }
  };

  const getDifficultyInfo = () => {
    switch (difficulty) {
      case 'easy': return { name: 'Dễ', pairs: 6, color: '#4ade80' };
      case 'medium': return { name: 'Trung bình', pairs: 10, color: '#fbbf24' };
      case 'hard': return { name: 'Khó', pairs: 15, color: '#f87171' };
      default: return { name: 'Dễ', pairs: 6, color: '#4ade80' };
    }
  };

  if (showTutorial) {
    return (
      <div className="memory-match tutorial">
        <div className="tutorial-content">
          <h1>🎮 Hướng dẫn chơi Memory Match</h1>
          <div className="tutorial-steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>Nhấp vào các thẻ để lật chúng</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Ghép từ tiếng Nhật với nghĩa tương ứng</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Hoàn thành tất cả cặp để thắng</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <p>Chuỗi đúng liên tiếp sẽ cho điểm thưởng!</p>
            </div>
          </div>
          <button className="start-game-btn" onClick={() => setShowTutorial(false)}>
            Bắt đầu chơi!
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const difficultyInfo = getDifficultyInfo();
    const stars = Math.floor(score / 20) + 1;
    
    return (
      <div className="memory-match">
        <div className="game-header">
          <button className="back-btn" onClick={() => navigate('/learn/games')}>
            <ArrowLeft size={20} />
            Quay lại
          </button>
          <h1>🎉 Chúc mừng!</h1>
          <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>
            <Settings size={20} />
          </button>
        </div>
        
        <div className="completion-screen">
          <div className="trophy-icon">
            <Trophy size={80} />
          </div>
          <h2>Bạn đã hoàn thành Memory Match!</h2>
          <div className="difficulty-badge" style={{ backgroundColor: difficultyInfo.color }}>
            {difficultyInfo.name}
          </div>
          
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={30} 
                className={star <= stars ? 'star-filled' : 'star-empty'} 
              />
            ))}
          </div>
          
          <div className="final-stats">
            <div className="stat">
              <span className="stat-label">Điểm số:</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Số lượt:</span>
              <span className="stat-value">{moves}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Thời gian:</span>
              <span className="stat-value">{formatTime(timer)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Chuỗi dài nhất:</span>
              <span className="stat-value">{streak}</span>
            </div>
          </div>
          
          {bestScore > 0 && (
            <div className="best-scores">
              <h3>🏆 Kỷ lục</h3>
              <div className="best-score">
                <span>Điểm cao nhất: {bestScore}</span>
              </div>
              {bestTime > 0 && (
                <div className="best-time">
                  <span>Thời gian nhanh nhất: {formatTime(bestTime)}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="completion-actions">
            <button className="play-again-btn" onClick={initializeGame}>
              <RotateCcw size={20} />
              Chơi lại
            </button>
            <button className="change-difficulty-btn" onClick={() => setShowSettings(true)}>
              <Settings size={20} />
              Thay đổi độ khó
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-match">
      <div className="game-header">
        <button className="back-btn" onClick={() => navigate('/learn/games')}>
          <ArrowLeft size={20} />
          Quay lại
        </button>
        <h1>🧠 Memory Match</h1>
        <div className="header-actions">
          <button 
            className="sound-btn" 
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button 
            className="settings-btn" 
            onClick={() => setShowSettings(!showSettings)}
            title="Cài đặt"
          >
            <Settings size={20} />
          </button>
          <button className="restart-btn" onClick={initializeGame}>
            <RotateCcw size={20} />
            Chơi lại
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <h3>Cài đặt</h3>
          <div className="setting-group">
            <label>Độ khó:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Dễ (6 cặp)</option>
              <option value="medium">Trung bình (10 cặp)</option>
              <option value="hard">Khó (15 cặp)</option>
            </select>
          </div>
          <div className="setting-group">
            <label>Âm thanh:</label>
            <input 
              type="checkbox" 
              checked={soundEnabled} 
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
          </div>
          <button className="close-settings" onClick={() => setShowSettings(false)}>
            Đóng
          </button>
        </div>
      )}

      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Điểm:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Lượt:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Thời gian:</span>
          <span className="stat-value">{formatTime(timer)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Chuỗi:</span>
          <span className="stat-value streak">{streak}</span>
        </div>
        <div className="difficulty-indicator" style={{ backgroundColor: getDifficultyInfo().color }}>
          {getDifficultyInfo().name}
        </div>
      </div>

      <div className="game-instructions">
        <p>Ghép các cặp từ tiếng Nhật với nghĩa tương ứng!</p>
        <p className="progress-text">
          Tiến độ: {matchedPairs.length}/{gameData[difficulty].length} cặp
        </p>
      </div>

      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.matched ? 'matched' : ''} ${
              flippedCards.includes(card.id) ? 'flipped' : ''
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-back-content">❓</div>
              </div>
              <div className="card-back">
                {getCardContent(card)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch; 