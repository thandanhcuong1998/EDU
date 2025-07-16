import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Volume2, VolumeX, Settings, Star, Shuffle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './WordScramble.scss';

const WordScramble = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Enhanced game data with Japanese words
  const gameData = {
    easy: [
      { word: 'こんにちは', meaning: 'Xin chào', category: 'greetings', hint: 'Lời chào thân thiện' },
      { word: 'ありがとう', meaning: 'Cảm ơn', category: 'greetings', hint: 'Thể hiện lòng biết ơn' },
      { word: 'おはよう', meaning: 'Chào buổi sáng', category: 'greetings', hint: 'Chào khi mặt trời mọc' },
      { word: 'さようなら', meaning: 'Tạm biệt', category: 'greetings', hint: 'Lời chào tạm biệt' },
      { word: 'おやすみ', meaning: 'Chúc ngủ ngon', category: 'greetings', hint: 'Lời chúc trước khi ngủ' },
      { word: 'いただきます', meaning: 'Mời ăn', category: 'food', hint: 'Nói trước khi ăn' },
      { word: 'おいしい', meaning: 'Ngon', category: 'food', hint: 'Cảm giác khi ăn ngon' },
      { word: '水', meaning: 'Nước', category: 'drinks', hint: 'Chất lỏng cần thiết' },
      { word: 'お茶', meaning: 'Trà', category: 'drinks', hint: 'Đồ uống truyền thống' },
      { word: '家族', meaning: 'Gia đình', category: 'family', hint: 'Những người thân yêu' }
    ],
    medium: [
      { word: 'こんにちは', meaning: 'Xin chào', category: 'greetings', hint: 'Lời chào thân thiện' },
      { word: 'ありがとう', meaning: 'Cảm ơn', category: 'greetings', hint: 'Thể hiện lòng biết ơn' },
      { word: 'おはよう', meaning: 'Chào buổi sáng', category: 'greetings', hint: 'Chào khi mặt trời mọc' },
      { word: 'さようなら', meaning: 'Tạm biệt', category: 'greetings', hint: 'Lời chào tạm biệt' },
      { word: 'おやすみ', meaning: 'Chúc ngủ ngon', category: 'greetings', hint: 'Lời chúc trước khi ngủ' },
      { word: 'いただきます', meaning: 'Mời ăn', category: 'food', hint: 'Nói trước khi ăn' },
      { word: 'おいしい', meaning: 'Ngon', category: 'food', hint: 'Cảm giác khi ăn ngon' },
      { word: '水', meaning: 'Nước', category: 'drinks', hint: 'Chất lỏng cần thiết' },
      { word: 'お茶', meaning: 'Trà', category: 'drinks', hint: 'Đồ uống truyền thống' },
      { word: '家族', meaning: 'Gia đình', category: 'family', hint: 'Những người thân yêu' },
      { word: '友達', meaning: 'Bạn bè', category: 'family', hint: 'Những người bạn thân' },
      { word: '学校', meaning: 'Trường học', category: 'education', hint: 'Nơi học tập' },
      { word: '勉強', meaning: 'Học tập', category: 'education', hint: 'Hoạt động tiếp thu kiến thức' },
      { word: '仕事', meaning: 'Công việc', category: 'work', hint: 'Hoạt động kiếm sống' },
      { word: '会社', meaning: 'Công ty', category: 'work', hint: 'Tổ chức làm việc' },
      { word: '電車', meaning: 'Tàu điện', category: 'transport', hint: 'Phương tiện công cộng' },
      { word: '車', meaning: 'Xe hơi', category: 'transport', hint: 'Phương tiện cá nhân' },
      { word: '空港', meaning: 'Sân bay', category: 'transport', hint: 'Nơi máy bay cất cánh' }
    ],
    hard: [
      { word: 'こんにちは', meaning: 'Xin chào', category: 'greetings', hint: 'Lời chào thân thiện' },
      { word: 'ありがとう', meaning: 'Cảm ơn', category: 'greetings', hint: 'Thể hiện lòng biết ơn' },
      { word: 'おはよう', meaning: 'Chào buổi sáng', category: 'greetings', hint: 'Chào khi mặt trời mọc' },
      { word: 'さようなら', meaning: 'Tạm biệt', category: 'greetings', hint: 'Lời chào tạm biệt' },
      { word: 'おやすみ', meaning: 'Chúc ngủ ngon', category: 'greetings', hint: 'Lời chúc trước khi ngủ' },
      { word: 'いただきます', meaning: 'Mời ăn', category: 'food', hint: 'Nói trước khi ăn' },
      { word: 'おいしい', meaning: 'Ngon', category: 'food', hint: 'Cảm giác khi ăn ngon' },
      { word: '水', meaning: 'Nước', category: 'drinks', hint: 'Chất lỏng cần thiết' },
      { word: 'お茶', meaning: 'Trà', category: 'drinks', hint: 'Đồ uống truyền thống' },
      { word: '家族', meaning: 'Gia đình', category: 'family', hint: 'Những người thân yêu' },
      { word: '友達', meaning: 'Bạn bè', category: 'family', hint: 'Những người bạn thân' },
      { word: '学校', meaning: 'Trường học', category: 'education', hint: 'Nơi học tập' },
      { word: '勉強', meaning: 'Học tập', category: 'education', hint: 'Hoạt động tiếp thu kiến thức' },
      { word: '仕事', meaning: 'Công việc', category: 'work', hint: 'Hoạt động kiếm sống' },
      { word: '会社', meaning: 'Công ty', category: 'work', hint: 'Tổ chức làm việc' },
      { word: '電車', meaning: 'Tàu điện', category: 'transport', hint: 'Phương tiện công cộng' },
      { word: '車', meaning: 'Xe hơi', category: 'transport', hint: 'Phương tiện cá nhân' },
      { word: '空港', meaning: 'Sân bay', category: 'transport', hint: 'Nơi máy bay cất cánh' },
      { word: '病院', meaning: 'Bệnh viện', category: 'health', hint: 'Nơi chữa bệnh' },
      { word: '医者', meaning: 'Bác sĩ', category: 'health', hint: 'Người chữa bệnh' },
      { word: '薬', meaning: 'Thuốc', category: 'health', hint: 'Thứ để chữa bệnh' },
      { word: '映画', meaning: 'Phim', category: 'entertainment', hint: 'Giải trí trên màn hình' },
      { word: '音楽', meaning: 'Âm nhạc', category: 'entertainment', hint: 'Nghệ thuật âm thanh' },
      { word: '本', meaning: 'Sách', category: 'entertainment', hint: 'Nguồn kiến thức' },
      { word: '公園', meaning: 'Công viên', category: 'places', hint: 'Nơi vui chơi ngoài trời' },
      { word: '図書館', meaning: 'Thư viện', category: 'places', hint: 'Nơi đọc sách' },
      { word: '銀行', meaning: 'Ngân hàng', category: 'places', hint: 'Nơi gửi tiền' }
    ]
  };

  // Load best scores from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('wordScrambleBestScore');
    if (savedBestScore) setBestScore(parseInt(savedBestScore));
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, timeLeft]);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'correct':
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
        break;
      case 'wrong':
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        break;
      case 'hint':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
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

  const scrambleWord = (word) => {
    const chars = word.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
  };

  const getRandomWord = () => {
    const currentData = gameData[difficulty];
    const randomIndex = Math.floor(Math.random() * currentData.length);
    return currentData[randomIndex];
  };

  const initializeGame = () => {
    const word = getRandomWord();
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word.word));
    setUserInput('');
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setGameStarted(false);
    setGameCompleted(false);
    setStreak(0);
    setHintUsed(false);
    setShowHint(false);
  };

  const calculateScore = (baseScore, currentStreak, timeBonus = 0) => {
    const streakBonus = Math.floor(currentStreak / 3) * 5;
    const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
    return Math.floor((baseScore + streakBonus + timeBonus) * difficultyMultiplier);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameStarted) setGameStarted(true);
    
    if (userInput.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      const timeBonus = Math.max(0, Math.floor(timeLeft / 10));
      const newStreak = streak + 1;
      setStreak(newStreak);
      const scoreGain = calculateScore(10, newStreak, timeBonus);
      
      playSound('correct');
      setScore(prev => prev + scoreGain);
      setLevel(prev => prev + 1);
      
      // Get next word
      const nextWord = getRandomWord();
      setCurrentWord(nextWord);
      setScrambledWord(scrambleWord(nextWord.word));
      setUserInput('');
      setHintUsed(false);
      setShowHint(false);
    } else {
      playSound('wrong');
      setStreak(0);
      setUserInput('');
    }
  };

  const handleShuffle = () => {
    if (currentWord) {
      setScrambledWord(scrambleWord(currentWord.word));
      playSound('hint');
    }
  };

  const handleHint = () => {
    if (!hintUsed && currentWord) {
      setShowHint(true);
      setHintUsed(true);
      playSound('hint');
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyInfo = () => {
    switch (difficulty) {
      case 'easy': return { name: 'Dễ', time: 60, color: '#4ade80' };
      case 'medium': return { name: 'Trung bình', time: 60, color: '#fbbf24' };
      case 'hard': return { name: 'Khó', time: 60, color: '#f87171' };
      default: return { name: 'Dễ', time: 60, color: '#4ade80' };
    }
  };

  if (showTutorial) {
    return (
      <div className="word-scramble tutorial">
        <div className="tutorial-content">
          <h1>🔤 Hướng dẫn chơi Word Scramble</h1>
          <div className="tutorial-steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>Xem từ tiếng Nhật đã được xáo trộn</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Sắp xếp lại các ký tự thành từ đúng</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Nhập từ đúng vào ô trả lời</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <p>Hoàn thành càng nhiều từ càng tốt trong thời gian cho phép!</p>
            </div>
          </div>
          <div className="tutorial-tips">
            <h3>💡 Mẹo chơi:</h3>
            <ul>
              <li>Sử dụng nút "Xáo trộn" để xem từ ở góc độ khác</li>
              <li>Sử dụng "Gợi ý" khi gặp khó khăn</li>
              <li>Chuỗi đúng liên tiếp sẽ cho điểm thưởng!</li>
            </ul>
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
    const stars = Math.floor(score / 50) + 1;
    
    return (
      <div className="word-scramble">
        <div className="game-header">
          <button className="back-btn" onClick={() => navigate('/learn/games')}>
            <ArrowLeft size={20} />
            Quay lại
          </button>
          <h1>🎉 Hoàn thành!</h1>
          <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>
            <Settings size={20} />
          </button>
        </div>
        
        <div className="completion-screen">
          <div className="trophy-icon">
            <Trophy size={80} />
          </div>
          <h2>Bạn đã hoàn thành Word Scramble!</h2>
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
              <span className="stat-label">Cấp độ:</span>
              <span className="stat-value">{level - 1}</span>
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
    <div className="word-scramble">
      <div className="game-header">
        <button className="back-btn" onClick={() => navigate('/learn/games')}>
          <ArrowLeft size={20} />
          Quay lại
        </button>
        <h1>🔤 Word Scramble</h1>
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
              <option value="easy">Dễ (10 từ)</option>
              <option value="medium">Trung bình (20 từ)</option>
              <option value="hard">Khó (30 từ)</option>
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
          <span className="stat-label">Cấp độ:</span>
          <span className="stat-value">{level}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Thời gian:</span>
          <span className="stat-value time-left">{formatTime(timeLeft)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Chuỗi:</span>
          <span className="stat-value streak">{streak}</span>
        </div>
        <div className="difficulty-indicator" style={{ backgroundColor: getDifficultyInfo().color }}>
          {getDifficultyInfo().name}
        </div>
      </div>

      {currentWord && (
        <div className="game-area">
          <div className="word-display">
            <div className="scrambled-word">{scrambledWord}</div>
            <div className="word-meaning">{currentWord.meaning}</div>
            <div className="word-category">{currentWord.category}</div>
          </div>

          <div className="game-controls">
            <button className="shuffle-btn" onClick={handleShuffle}>
              <Shuffle size={20} />
              Xáo trộn
            </button>
            <button 
              className={`hint-btn ${hintUsed ? 'used' : ''}`} 
              onClick={handleHint}
              disabled={hintUsed}
            >
              💡 Gợi ý
            </button>
          </div>

          {showHint && (
            <div className="hint-display">
              <p>💡 {currentWord.hint}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="answer-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Nhập từ tiếng Nhật..."
              className="answer-input"
              autoFocus
            />
            <button type="submit" className="submit-btn">
              <Check size={20} />
              Kiểm tra
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WordScramble; 