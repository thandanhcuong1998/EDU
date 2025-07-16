# Speed Typing Game Documentation

## ⌨️ Game Overview

Speed Typing is a typing speed and accuracy game that challenges players to type Japanese words quickly and correctly. The game focuses on typing proficiency, character input speed, and vocabulary recognition.

## 🎯 Game Objectives

-  **Primary Goal**: Type Japanese words quickly and accurately
-  **Learning Focus**: Typing speed and character input proficiency
-  **Skill Development**: Keyboard familiarity, typing accuracy, vocabulary recognition

## 🎮 Game Mechanics

### Core Gameplay

1. **Word Display**: Japanese word is displayed prominently on screen
2. **Meaning Context**: Vietnamese meaning and category are shown
3. **Input**: Player types the word in the input field
4. **Validation**: System checks accuracy and speed
5. **Progression**: Move to next word upon correct input

### Game Flow

```javascript
// Game initialization
const initializeGame = () => {
   const currentData = gameData[difficulty];
   const shuffledWords = shuffleArray(currentData);
   setWordList(shuffledWords);
   setCurrentWord(shuffledWords[0].word);
   setUserInput('');
   setScore(0);
   setLevel(1);
   setTimeLeft(60);
   setGameStarted(false);
   setGameCompleted(false);
   setCurrentIndex(0);
   setStartTime(null);
   setTotalTyped(0);
   setErrors(0);
   setCorrectWords(0);
};

// Input handling
const handleInputChange = e => {
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
         // Correct word
         handleCorrectWord();
      } else {
         // Wrong word
         handleWrongWord();
      }
   }
};
```

## 📊 Difficulty Levels

### Easy Level

-  **Words**: 15 words
-  **Categories**: Greetings, Food, Drinks, Family
-  **Time Limit**: 60 seconds
-  **Focus**: Basic typing practice

### Medium Level

-  **Words**: 30 words
-  **Categories**: All basic categories + Education, Work, Transport
-  **Time Limit**: 60 seconds
-  **Focus**: Intermediate typing speed

### Hard Level

-  **Words**: 45 words
-  **Categories**: All categories + Health, Entertainment, Places, Technology
-  **Time Limit**: 60 seconds
-  **Focus**: Advanced typing proficiency

## 🏆 Scoring System

### Base Scoring Formula

```javascript
const calculateScore = (baseScore, currentWpm, currentAccuracy) => {
   const wpmBonus = Math.floor(currentWpm / 10) * 5;
   const accuracyBonus = Math.floor(currentAccuracy / 10) * 2;
   const difficultyMultiplier =
      difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
   return Math.floor(
      (baseScore + wpmBonus + accuracyBonus) * difficultyMultiplier
   );
};
```

### Score Components

1. **Base Score**: 10 points per correct word
2. **WPM Bonus**: +5 points for every 10 WPM
3. **Accuracy Bonus**: +2 points for every 10% accuracy
4. **Difficulty Multiplier**:
   -  Easy: 1x
   -  Medium: 1.5x
   -  Hard: 2x

### Performance Metrics

-  **WPM (Words Per Minute)**: Typing speed measurement
-  **Accuracy**: Percentage of correct inputs
-  **Total Score**: Cumulative points earned
-  **Correct Words**: Number of successfully typed words

## 🎨 User Interface

### Game Layout

```
┌─────────────────────────────────────┐
│  ← Back  ⌨️ Speed Typing  ⚙️ Settings │
├─────────────────────────────────────┤
│  Score: 50  WPM: 25  Accuracy: 95%  │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐ │
│  │          こんにちは              │ │
│  │         Xin chào                │ │
│  │        greetings                │ │
│  └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│  Tiến độ: 5 / 15 từ                 │
│  ████████████████░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐ │
│  │    Bắt đầu gõ...                │ │
│  └─────────────────────────────────┘ │
│  Nhấn Space để hoàn thành từ         │
├─────────────────────────────────────┤
│  ⏱️ WPM: 25  🎯 Độ chính xác: 95%   │
└─────────────────────────────────────┘
```

### Word Display

#### Current Word

-  **Large Font**: 4rem for easy reading
-  **Glow Effect**: Animated text shadow
-  **Letter Spacing**: 2px for character separation

