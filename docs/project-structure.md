# Project Structure

This project follows the principles of **Feature-Sliced Design (FSD)**. This architecture helps in organizing the codebase in a scalable and maintainable way by decoupling different parts of the application.

The `src` directory is organized into the following main layers:

```
src/
├── app/         # App-wide setup, providers, and root configurations.
├── pages/       # Pages of the application, composed of features and widgets.
├── features/    # Business-level features of the application.
├── components/  # Reusable, business-agnostic UI components.
├── shared/      # Low-level, reusable code used across the entire project.
└── ...
```

---

### `app`

This layer contains the core application setup. It's the entry point of the application and wires everything together.

-   **`providers/`**: Contains all React Context providers (e.g., `LanguageProvider`).
-   **`router/`**: Contains the main application routing configuration (`react-router-dom`).
-   **`store/`**: Contains the Redux store setup and root reducer.
-   **`styles/`**: Global styles, resets, and application-wide style definitions (including `theme.css`).
-   **`App.jsx`, `main.jsx`**: The root component and the main entry point for React.

---

### `pages`

Each folder inside `pages` represents a specific page of the application (e.g., `HomePage`, `LearnPage`). A page is a composition layer that arranges features and shared components to form a complete user-facing screen.

-   **`HomePage/`**: The landing page.
-   **`LearnPage/`**: The main application page for learning activities.
-   **`WelcomePage/`**: The initial onboarding and proficiency test pages.
-   **`AuthPage/`**: Pages for user sign-in and sign-up.

---

### `features`

This layer contains specific business features of the application. Each feature is a self-contained unit of functionality.

-   **`authentication/`**: Handles user login and registration logic.
-   **`learn/`**: Core learning functionality, including lesson display and progress tracking.
-   **`japanese-alphabet/`**: Feature for learning Hiragana and Katakana.
-   **`user-profile/`**: Manages user progress, XP, and unlocked content.
-   **`welcome/`**: The onboarding flow for new users.
-   **`theme/`**: Components and logic for theme switching (light/dark).

---

### `components`

This directory was refactored to primarily hold the different types of question components, which are complex, reusable units.

-   **`QuestionTypes/`**: Contains the UI and logic for each type of question (`Radio`, `FillInBlank`, `CardWord`, `MappingWord`). Each question type is a self-contained component with its own styles.

---

### `shared`

This is the lowest-level layer, containing code that can be used anywhere in the project. It has no dependencies on any other layer.

-   **`assets/`**: Global static assets like fonts and shared images (including `locales` for i18n).
-   **`lib/`**: Common utility functions, constants, and helper logic (e.g., `answerCheckers.js`).
-   **`services/`**: Shared services like audio playback or toast notifications.
-   **`ui/`**: The most basic, reusable UI components (e.g., a generic `Button` or `Card`). This layer was mostly integrated into more specific components during the refactor.
-   **`components/`**: Shared, simple components like `Icon`.

---

### Other Directories

-   **`config/`**: Configuration files, such as environment variable setup.
-   **`styles/`**: Global SCSS setup, including variables and mixins.
-   **`types/`**: TypeScript type definitions.