import { createSlice } from '@reduxjs/toolkit';
import ListQuestionFakeDataLession from '@/features/learn/data/ListQuestionFakeDataLession.jsx';

// Load initial state from localStorage if available
const loadInitialState = () => {
  try {
    const savedState = localStorage.getItem('userProgress');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Ensure new fields are initialized if not present in saved state
      return {
        ...parsedState,
        currentStreak: parsedState.currentStreak || 0,
        lastDailyGoalCompletionDate: parsedState.lastDailyGoalCompletionDate || null,
      };
    }
  } catch (error) {
    console.error('Error loading user progress:', error);
  }
  
  // Default initial state
  return {
    experience: 0,
    completedLevels: {},
    unlockedTopics: {
      N5: ['basicGreetings'] // Start with only the first topic unlocked
    },
    startingLevel: 'N5', // Add startingLevel
    currentStreak: 0,
    lastDailyGoalCompletionDate: null,
  };
};

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState: loadInitialState(),
  reducers: {
    initializeUserProgress: (state, action) => {
      const proficiencyChoice = action.payload.find(q => q.id === 'proficiency')?.questionChoice.id;
      const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
      let startingLevel = 'N5';

      if (proficiencyChoice === 0) { // Mới học tiếng Nhật
        startingLevel = 'N5';
      } else if (proficiencyChoice === 1) { // Biết một vài từ thông dụng
        startingLevel = 'N5';
      } else if (proficiencyChoice === 2) { // Giao tiếp cơ bản
        startingLevel = 'N4';
      } else if (proficiencyChoice === 3) { // Nói về nhiều chủ đề
        startingLevel = 'N3';
      } else if (proficiencyChoice === 4) { // Thảo luận sâu
        startingLevel = 'N2'; // Hoặc N1 tùy theo mức độ cao nhất bạn muốn
      }

      state.startingLevel = startingLevel;

      // Unlock all topics up to the startingLevel
      const startIndex = JLPT_LEVELS.indexOf(startingLevel);
      for (let i = 0; i <= startIndex; i++) {
        const currentJlptLevel = JLPT_LEVELS[i];
        if (ListQuestionFakeDataLession[currentJlptLevel]) {
          state.unlockedTopics[currentJlptLevel] = Object.keys(ListQuestionFakeDataLession[currentJlptLevel]).filter(key => key !== 'metadata');
        }
      }
    },
    addExperience: (state, action) => {
      state.experience += action.payload;
      // Save to localStorage
      localStorage.setItem('userProgress', JSON.stringify(state));
    },
    
    completeLevel: (state, action) => {
      const { jlptLevel, topic, level } = action.payload;
      
      // Initialize if not exists
      if (!state.completedLevels[jlptLevel]) {
        state.completedLevels[jlptLevel] = {};
      }
      if (!state.completedLevels[jlptLevel][topic]) {
        state.completedLevels[jlptLevel][topic] = [];
      }
      
      // Add to completed levels if not already completed
      if (!state.completedLevels[jlptLevel][topic].includes(level)) {
        state.completedLevels[jlptLevel][topic].push(level);
      }
      
      // Save to localStorage
      localStorage.setItem('userProgress', JSON.stringify(state));
    },
    
    unlockTopic: (state, action) => {
      const { jlptLevel, topic } = action.payload;
      
      // Initialize if not exists
      if (!state.unlockedTopics[jlptLevel]) {
        state.unlockedTopics[jlptLevel] = [];
      }
      
      // Add to unlocked topics if not already unlocked
      if (!state.unlockedTopics[jlptLevel].includes(topic)) {
        state.unlockedTopics[jlptLevel].push(topic);
      }
      
      // Save to localStorage
      localStorage.setItem('userProgress', JSON.stringify(state));
    },

    updateDailyProgress: (state) => {
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const lastCompletionDate = state.lastDailyGoalCompletionDate;

        if (lastCompletionDate === today) {
            // Already completed today, do nothing
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().slice(0, 10);

        if (lastCompletionDate === yesterdayString) {
            // Completed yesterday, so increment streak
            state.currentStreak += 1;
        } else if (lastCompletionDate !== null) {
            // Not completed yesterday or today, reset streak
            state.currentStreak = 1;
        } else {
            // First time completing a goal
            state.currentStreak = 1;
        }
        state.lastDailyGoalCompletionDate = today;
        localStorage.setItem('userProgress', JSON.stringify(state));
    },
    resetProgress: (state) => {
      const defaultState = loadInitialState();
      Object.assign(state, defaultState);
      localStorage.removeItem('userProgress');
    },
  }
});

export const { addExperience, completeLevel, unlockTopic, updateDailyProgress, initializeUserProgress, resetProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
