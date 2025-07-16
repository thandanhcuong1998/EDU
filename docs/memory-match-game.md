# Memory Match Game Documentation

## 🧠 Game Overview

Memory Match is a card-matching game designed to help users learn Japanese vocabulary by matching Japanese words with their Vietnamese meanings. The game focuses on memory training and vocabulary recognition.

## 🎯 Game Objectives

-  **Primary Goal**: Match all pairs of Japanese words with their Vietnamese meanings
-  **Learning Focus**: Vocabulary recognition and memory retention
-  **Skill Development**: Pattern recognition, visual memory, language association

## 🎮 Game Mechanics

### Core Gameplay

1. **Card Layout**: Cards are arranged in a grid, face down
2. **Card Types**: Two types of cards - Japanese words and Vietnamese meanings
3. **Matching**: Players flip cards to find matching pairs
4. **Scoring**: Points awarded for successful matches and streaks

### Game Flow

```javascript
// Game initialization
const initializeGame = () => {
   // Create pairs of cards (word and meaning)
   const cardPairs = [];
   gameData.forEach((item, index) => {
      // Word card
      cardPairs.push({
         id: `word_${index}`,
         type: 'word',
         content: item.word,
         meaning: item.meaning,
         emoji: item.emoji,
         category: item.category,
         pairId: index,
         matched: false,
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
         matched: false,
      });
   });

   // Shuffle and set cards
   const shuffledCards = shuffleArray(cardPairs);
   setCards(shuffledCards);
};
```

## 📊 Difficulty Levels

### Easy Level

-  **Pairs**: 6 pairs (12 cards total)
-  **Categories**: Greetings, Food, Drinks, Family
-  **Time Pressure**: None
-  **Focus**: Learning basic vocabulary

### Medium Level

-  **Pairs**: 10 pairs (20 cards total)
-  **Categories**: All basic categories + Education, Work, Transport
-  **Time Pressure**: None
-  **Focus**: Expanding vocabulary range

### Hard Level

-  **Pairs**: 15 pairs (30 cards total)
-  **Categories**: All categories + Health, Entertainment, Places, Technology
-  **Time Pressure**: None
-  **Focus**: Comprehensive vocabulary mastery

## 🏆 Scoring System

### Base Scoring Formula

```javascript
const calculateScore = (baseScore, currentStreak) => {
   const streakBonus = Math.floor(currentStreak / 3) * 5;
   const timeBonus = Math.max(0, 10 - Math.floor(timer / 30));
   return baseScore + streakBonus + timeBonus;
};
```

### Score Components

1. **Base Score**: 10 points per successful match
2. **Streak Bonus**: +5 points for every 3 consecutive matches
3. **Time Bonus**: Up to 10 points for quick completion
4. **Difficulty Multiplier**: Applied based on selected difficulty

### Performance Metrics

-  **Total Score**: Cumulative points earned
-  **Moves**: Number of card flips made
-  **Time**: Total time taken to complete
-  **Streak**: Longest consecutive match sequence

## 🎨 User Interface

### Game Layout

```
┌─────────────────────────────────────┐
│  ← Back  🧠 Memory Match  ⚙️ Settings │
├─────────────────────────────────────┤
│  Score: 50  Moves: 12  Time: 2:30   │
├─────────────────────────────────────┤
│  Ghép các cặp từ tiếng Nhật với     │
│  nghĩa tương ứng!                   │
├─────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ ❓  │ │ ❓  │ │ ❓  │ │ ❓  │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ ❓  │ │ ❓  │ │ ❓  │ │ ❓  │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
└─────────────────────────────────────┘
```

### Card Design

#### Front Side (Hidden)

-  Question mark symbol (❓)
-  Gradient background
-  Hover effects

#### Back Side (Revealed)

**Word Cards:**

```
┌─────────────────┐
│       👋        │
│   こんにちは     │
│   greetings     │
└─────────────────┘
```

**Meaning Cards:**

