# Project Structure

This document provides an overview of the Japanese-EDU project structure and organization.

## Directory Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                 # Global styles
├── common/                 # Common assets and utilities
│   └── assest/             # Images, fonts, and other static assets
├── Helpers/                # Utility functions and helpers
│   ├── util.jsx            # General utility functions
│   ├── answerCheckers.js   # Functions for checking answers
│   └── ListQuestionFakeDataLession.jsx # Mock data for lessons
├── Hooks/                  # Custom React hooks
│   ├── useCardWordHook.jsx # Hook for card word question type
│   └── useLessionHook.js   # Hook for lesson management
├── Redux/                  # Redux state management
│   ├── Actions/            # Redux actions
│   ├── Reducers/           # Redux reducers
│   └── configureStore.jsx  # Redux store configuration
└── Routes/                 # Application routes and pages
    ├── HomePage/           # Home page components
    ├── MainAppStudy/       # Main study application
    │   └── Learn/          # Learning components
    │       └── components/ # Learning UI components
    └── RootRoute.jsx       # Root routing configuration
```

## Key Components

### Question Types

The application supports several types of questions:

1. **Radio**: Multiple choice questions with a single correct answer
2. **Card Word (English)**: Arrange English words to form a sentence
3. **Card Word (Japanese)**: Arrange Japanese characters to form a word or phrase
4. **Mapping Word**: Match pairs of related words (e.g., Japanese to English)

### State Management

The application uses Redux for state management:

- **LessionQuestionChoiceReducer**: Manages the state of the current lesson, including:
  - Current question index
  - User answers
  - Correctness of answers
  - Progress through the lesson

### Custom Hooks

- **useCardWordHook**: Manages the state and interactions for card word questions
- **useLessionHook**: Manages the overall lesson state and navigation

## Planned Improvements

1. Reorganize components by feature rather than by type
2. Implement consistent file naming conventions
3. Add TypeScript typing throughout the application
4. Create a proper component library with reusable UI components
5. Implement proper environment configuration