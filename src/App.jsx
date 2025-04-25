import { RouterProvider } from 'react-router-dom';
import router from './Routes/RootRoute.jsx';
import { LanguageProvider } from './Routes/HomePage/Context/LanguageContext.jsx';
import ToastContainer from './shared/components/ui/Toast/ToastContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <LanguageProvider>
            <RouterProvider router={router} />
            <ToastContainer />
        </LanguageProvider>
    );
}

export default App;
