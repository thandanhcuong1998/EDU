# Mini-Games System Overview

## 🎮 Introduction

The Japanese-EDU project now includes a comprehensive mini-games system designed to enhance language learning through interactive gameplay. The system consists of three fully-featured games, each targeting different aspects of Japanese language acquisition.

## 🎯 System Architecture

### Core Components

```
src/features/mini-games/
├── components/
│   ├── GameCenter.jsx          # Main game hub
│   ├── MemoryMatch.jsx         # Memory matching game
│   ├── WordScramble.jsx        # Word unscrambling game
│   ├── SpeedTyping.jsx         # Typing speed game
│   ├── GameCenter.scss         # Game center styles
│   ├── MemoryMatch.scss        # Memory match styles
│   ├── WordScramble.scss       # Word scramble styles
│   └── SpeedTyping.scss        # Speed typing styles
```

### Routing Structure

```javascript
// Main game routes
/learn/games                    # Game Center (hub)
/learn/games/memory-match       # Memory Match game
/learn/games/word-scramble      # Word Scramble game
/learn/games/speed-typing       # Speed Typing game
```

## 🎲 Game Overview

### 1. Memory Match Game

-  **Objective**: Match Japanese words with their Vietnamese meanings
-  **Skills**: Vocabulary recognition, memory training
-  **Difficulty Levels**: Easy (6 pairs), Medium (10 pairs), Hard (15 pairs)
-  **Time Limit**: No time limit, focus on accuracy and moves

### 2. Word Scramble Game

-  **Objective**: Unscramble Japanese characters to form correct words
-  **Skills**: Character recognition, word formation
-  **Difficulty Levels**: Easy (10 words), Medium (20 words), Hard (30 words)
-  **Time Limit**: 60 seconds

### 3. Speed Typing Game

-  **Objective**: Type Japanese words quickly and accurately
-  **Skills**: Typing speed, character input
-  **Difficulty Levels**: Easy (15 words), Medium (30 words), Hard (45 words)
-  **Time Limit**: 60 seconds

## 📊 Game Data Structure

### Vocabulary Database

Each game uses a structured vocabulary database with the following format:

```javascript
const gameData = {
  easy: [
    {
      word: 'こんにちは',
      meaning: 'Xin chào',
      category: 'greetings',
      hint: 'Lời chào thân thiện' // For Word Scramble
    }
  ],
  medium: [...],
  hard: [...]
}
```

### Categories Covered

1. **Greetings** (chào hỏi)
2. **Food** (ăn uống)
3. **Drinks** (đồ uống)
4. **Family** (gia đình)
5. **Education** (giáo dục)
6. **Work** (công việc)
7. **Transport** (giao thông)
8. **Health** (sức khỏe)
9. **Entertainment** (giải trí)
10.   **Places** (địa điểm)
11.   **Technology** (công nghệ) - Hard level only

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

1. **Base Score**: 10 points per correct answer
2. **Streak Bonus**: +5 points for every 3 consecutive correct answers
3. **Time Bonus**: Additional points for fast completion
4. **Difficulty Multiplier**:
   -  Easy: 1x
   -  Medium: 1.5x
   -  Hard: 2x

### Performance Metrics

-  **WPM (Words Per Minute)**: For Speed Typing
-  **Accuracy**: Percentage of correct inputs
-  **Completion Time**: Time taken to finish
-  **Streak**: Longest consecutive correct answers

## 🔊 Audio System

### Sound Effects

All games include audio feedback using Web Audio API:

```javascript
const playSound = (type) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  // Different frequencies for different events
  switch (type) {
    case 'correct': 1200Hz
    case 'wrong': 400Hz
    case 'hint': 800Hz
    case 'complete': 1500Hz
  }
};
```

### Audio Controls

-  Toggle sound on/off
-  Individual sound effects for different game events
-  Volume control through gain nodes

## 🎨 UI/UX Features

### Design System

-  **Glass Morphism**: Modern backdrop blur effects
-  **Gradient Backgrounds**: Dynamic color schemes
-  **Responsive Design**: Mobile-first approach
-  **Smooth Animations**: CSS transitions and keyframes

### Common UI Elements

1. **Game Header**: Navigation, settings, sound controls
2. **Stats Panel**: Real-time game statistics
3. **Settings Panel**: Difficulty and audio settings
4. **Tutorial System**: Step-by-step instructions
5. **Completion Screen**: Results and achievements