#### Context Information

-  **Meaning**: Vietnamese translation
-  **Category**: Word category badge
-  **Progress**: Current word number and total

## 🔊 Audio System

### Sound Events

```javascript
const playSound = type => {
   switch (type) {
      case 'correct': // 1200Hz - Correct word
      case 'wrong': // 400Hz - Wrong word
      case 'complete': // 1500Hz - Game completion
   }
};
```

### Audio Controls

-  **Toggle Sound**: Enable/disable all audio
-  **Individual Sounds**: Different feedback for different events
-  **Volume Control**: Adjustable through Web Audio API

## 🎯 Tutorial System

### Tutorial Steps

1. **Introduction**: Welcome and game objective
2. **Word Display**: Understanding the word to type
3. **Input Process**: How to type and submit words
4. **Performance**: Understanding WPM and accuracy

### Tutorial UI

```javascript
const tutorialContent = {
   title: '⌨️ Hướng dẫn chơi Speed Typing',
   steps: [
      'Xem từ tiếng Nhật hiển thị trên màn hình',
      'Gõ từ đó chính xác vào ô nhập liệu',
      'Nhấn phím Space để hoàn thành từ',
      'Hoàn thành càng nhiều từ càng tốt trong thời gian cho phép!',
   ],
   tips: [
      'Tập trung vào độ chính xác hơn là tốc độ',
      'Độ chính xác cao sẽ cho điểm thưởng',
      'Tốc độ gõ nhanh cũng được thưởng điểm',
      'Chuỗi đúng liên tiếp sẽ tăng điểm!',
   ],
};
```

## 📊 Performance Tracking

### WPM Calculation

```javascript
// Calculate WPM
useEffect(() => {
   if (gameStarted && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      const calculatedWpm = Math.round(totalTyped / 5 / timeElapsed); // 5 characters = 1 word
      setWpm(calculatedWpm || 0);
   }
}, [totalTyped, startTime, gameStarted]);
```

### Accuracy Calculation

```javascript
// Calculate accuracy
useEffect(() => {
   if (totalTyped > 0) {
      const calculatedAccuracy = Math.round(
         ((totalTyped - errors) / totalTyped) * 100
      );
      setAccuracy(calculatedAccuracy);
   }
}, [totalTyped, errors]);
```

### Progress Tracking

```javascript
const progressInfo = {
   currentWord: currentIndex + 1,
   totalWords: wordList.length,
   progressPercentage: ((currentIndex + 1) / wordList.length) * 100,
   timeRemaining: timeLeft,
};
```

## 💾 Data Persistence

### Local Storage Keys

```javascript
// Best scores
localStorage.setItem('speedTypingBestScore', score.toString());
localStorage.setItem('speedTypingBestWpm', wpm.toString());

// Load saved data
const savedBestScore = localStorage.getItem('speedTypingBestScore');
const savedBestWpm = localStorage.getItem('speedTypingBestWpm');
```

### Saved Data

-  **Best Score**: Highest score achieved
-  **Best WPM**: Highest words per minute achieved
-  **Settings**: Difficulty preference, sound settings

## 🎨 Animation System

### Word Animations

```scss
// Word glow effect
.current-word {
   animation: wordGlow 2s ease-in-out infinite alternate;
}

@keyframes wordGlow {
   from {
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
   }
   to {
      text-shadow: 2px 2px 20px rgba(255, 215, 0, 0.5);
   }
}

// Progress bar animation
.progress-fill {
   transition: width 0.3s ease;
   box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
}
```

### UI Animations

-  **Slide Down**: Settings panel appearance
-  **Fade In Up**: Game elements entrance
-  **Pulse**: Active performance metrics
-  **Bounce**: Trophy icon on completion
-  **Star Twinkle**: Rating stars animation

## 📱 Responsive Design

### Mobile Adaptations

```scss
@media (max-width: 768px) {
   .word-display {
      padding: 25px;

      .current-word {
         font-size: 2.5rem;
         letter-spacing: 1px;
      }

      .word-meaning {
         font-size: 1.4rem;
      }
   }

   .input-area {
      .typing-input {
         padding: 15px 20px;
         font-size: 1.1rem;
      }
   }

   .performance-metrics {
      flex-direction: column;
      align-items: center;
      gap: 15px;

      .metric {
         width: 100%;
         justify-content: center;
      }
   }
}
```

