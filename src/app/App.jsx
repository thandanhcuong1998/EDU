
import { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';
import { LanguageProvider, LanguageContext } from './providers/LanguageProvider.jsx';
import ToastContainer from '@/shared/ui/Toast/ToastContainer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/theme.css'; // Import our new theme system

// A component to handle theme and language synchronization
const ThemedApp = () => {
    const { language } = useContext(LanguageContext);
    
    // For now, we'll manually get the theme from localStorage as ThemeProvider is not yet implemented
    // In the future, this would come from a ThemeContext
    const theme = localStorage.getItem('theme') || 'light';

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        root.setAttribute('lang', language);
    }, [theme, language]);

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
