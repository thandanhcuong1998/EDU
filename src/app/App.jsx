import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';
import { LanguageProvider } from './providers/LanguageProvider.jsx';
import ToastContainer from '@/shared/ui/Toast/ToastContainer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
    return (
        <LanguageProvider>
            <RouterProvider router={router} />
            <ToastContainer />
        </LanguageProvider>
    );
}

export default App;