### Touch Interactions

-  **Touch-friendly**: Larger touch targets
-  **Swipe Support**: Gesture-based navigation
-  **Optimized Layout**: Stacked elements on small screens

## 🔧 Configuration Options

### Game Settings

```javascript
const gameSettings = {
   difficulty: 'easy' | 'medium' | 'hard',
   soundEnabled: boolean,
   showTutorial: boolean,
   timeLimit: 60,
};
```

### Difficulty Configuration

```javascript
const difficultyConfig = {
   easy: {
      words: 15,
      categories: ['greetings', 'food', 'drinks', 'family'],
      multiplier: 1,
   },
   medium: {
      words: 30,
      categories: [
         'greetings',
         'food',
         'drinks',
         'family',
         'education',
         'work',
         'transport',
      ],
      multiplier: 1.5,
   },
   hard: {
      words: 45,
      categories: [
         'greetings',
         'food',
         'drinks',
         'family',
         'education',
         'work',
         'transport',
         'health',
         'entertainment',
         'places',
         'technology',
      ],
      multiplier: 2,
   },
};
```

## 🎯 Completion Screen

### Results Display

```javascript
const completionScreen = {
   trophy: '🏆',
   title: '🎉 Hoàn thành!',
   subtitle: 'Bạn đã hoàn thành Speed Typing!',
   stats: [
      { label: 'Điểm số', value: score },
      { label: 'WPM', value: wpm },
      { label: 'Độ chính xác', value: `${accuracy}%` },
      { label: 'Từ đúng', value: correctWords },
   ],
   stars: Math.floor(score / 100) + 1,
   actions: [
      { label: 'Chơi lại', action: initializeGame },
      { label: 'Thay đổi độ khó', action: showSettings },
   ],
};
```

### Achievement System

-  **1 Star**: 0-99 points
-  **2 Stars**: 100-199 points
-  **3 Stars**: 200-299 points
-  **4 Stars**: 300-399 points
-  **5 Stars**: 400+ points

## 🚀 Performance Optimization

### Memory Management

```javascript
// Cleanup on unmount
useEffect(() => {
   return () => {
      clearInterval(timerInterval);
      // Dispose audio contexts
   };
}, []);
```

### Rendering Optimization

-  **React.memo**: Prevent unnecessary re-renders
-  **useCallback**: Memoize event handlers
-  **useMemo**: Cache expensive calculations

## 🧪 Testing Strategy

### Unit Tests

```javascript
describe('Speed Typing Game', () => {
   test('should calculate WPM correctly', () => {
      const totalTyped = 100;
      const timeElapsed = 2; // minutes
      const wpm = Math.round(totalTyped / 5 / timeElapsed);
      expect(wpm).toBe(10);
   });

   test('should calculate accuracy correctly', () => {
      const totalTyped = 100;
      const errors = 5;
      const accuracy = Math.round(((totalTyped - errors) / totalTyped) * 100);
      expect(accuracy).toBe(95);
   });

   test('should handle word completion', () => {
      // Test word completion logic
   });
});
```

### Integration Tests

-  Game flow from start to completion
-  Settings persistence
-  Audio system integration
-  Local storage functionality
-  Performance tracking accuracy

## 🔮 Future Enhancements

### Planned Features

1. **Multiplayer Mode**: Real-time competitive typing
2. **Custom Word Lists**: User-generated vocabulary
3. **Progressive Difficulty**: Adaptive difficulty based on performance
4. **Achievement System**: Badges for milestones
5. **Social Features**: Share scores and challenge friends

### Technical Improvements

1. **Offline Support**: Service worker for offline play
2. **Voice Integration**: Audio pronunciation of words
3. **Analytics**: Detailed performance tracking
4. **AI Integration**: Personalized learning paths

## 📚 Related Documentation

-  [Mini-Games Overview](./mini-games-overview.md)
-  [Memory Match Game](./memory-match-game.md)
-  [Word Scramble Game](./word-scramble-game.md)
-  [Audio API Integration](./AUDIO_API_INTEGRATION.md)
