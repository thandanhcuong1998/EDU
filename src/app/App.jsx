
import { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';
import { LanguageProvider, LanguageContext } from './providers/LanguageProvider.jsx';
import ToastContainer from '@/shared/ui/Toast/ToastContainer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/theme.css'; // Import our new theme system
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/features/authentication/state/authSlice.js';

// A component to handle theme and language synchronization
const ThemedApp = () => {
    const { language } = useContext(LanguageContext);
    const dispatch = useDispatch();
    
    // For now, we'll manually get the theme from localStorage as ThemeProvider is not yet implemented
    // In the future, this would come from a ThemeContext
    const theme = localStorage.getItem('theme') || 'light';

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        root.setAttribute('lang', language);

        // Check for logged-in user in localStorage on app load
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            dispatch(loginSuccess(currentUser));
        }
    }, [theme, language, dispatch]);

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
};

function App() {
    return (
        <LanguageProvider>
            <ThemedApp />
        </LanguageProvider>
    );
}

export default App;