### Animation System

```scss
// Common animations
@keyframes slideDown {
   /* Settings panel */
}
@keyframes fadeInUp {
   /* Game elements */
}
@keyframes pulse {
   /* Active elements */
}
@keyframes bounce {
   /* Trophy icon */
}
@keyframes starTwinkle {
   /* Rating stars */
}
```

## 💾 Data Persistence

### Local Storage

Games save personal bests using localStorage:

```javascript
// Save best scores
localStorage.setItem('memoryMatchBestScore', score.toString());
localStorage.setItem('memoryMatchBestTime', time.toString());

// Load best scores
const savedBestScore = localStorage.getItem('memoryMatchBestScore');
```

### Saved Data Types

-  **Best Score**: Highest score achieved
-  **Best Time**: Fastest completion time
-  **Best WPM**: Highest words per minute (Speed Typing)

## 🎯 Game Center Features

### Main Hub

The Game Center serves as the central hub for all games:

-  **Game Cards**: Visual representation of each game
-  **Statistics**: Overall gaming statistics
-  **Tournament System**: Future competitive features
-  **Leaderboard**: Future social features

### Navigation

```javascript
const handleGameSelect = gameId => {
   switch (gameId) {
      case 'memory_match':
         navigate('/learn/games/memory-match');
      case 'word_scramble':
         navigate('/learn/games/word-scramble');
      case 'speed_typing':
         navigate('/learn/games/speed-typing');
   }
};
```

## 🔧 Configuration System

### Difficulty Settings

Each game supports three difficulty levels with different characteristics:

| Difficulty | Words/Pairs | Time Limit | Multiplier |
| ---------- | ----------- | ---------- | ---------- |
| Easy       | 6-15        | 60s/None   | 1x         |
| Medium     | 10-30       | 60s        | 1.5x       |
| Hard       | 15-45       | 60s        | 2x         |

### Settings Panel

```javascript
const settingsPanel = {
   difficulty: ['easy', 'medium', 'hard'],
   soundEnabled: boolean,
   showTutorial: boolean,
};
```

## 🚀 Performance Optimization

### Code Splitting

Games are loaded dynamically to reduce initial bundle size:

```javascript
// Lazy loading for games
const MemoryMatch = lazy(() => import('./MemoryMatch'));
const WordScramble = lazy(() => import('./WordScramble'));
const SpeedTyping = lazy(() => import('./SpeedTyping'));
```

### Memory Management

-  Cleanup timers and intervals
-  Dispose audio contexts properly
-  Clear local state on unmount

## 🔮 Future Enhancements

### Planned Features

1. **Multiplayer Mode**: Real-time competitive gameplay
2. **Tournament System**: Scheduled competitions
3. **Achievement System**: Badges and milestones
4. **Social Features**: Friend challenges and leaderboards
5. **Custom Word Lists**: User-generated content
6. **Analytics Dashboard**: Detailed performance tracking

### Technical Improvements

1. **Offline Support**: Service worker for offline gameplay
2. **Progressive Web App**: Installable game experience
3. **Voice Recognition**: Speech input for pronunciation
4. **AI Integration**: Adaptive difficulty based on performance

## 📱 Mobile Optimization

### Responsive Design

-  Touch-friendly controls
-  Optimized layouts for small screens
-  Gesture support for mobile interactions
-  Reduced animation complexity on low-end devices

### Performance Considerations

-  Reduced particle effects on mobile
-  Simplified audio processing
-  Optimized image assets
-  Efficient state management

## 🧪 Testing Strategy

### Unit Tests

-  Game logic functions
-  Scoring calculations
-  Audio system
-  Data persistence

### Integration Tests

-  Game flow completion
-  Settings persistence
-  Navigation between games
-  Cross-browser compatibility

### User Testing

-  Usability testing with target audience
-  Performance testing on various devices
-  Accessibility testing for inclusive design

## 📚 Related Documentation

-  [Memory Match Game](./memory-match-game.md)
-  [Word Scramble Game](./word-scramble-game.md)
-  [Speed Typing Game](./speed-typing-game.md)
-  [Audio API Integration](./AUDIO_API_INTEGRATION.md)
-  [Environment Setup](./ENVIRONMENT_SETUP.md)
