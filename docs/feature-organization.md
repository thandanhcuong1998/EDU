# Feature-Based Organization

This document outlines the new feature-based organization structure for the Japanese-EDU project and provides guidelines for migrating components to this structure.

## Directory Structure

The new feature-based organization follows this structure:

```
src/
├── features/                  # Feature modules
│   ├── learn/                 # Learn feature
│   │   ├── components/        # Components specific to the learn feature
│   │   │   ├── Lesson/        # Lesson-related components
│   │   │   └── Question/      # Question-related components
│   │   │       └── QuestionTypes/ # Different question type components
│   │   ├── hooks/             # Hooks specific to the learn feature
│   │   ├── services/          # Services specific to the learn feature
│   │   └── redux/             # Redux state management for the learn feature
│   └── [other-features]/      # Other features follow the same pattern
├── shared/                    # Shared modules used across features
│   ├── components/            # Shared components
│   │   └── ui/                # UI components (buttons, inputs, etc.)
│   ├── hooks/                 # Shared hooks
│   ├── services/              # Shared services
│   └── utils/                 # Shared utilities
└── config/                    # Application configuration
```

## Migration Guidelines

### 1. Identify Features

The first step is to identify the main features of the application. For Japanese-EDU, the main features are:

- Learn (lessons, questions, etc.)
- User Management (login, registration, profile)
- Dashboard (progress tracking, statistics)

### 2. Move Components to Feature Directories

For each component, determine which feature it belongs to and move it to the appropriate feature directory.

Example:
- Move `src/Routes/MainAppStudy/Learn/components/Lession/Lession.jsx` to `src/features/learn/components/Lesson/Lesson.jsx`
- Move `src/Routes/MainAppStudy/Learn/components/Question.jsx` to `src/features/learn/components/Question/Question.jsx`
- Move `src/Routes/MainAppStudy/Learn/components/componentsTypeQuestion/CardWord.jsx` to `src/features/learn/components/Question/QuestionTypes/CardWord.jsx`

### 3. Move Hooks to Feature Directories

Move hooks to the appropriate feature directory.

Example:
- Move `src/Hooks/useCardWordHook.jsx` to `src/features/learn/hooks/useCardWordHook.jsx`
- Move `src/Hooks/useLessionHook.js` to `src/features/learn/hooks/useLessonHook.js`

### 4. Update Imports

Update import statements in all files to reflect the new directory structure.

Example:
```javascript
// Old import
import useCardWordHook from '../../../../../Hooks/useCardWordHook.jsx';

// New import
import useCardWordHook from '../../../hooks/useCardWordHook.jsx';
```

### 5. Move Redux State Management

Move Redux actions, reducers, and selectors to the appropriate feature directory.

Example:
- Move `src/Redux/Reducers/LessionQuestionChoiceReducer.jsx` to `src/features/learn/redux/lessonSlice.js`

## Benefits of Feature-Based Organization

1. **Cohesion**: Related code is grouped together, making it easier to understand and maintain.
2. **Scalability**: New features can be added without affecting existing features.
3. **Reusability**: Components, hooks, and services can be reused within a feature.
4. **Testability**: Features can be tested in isolation.
5. **Collaboration**: Multiple developers can work on different features without conflicts.

## Implementation Strategy

1. Start with a small feature and migrate it completely.
2. Test thoroughly after each migration.
3. Update documentation to reflect the new structure.
4. Gradually migrate other features.