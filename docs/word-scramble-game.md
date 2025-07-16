# Word Scramble Game Documentation

## 🔤 Game Overview

Word Scramble is a word-unscrambling game that challenges players to rearrange Japanese characters to form correct words. The game focuses on character recognition, word formation, and vocabulary building.

## 🎯 Game Objectives

-  **Primary Goal**: Unscramble Japanese characters to form correct words
-  **Learning Focus**: Character recognition and word formation
-  **Skill Development**: Pattern recognition, vocabulary building, problem-solving

## 🎮 Game Mechanics

### Core Gameplay

1. **Word Display**: Japanese word is displayed with scrambled characters
2. **Meaning Hint**: Vietnamese meaning is shown to provide context
3. **Input**: Player types the correct word
4. **Validation**: System checks if the input matches the original word
5. **Progression**: Move to next word upon correct answer

### Game Flow

```javascript
// Game initialization
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

// Word scrambling algorithm
const scrambleWord = word => {
   const chars = word.split('');
   for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
   }
   return chars.join('');
};
```

## 📊 Difficulty Levels

### Easy Level

-  **Words**: 10 words
-  **Categories**: Greetings, Food, Drinks, Family
-  **Time Limit**: 60 seconds
-  **Focus**: Basic vocabulary building

### Medium Level

-  **Words**: 20 words
-  **Categories**: All basic categories + Education, Work, Transport
-  **Time Limit**: 60 seconds
-  **Focus**: Expanded vocabulary range

### Hard Level

-  **Words**: 30 words
-  **Categories**: All categories + Health, Entertainment, Places, Technology
-  **Time Limit**: 60 seconds
-  **Focus**: Comprehensive vocabulary mastery

## 🏆 Scoring System

### Base Scoring Formula

```javascript
const calculateScore = (baseScore, currentStreak, timeBonus = 0) => {
   const streakBonus = Math.floor(currentStreak / 3) * 5;
   const difficultyMultiplier =
      difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
   return Math.floor(
      (baseScore + streakBonus + timeBonus) * difficultyMultiplier
   );
};
```

### Score Components

1. **Base Score**: 10 points per correct word
2. **Streak Bonus**: +5 points for every 3 consecutive correct answers
3. **Time Bonus**: Additional points for fast completion
4. **Difficulty Multiplier**:
   -  Easy: 1x
   -  Medium: 1.5x
   -  Hard: 2x

### Performance Metrics

-  **Total Score**: Cumulative points earned
-  **Level**: Current word number
-  **Time Remaining**: Seconds left on timer
-  **Streak**: Longest consecutive correct answers

## 🎨 User Interface

### Game Layout

```
┌─────────────────────────────────────┐
│  ← Back  🔤 Word Scramble  ⚙️ Settings │
├─────────────────────────────────────┤
│  Score: 50  Level: 5  Time: 0:45    │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐ │
│  │          はちにんこ              │ │
│  │         Xin chào                │ │
│  │        greetings                │ │
│  └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│  [🔄 Xáo trộn]  [💡 Gợi ý]          │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐ │
│  │    Nhập từ tiếng Nhật...        │ │
│  └─────────────────────────────────┘ │
│  [✓ Kiểm tra]                       │
└─────────────────────────────────────┘
```

### Word Display

#### Scrambled Word

-  **Large Font**: 3rem for easy reading
-  **Glow Effect**: Animated text shadow
-  **Letter Spacing**: 3px for character separation

#### Meaning Display

-  **Medium Font**: 1.5rem for context
-  **Category Badge**: Small tag showing word category

## 🔊 Audio System

### Sound Events

