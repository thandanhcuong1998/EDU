# Business Logic Documentation

This document outlines the core business logic of the Japanese-EDU application, covering user progression, learning mechanics, gamification features, and the comprehensive mini-games system.

## 1. User Onboarding and Personalization

The user's journey begins with a data-driven onboarding flow designed to personalize their learning path.

### Welcome Flow

-  **Data-Driven Steps**: The sequence of onboarding steps (e.g., proficiency assessment, daily goal setting) is defined in `src/features/welcome/welcomeFlow.js`. This allows for easy modification and extension of the flow.
-  **Navigation Logic**: The `useWelcomeNavigation` hook manages the transitions between steps, ensuring a smooth user experience.
-  **State Management**: User selections are stored in the `welcome` slice of the Redux store (`welcomeSlice.js`).

### Personalized Learning Path

-  **Proficiency-Based Start**: Upon completing the welcome flow, the `initializeUserProgress` action is dispatched. This action analyzes the user's self-assessed proficiency to determine their `startingLevel` (e.g., N5, N4).
-  **Unlocking Content**: Based on the `startingLevel`, the system automatically unlocks all relevant topics up to that level in the `userProgress` Redux slice. For example, a user starting at N4 will have all N5 and N4 topics unlocked.
-  **Dynamic Path Rendering**: The `MainLearn.jsx` component reads the user's `startingLevel` and `unlockedTopics` from the Redux store to dynamically render only the relevant JLPT levels and topics, creating a personalized learning path for the user.

## 2. Learning and Lesson Progression

The core learning experience is structured around a clear progression system, moving users from one level to the next.

### Lesson Structure

-  **Hierarchical Data**: All lesson content is stored in `ListQuestionFakeDataLession.jsx`, organized by JLPT Level -> Topic -> Lesson Type (e.g., `theory`, `level1`).
-  **Dynamic Loading**: The `Lession.jsx` component uses URL parameters (`level`, `topic`, `type`) to dynamically load the correct lesson content from the data structure.

### Level Progression Logic

-  **`getNextLevel` Function**: The core progression logic resides in the `useLessionHook.js`. The `getNextLevel` function determines the next lesson, topic, or JLPT level based on the current position in the data structure.
-  **Automatic Advancement**: When a user successfully completes a lesson (progress bar reaches 100%), the `handleButtonClick` function calls `getNextLevel` and navigates the user to the next appropriate lesson.
-  **Review Integration**: For levels higher than `level1`, the `createCombinedQuestions` function in the hook automatically pulls a random subset of questions from the previous level to serve as a review, reinforcing previously learned concepts.

## 3. Question Mechanics and Answer Checking

The application supports various question types, each with its own interaction logic.

-  **Question Component**: `Question.jsx` acts as a central dispatcher, rendering the appropriate question component (`Radio`, `CardWord`, `FillInBlank`, `MappingWord`) based on the `type` field in the question data.
-  **Answer Checking**:
   -  The `answerCheckers.js` library contains pure functions (`checkRadioAnswer`, `checkCardWordAnswer`) to validate user answers against the correct answers defined in the question data.
   -  The `lessonSlice.js` in Redux manages the state of the current question, including the user's answer, whether it is correct (`isCorrect`), and the overall lesson progress (`progressBar`).
-  **Handling Incorrect Answers**: When an answer is incorrect, it is added to the `listQuestionFail`. The user must revisit and correctly answer these questions before the lesson is considered complete.

## 4. Mini-Games System

The application includes a comprehensive mini-games system designed to enhance learning through interactive gameplay.

### Game Center Architecture

-  **Central Hub**: The `GameCenter.jsx` component serves as the main entry point for all games, providing navigation and overview of available games.
-  **Routing System**: Games are accessible via dedicated routes (`/learn/games/memory-match`, `/learn/games/word-scramble`, `/learn/games/speed-typing`).
-  **State Management**: Each game maintains its own local state while sharing common settings and preferences.

### Memory Match Game

-  **Core Mechanics**: Players match Japanese words with their Vietnamese meanings through card flipping.
-  **Scoring System**: Base score (10 points) + streak bonus (5 points per 3 consecutive matches) + time bonus.
-  **Difficulty Levels**: Easy (6 pairs), Medium (10 pairs), Hard (15 pairs).
-  **Data Structure**: Uses the same vocabulary database as other games, formatted for card pairs.

### Word Scramble Game

-  **Core Mechanics**: Players unscramble Japanese characters to form correct words.
-  **Tools**: Shuffle button for new arrangements, hint system for assistance.
-  **Scoring System**: Base score (10 points) + streak bonus + time bonus + difficulty multiplier.
-  **Difficulty Levels**: Easy (10 words), Medium (20 words), Hard (30 words).

### Speed Typing Game

