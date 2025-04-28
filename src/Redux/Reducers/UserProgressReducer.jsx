import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage if available
const loadInitialState = () => {
  try {
    const savedState = localStorage.getItem('userProgress');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading user progress:', error);
  }
  
  // Default initial state
  return {
    experience: 0,
    completedLevels: {},
    unlockedTopics: {
      N5: ['greeting'] // Start with only the first topic unlocked
    }
  };
};

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState: loadInitialState(),
  reducers: {
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
    }
  }
});

export const { addExperience, completeLevel, unlockTopic } = userProgressSlice.actions;
export default userProgressSlice.reducer;