```
┌─────────────────┐
│    Xin chào     │
│   greetings     │
└─────────────────┘
```

## 🔊 Audio System

### Sound Events

```javascript
const playSound = type => {
   switch (type) {
      case 'flip': // 800Hz - Card flip
      case 'match': // 1200Hz - Successful match
      case 'wrong': // 400Hz - Wrong match
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
2. **Card Interaction**: How to flip cards
3. **Matching Process**: How to find pairs
4. **Scoring**: Understanding points and bonuses

### Tutorial UI

```javascript
const tutorialContent = {
   title: '🎮 Hướng dẫn chơi Memory Match',
   steps: [
      'Nhấp vào các thẻ để lật chúng',
      'Ghép từ tiếng Nhật với nghĩa tương ứng',
      'Hoàn thành tất cả cặp để thắng',
      'Chuỗi đúng liên tiếp sẽ cho điểm thưởng!',
   ],
};
```

## 💾 Data Persistence

### Local Storage Keys

```javascript
// Best scores
localStorage.setItem('memoryMatchBestScore', score.toString());
localStorage.setItem('memoryMatchBestTime', time.toString());

// Load saved data
const savedBestScore = localStorage.getItem('memoryMatchBestScore');
const savedBestTime = localStorage.getItem('memoryMatchBestTime');
```

### Saved Data

-  **Best Score**: Highest score achieved
-  **Best Time**: Fastest completion time
-  **Settings**: Difficulty preference, sound settings

## 🎨 Animation System

### Card Animations

```scss
// Card flip animation
.card-inner {
   transition: transform 0.6s;
   transform-style: preserve-3d;
}

.card.flipped .card-inner {
   transform: rotateY(180deg);
}

// Match animation
.card.matched {
   animation: matchedPulse 0.5s ease;
}

@keyframes matchedPulse {
   0% {
      transform: scale(1);
   }
   50% {
      transform: scale(1.05);
   }
   100% {
      transform: scale(1);
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
   .cards-grid {
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 8px;
   }

   .card {
      aspect-ratio: 3/4;
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
   autoStart: boolean,
};
```

### Difficulty Configuration

```javascript
const difficultyConfig = {
   easy: {
      pairs: 6,
      categories: ['greetings', 'food', 'drinks', 'family'],
      multiplier: 1,
   },
   medium: {
      pairs: 10,
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
      pairs: 15,
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
   title: '🎉 Chúc mừng!',
   subtitle: 'Bạn đã hoàn thành Memory Match!',
   stats: [
      { label: 'Điểm số', value: score },
      { label: 'Số lượt', value: moves },
      { label: 'Thời gian', value: formatTime(timer) },
      { label: 'Chuỗi dài nhất', value: streak },
   ],
   stars: Math.floor(score / 20) + 1,
   actions: [
      { label: 'Chơi lại', action: initializeGame },
      { label: 'Thay đổi độ khó', action: showSettings },
   ],
};
```

### Achievement System

-  **1 Star**: 0-19 points
-  **2 Stars**: 20-39 points
-  **3 Stars**: 40-59 points
-  **4 Stars**: 60-79 points
-  **5 Stars**: 80+ points

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
describe('Memory Match Game', () => {
   test('should initialize game with correct number of cards', () => {
      // Test initialization
   });

   test('should calculate score correctly', () => {
      // Test scoring logic
   });

   test('should detect game completion', () => {
      // Test completion logic
   });
});
```

### Integration Tests

-  Game flow from start to completion
-  Settings persistence
-  Audio system integration
-  Local storage functionality

## 🔮 Future Enhancements

### Planned Features

1. **Multiplayer Mode**: Real-time competitive matching
2. **Custom Card Sets**: User-generated vocabulary
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
-  [Word Scramble Game](./word-scramble-game.md)
-  [Speed Typing Game](./speed-typing-game.md)
-  [Audio API Integration](./AUDIO_API_INTEGRATION.md)
