import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Volume2, VolumeX, Settings, Star, Clock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SpeedTyping.scss';

const SpeedTyping = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [wordList, setWordList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [bestWpm, setBestWpm] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [totalTyped, setTotalTyped] = useState(0);
  const [errors, setErrors] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  // Enhanced game data with Japanese words and their meanings
  const gameData = {
    easy: [
      { word: 'こんにちは', meaning: 'Xin chào', category: 'greetings' },
      { word: 'ありがとう', meaning: 'Cảm ơn', category: 'greetings' },
      { word: 'おはよう', meaning: 'Chào buổi sáng', category: 'greetings' },
      { word: 'さようなら', meaning: 'Tạm biệt', category: 'greetings' },
      { word: 'おやすみ', meaning: 'Chúc ngủ ngon', category: 'greetings' },
      { word: 'いただきます', meaning: 'Mời ăn', category: 'food' },
      { word: 'おいしい', meaning: 'Ngon', category: 'food' },
      { word: '水', meaning: 'Nước', category: 'drinks' },
      { word: 'お茶', meaning: 'Trà', category: 'drinks' },
      { word: '家族', meaning: 'Gia đình', category: 'family' },
      { word: '友達', meaning: 'Bạn bè', category: 'family' },
      { word: '学校', meaning: 'Trường học', category: 'education' },
      { word: '勉強', meaning: 'Học tập', category: 'education' },
      { word: '仕事', meaning: 'Công việc', category: 'work' },
      { word: '会社', meaning: 'Công ty', category: 'work' }
    ],
    medium: [
      { word: 'こんにちは', meaning: 'Xin chào', category: 'greetings' },
      { word: 'ありがとう', meaning: 'Cảm ơn', category: 'greetings' },
      { word: 'おはよう', meaning: 'Chào buổi sáng', category: 'greetings' },
      { word: 'さようなら', meaning: 'Tạm biệt', category: 'greetings' },
      { word: 'おやすみ', meaning: 'Chúc ngủ ngon', category: 'greetings' },
      { word: 'いただきます', meaning: 'Mời ăn', category: 'food' },
      { word: 'おいしい', meaning: 'Ngon', category: 'food' },
      { word: '水', meaning: 'Nước', category: 'drinks' },
      { word: 'お茶', meaning: 'Trà', category: 'drinks' },
      { word: '家族', meaning: 'Gia đình', category: 'family' },
      { word: '友達', meaning: 'Bạn bè', category: 'family' },
      { word: '学校', meaning: 'Trường học', category: 'education' },
      { word: '勉強', meaning: 'Học tập', category: 'education' },
      { word: '仕事', meaning: 'Công việc', category: 'work' },
      { word: '会社', meaning: 'Công ty', category: 'work' },
      { word: '電車', meaning: 'Tàu điện', category: 'transport' },
      { word: '車', meaning: 'Xe hơi', category: 'transport' },
      { word: '空港', meaning: 'Sân bay', category: 'transport' },
      { word: '病院', meaning: 'Bệnh viện', category: 'health' },
      { word: '医者', meaning: 'Bác sĩ', category: 'health' },
      { word: '薬', meaning: 'Thuốc', category: 'health' },
      { word: '映画', meaning: 'Phim', category: 'entertainment' },
      { word: '音楽', meaning: 'Âm nhạc', category: 'entertainment' },
      { word: '本', meaning: 'Sách', category: 'entertainment' },
      { word: '公園', meaning: 'Công viên', category: 'places' },
      { word: '図書館', meaning: 'Thư viện', category: 'places' },
      { word: '銀行', meaning: 'Ngân hàng', category: 'places' }
    ],
    hard: [
      { word: 'こんにちは', meaning: 'Xin chào', category: 'greetings' },
      { word: 'ありがとう', meaning: 'Cảm ơn', category: 'greetings' },
      { word: 'おはよう', meaning: 'Chào buổi sáng', category: 'greetings' },
      { word: 'さようなら', meaning: 'Tạm biệt', category: 'greetings' },
      { word: 'おやすみ', meaning: 'Chúc ngủ ngon', category: 'greetings' },
      { word: 'いただきます', meaning: 'Mời ăn', category: 'food' },
      { word: 'おいしい', meaning: 'Ngon', category: 'food' },
      { word: '水', meaning: 'Nước', category: 'drinks' },
      { word: 'お茶', meaning: 'Trà', category: 'drinks' },
      { word: '家族', meaning: 'Gia đình', category: 'family' },
      { word: '友達', meaning: 'Bạn bè', category: 'family' },
      { word: '学校', meaning: 'Trường học', category: 'education' },
      { word: '勉強', meaning: 'Học tập', category: 'education' },
      { word: '仕事', meaning: 'Công việc', category: 'work' },
      { word: '会社', meaning: 'Công ty', category: 'work' },
      { word: '電車', meaning: 'Tàu điện', category: 'transport' },
      { word: '車', meaning: 'Xe hơi', category: 'transport' },
      { word: '空港', meaning: 'Sân bay', category: 'transport' },
      { word: '病院', meaning: 'Bệnh viện', category: 'health' },
      { word: '医者', meaning: 'Bác sĩ', category: 'health' },
      { word: '薬', meaning: 'Thuốc', category: 'health' },
      { word: '映画', meaning: 'Phim', category: 'entertainment' },
      { word: '音楽', meaning: 'Âm nhạc', category: 'entertainment' },
      { word: '本', meaning: 'Sách', category: 'entertainment' },
      { word: '公園', meaning: 'Công viên', category: 'places' },
      { word: '図書館', meaning: 'Thư viện', category: 'places' },
      { word: '銀行', meaning: 'Ngân hàng', category: 'places' },
      { word: 'コンピューター', meaning: 'Máy tính', category: 'technology' },
      { word: 'インターネット', meaning: 'Internet', category: 'technology' },
      { word: 'スマートフォン', meaning: 'Điện thoại thông minh', category: 'technology' },
      { word: 'アプリケーション', meaning: 'Ứng dụng', category: 'technology' },
      { word: 'プログラミング', meaning: 'Lập trình', category: 'technology' },
      { word: 'データベース', meaning: 'Cơ sở dữ liệu', category: 'technology' },
      { word: 'アルゴリズム', meaning: 'Thuật toán', category: 'technology' },
      { word: 'セキュリティ', meaning: 'Bảo mật', category: 'technology' },
      { word: 'ネットワーク', meaning: 'Mạng', category: 'technology' },
      { word: 'サーバー', meaning: 'Máy chủ', category: 'technology' }
    ]
  };

  // Load best scores from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('speedTypingBestScore');
    const savedBestWpm = localStorage.getItem('speedTypingBestWpm');
    if (savedBestScore) setBestScore(parseInt(savedBestScore));
    if (savedBestWpm) setBestWpm(parseInt(savedBestWpm));
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

  // Calculate WPM
  useEffect(() => {
    if (gameStarted && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      const calculatedWpm = Math.round(totalTyped / 5 / timeElapsed); // 5 characters = 1 word
      setWpm(calculatedWpm || 0);
    }
  }, [totalTyped, startTime, gameStarted]);

  // Calculate accuracy
  useEffect(() => {
    if (totalTyped > 0) {
      const calculatedAccuracy = Math.round(((totalTyped - errors) / totalTyped) * 100);
      setAccuracy(calculatedAccuracy);
    }
  }, [totalTyped, errors]);

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
      case 'complete':
        oscillator.frequency.setValueAtTime(1500, audioContext.currentTime);
        break;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }, [soundEnabled]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const initializeGame = () => {
    const currentData = gameData[difficulty];
    const shuffledWords = shuffleArray(currentData);
    setWordList(shuffledWords);
    setCurrentWord(shuffledWords[0].word);
    setUserInput('');
    setScore(0);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(60);
    setGameStarted(false);
    setGameCompleted(false);
    setCurrentIndex(0);
    setStartTime(null);
    setTotalTyped(0);
    setErrors(0);
    setCorrectWords(0);
  };

  const calculateScore = (baseScore, currentWpm, currentAccuracy) => {
    const wpmBonus = Math.floor(currentWpm / 10) * 5;
    const accuracyBonus = Math.floor(currentAccuracy / 10) * 2;
    const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
    return Math.floor((baseScore + wpmBonus + accuracyBonus) * difficultyMultiplier);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    setTotalTyped(prev => prev + 1);

    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    // Check if word is completed
    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      if (typedWord === currentWord) {
        playSound('correct');
        setCorrectWords(prev => prev + 1);
        const scoreGain = calculateScore(10, wpm, accuracy);
        setScore(prev => prev + scoreGain);
        
        // Move to next word
        const nextIndex = currentIndex + 1;
        if (nextIndex < wordList.length) {
          setCurrentIndex(nextIndex);
          setCurrentWord(wordList[nextIndex].word);
          setUserInput('');
        } else {
          // Game completed
          playSound('complete');
          setGameCompleted(true);
        }
      } else {
        playSound('wrong');
        setErrors(prev => prev + 1);
        setUserInput('');
      }
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

  const getAccuracyColor = (acc) => {
    if (acc >= 90) return '#4ade80';
    if (acc >= 70) return '#fbbf24';
    return '#f87171';
  };

  const getWpmColor = (wpm) => {
    if (wpm >= 30) return '#4ade80';
    if (wpm >= 20) return '#fbbf24';
    return '#f87171';
  };

  if (showTutorial) {
    return (
      <div className="speed-typing tutorial">
        <div className="tutorial-content">
          <h1>⌨️ Hướng dẫn chơi Speed Typing</h1>
          <div className="tutorial-steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>Xem từ tiếng Nhật hiển thị trên màn hình</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Gõ từ đó chính xác vào ô nhập liệu</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Nhấn phím Space để hoàn thành từ</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <p>Hoàn thành càng nhiều từ càng tốt trong thời gian cho phép!</p>
            </div>
          </div>
          <div className="tutorial-tips">
            <h3>💡 Mẹo chơi:</h3>
            <ul>
              <li>Tập trung vào độ chính xác hơn là tốc độ</li>
              <li>Độ chính xác cao sẽ cho điểm thưởng</li>
              <li>Tốc độ gõ nhanh cũng được thưởng điểm</li>
              <li>Chuỗi đúng liên tiếp sẽ tăng điểm!</li>
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
    const stars = Math.floor(score / 100) + 1;
    
    // Update best scores
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('speedTypingBestScore', score.toString());
    }
    if (wpm > bestWpm) {
      setBestWpm(wpm);
      localStorage.setItem('speedTypingBestWpm', wpm.toString());
    }
    
    return (
      <div className="speed-typing">
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
          <h2>Bạn đã hoàn thành Speed Typing!</h2>
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
              <span className="stat-label">WPM:</span>
              <span className="stat-value" style={{ color: getWpmColor(wpm) }}>{wpm}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Độ chính xác:</span>
              <span className="stat-value" style={{ color: getAccuracyColor(accuracy) }}>{accuracy}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Từ đúng:</span>
              <span className="stat-value">{correctWords}</span>
            </div>
          </div>
          
          {(bestScore > 0 || bestWpm > 0) && (
            <div className="best-scores">
              <h3>🏆 Kỷ lục</h3>
              {bestScore > 0 && (
                <div className="best-score">
                  <span>Điểm cao nhất: {bestScore}</span>
                </div>
              )}
              {bestWpm > 0 && (
                <div className="best-wpm">
                  <span>WPM cao nhất: {bestWpm}</span>
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
    <div className="speed-typing">
      <div className="game-header">
        <button className="back-btn" onClick={() => navigate('/learn/games')}>
          <ArrowLeft size={20} />
          Quay lại
        </button>
        <h1>⌨️ Speed Typing</h1>
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
              <option value="easy">Dễ (15 từ)</option>
              <option value="medium">Trung bình (30 từ)</option>
              <option value="hard">Khó (45 từ)</option>
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
          <span className="stat-label">WPM:</span>
          <span className="stat-value" style={{ color: getWpmColor(wpm) }}>{wpm}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Độ chính xác:</span>
          <span className="stat-value" style={{ color: getAccuracyColor(accuracy) }}>{accuracy}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Thời gian:</span>
          <span className="stat-value time-left">{formatTime(timeLeft)}</span>
        </div>
        <div className="difficulty-indicator" style={{ backgroundColor: getDifficultyInfo().color }}>
          {getDifficultyInfo().name}
        </div>
      </div>

      <div className="game-area">
        <div className="word-display">
          <div className="current-word">{currentWord}</div>
          <div className="word-meaning">{wordList[currentIndex]?.meaning}</div>
          <div className="word-category">{wordList[currentIndex]?.category}</div>
        </div>

        <div className="progress-info">
          <div className="progress-text">
            Từ {currentIndex + 1} / {wordList.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex + 1) / wordList.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="input-area">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Bắt đầu gõ..."
            className="typing-input"
            autoFocus
            disabled={gameCompleted}
          />
          <div className="input-hint">
            Nhấn Space để hoàn thành từ
          </div>
        </div>

        <div className="performance-metrics">
          <div className="metric">
            <Clock size={20} />
            <span>WPM: {wpm}</span>
          </div>
          <div className="metric">
            <Target size={20} />
            <span>Độ chính xác: {accuracy}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedTyping; 