-  **Core Mechanics**: Players type Japanese words quickly and accurately.
-  **Performance Tracking**: Real-time WPM (Words Per Minute) and accuracy calculation.
-  **Scoring System**: Base score + WPM bonus + accuracy bonus + difficulty multiplier.
-  **Difficulty Levels**: Easy (15 words), Medium (30 words), Hard (45 words).

### Common Game Features

-  **Audio System**: Web Audio API integration with different sound frequencies for various events.
-  **Tutorial System**: Step-by-step instructions for each game.
-  **Data Persistence**: Local storage for best scores and settings.
-  **Responsive Design**: Mobile-optimized layouts and touch interactions.
-  **Animation System**: CSS animations and transitions for enhanced UX.

## 5. Gamification and User Engagement

To keep users motivated, the application incorporates several gamification elements.

### Experience Points (XP) and Levels

-  **XP Calculation**: After each lesson, the `useLessionHook.js` calculates the XP earned based on performance (time spent, incorrect attempts).
-  **State Management**: The `addExperience` action in `UserProgressReducer.jsx` updates the user's total XP. The user's level is derived from their total XP.

### Daily Streaks

-  **Tracking**: The `updateDailyProgress` action is dispatched when a user starts a lesson. It checks the `lastDailyGoalCompletionDate` to determine if the user's streak should be incremented or reset.
-  **State**: The `currentStreak` is managed in the `userProgress` Redux slice.

### Achievements

-  **Achievement Triggers**: The `achievementsData.jsx` file defines all available achievements and their trigger conditions (e.g., `progress.experience >= 500`).
-  **Service-Based Checking**: The `achievementService.js` is called at key moments (e.g., after a lesson). It checks the user's progress against the trigger conditions for all achievements and dispatches the `unlockAchievement` action if a new achievement is earned.

### Game-Based Achievements

-  **Mini-Game Achievements**: New achievements are unlocked based on mini-game performance (e.g., "Memory Master" for completing Memory Match with 5 stars).
-  **Cross-Game Integration**: Achievements can be triggered by performance across multiple games.
-  **Progressive Challenges**: Difficulty-based achievements encourage users to improve their skills.

## 6. Spaced Repetition System (SRS) for Review

The application includes an SRS to help users retain knowledge effectively.

-  **Algorithm**: `srsService.js` implements a simplified SM-2 algorithm. The `calculateSrsItem` function takes a question and whether the user answered it correctly.
-  **Scheduling**: Based on the user's performance, the service calculates the next optimal review date (`nextReviewDate`) for that specific question.
-  **State**: The SRS data for each question is stored in the `srsItems` array within the `userProgress` Redux slice. The `/review` page will use this data to show users which items are due for review.

## 7. Data Management and Persistence

### Vocabulary Database

-  **Centralized Data**: All games use a shared vocabulary database with consistent structure.
-  **Categories**: Words are organized by categories (greetings, food, family, etc.) for targeted learning.
-  **Difficulty Scaling**: Each category includes words of varying complexity for progressive learning.

### Performance Tracking

-  **Game Statistics**: Individual game performance is tracked and stored locally.
-  **Learning Analytics**: User progress across games is analyzed to provide personalized recommendations.
-  **Cross-Platform Sync**: Future implementation will sync data across devices.

## 8. Audio and Accessibility

### Audio System

-  **Web Audio API**: All games use the Web Audio API for sound effects and feedback.
-  **Configurable Audio**: Users can toggle sounds and adjust volume levels.
-  **Performance Optimized**: Audio contexts are properly managed to prevent memory leaks.

### Accessibility Features

-  **Keyboard Navigation**: All games support keyboard-only interaction.
-  **Screen Reader Support**: Proper ARIA labels and semantic HTML structure.
-  **Visual Feedback**: Clear visual indicators for all game states and actions.

## 9. Performance and Optimization

### Code Splitting

-  **Lazy Loading**: Games are loaded dynamically to reduce initial bundle size.
-  **Component Optimization**: React.memo and useCallback are used to prevent unnecessary re-renders.
-  **Memory Management**: Proper cleanup of timers, intervals, and audio contexts.

### Mobile Optimization

-  **Touch-Friendly**: Larger touch targets and gesture support.
-  **Responsive Design**: Optimized layouts for various screen sizes.
-  **Performance Monitoring**: Real-time performance tracking for smooth gameplay.

## 10. Future Enhancements

### Planned Features

-  **Multiplayer Mode**: Real-time competitive gameplay across all games.
-  **Tournament System**: Scheduled competitions with leaderboards.
-  **Custom Content**: User-generated vocabulary and game content.
-  **AI Integration**: Adaptive difficulty based on user performance.
-  **Social Features**: Friend challenges and social sharing.

### Technical Improvements

-  **Offline Support**: Service worker implementation for offline gameplay.
-  **Progressive Web App**: Installable game experience.
-  **Voice Integration**: Speech recognition for pronunciation practice.
-  **Analytics Dashboard**: Detailed performance tracking and insights.