```javascript
const playSound = type => {
   switch (type) {
      case 'correct': // 1200Hz - Correct answer
      case 'wrong': // 400Hz - Wrong answer
      case 'hint': // 800Hz - Hint usage
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
2. **Word Display**: Understanding scrambled words
3. **Input Process**: How to enter answers
4. **Tools**: Using shuffle and hint features

### Tutorial UI

```javascript
const tutorialContent = {
   title: '🔤 Hướng dẫn chơi Word Scramble',
   steps: [
      'Xem từ tiếng Nhật đã được xáo trộn',
      'Sắp xếp lại các ký tự thành từ đúng',
      'Nhập từ đúng vào ô trả lời',
      'Hoàn thành càng nhiều từ càng tốt trong thời gian cho phép!',
   ],
   tips: [
      "Sử dụng nút 'Xáo trộn' để xem từ ở góc độ khác",
      "Sử dụng 'Gợi ý' khi gặp khó khăn",
      'Chuỗi đúng liên tiếp sẽ cho điểm thưởng!',
   ],
};
```

## 🛠️ Game Tools

### Shuffle Button

```javascript
const handleShuffle = () => {
   if (currentWord) {
      setScrambledWord(scrambleWord(currentWord.word));
      playSound('hint');
   }
};
```

### Hint System

```javascript
const handleHint = () => {
   if (!hintUsed && currentWord) {
      setShowHint(true);
      setHintUsed(true);
      playSound('hint');
      setTimeout(() => setShowHint(false), 3000);
   }
};
```

### Hint Display

```javascript
const hintDisplay = {
   show: showHint,
   content: currentWord?.hint,
   duration: 3000,
   style: {
      background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
      animation: 'slideIn 0.3s ease',
   },
};
```

## 💾 Data Persistence

### Local Storage Keys

```javascript
// Best scores
localStorage.setItem('wordScrambleBestScore', score.toString());

// Load saved data
const savedBestScore = localStorage.getItem('wordScrambleBestScore');
```

### Saved Data

-  **Best Score**: Highest score achieved
-  **Settings**: Difficulty preference, sound settings

## 🎨 Animation System

### Word Animations

```scss
// Scrambled word glow effect
.scrambled-word {
   animation: scrambleGlow 2s ease-in-out infinite alternate;
}

@keyframes scrambleGlow {
   from {
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
   }
   to {
      text-shadow: 2px 2px 20px rgba(255, 215, 0, 0.5);
   }
}

// Hint display animation
.hint-display {
   animation: slideIn 0.3s ease;
}

@keyframes slideIn {
   from {
      opacity: 0;
      transform: translateX(-20px);
   }
   to {
      opacity: 1;
      transform: translateX(0);
   }
}
```

### UI Animations

-  **Slide Down**: Settings panel appearance
-  **Fade In Up**: Game elements entrance
-  **Pulse**: Active streak counter
-  **Bounce**: Trophy icon on completion
-  **Star Twinkle**: Rating stars animation

## 📱 Responsive Design

### Mobile Adaptations

```scss
@media (max-width: 768px) {
   .word-display {
      padding: 20px;

      .scrambled-word {
         font-size: 2rem;
         letter-spacing: 2px;
      }

      .word-meaning {
         font-size: 1.2rem;
      }
   }

   .game-controls {
      flex-direction: column;
      align-items: center;
   }

   .answer-form {
      flex-direction: column;
      align-items: center;

      .answer-input {
         min-width: 100%;
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
      words: 10,
      categories: ['greetings', 'food', 'drinks', 'family'],
      multiplier: 1,
   },
   medium: {
      words: 20,
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
      words: 30,
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
   subtitle: 'Bạn đã hoàn thành Word Scramble!',
   stats: [
      { label: 'Điểm số', value: score },
      { label: 'Cấp độ', value: level - 1 },
      { label: 'Chuỗi dài nhất', value: streak },
   ],
   stars: Math.floor(score / 50) + 1,
   actions: [
      { label: 'Chơi lại', action: initializeGame },
      { label: 'Thay đổi độ khó', action: showSettings },
   ],
};
```

### Achievement System

-  **1 Star**: 0-49 points
-  **2 Stars**: 50-99 points
-  **3 Stars**: 100-149 points
-  **4 Stars**: 150-199 points
-  **5 Stars**: 200+ points

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
describe('Word Scramble Game', () => {
   test('should scramble word correctly', () => {
      const original = 'こんにちは';
      const scrambled = scrambleWord(original);
      expect(scrambled).not.toBe(original);
      expect(scrambled.split('').sort()).toEqual(original.split('').sort());
   });

   test('should calculate score correctly', () => {
      // Test scoring logic
   });

   test('should handle hint system', () => {
      // Test hint functionality
   });
});
```

### Integration Tests

-  Game flow from start to completion
-  Settings persistence
-  Audio system integration
-  Local storage functionality
-  Hint system functionality

## 🔮 Future Enhancements

### Planned Features

1. **Multiplayer Mode**: Real-time competitive unscrambling
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
-  [Speed Typing Game](./speed-typing-game.md)
-  [Audio API Integration](./AUDIO_API_INTEGRATION.md)
