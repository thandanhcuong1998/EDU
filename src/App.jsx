import { RouterProvider } from 'react-router-dom';
import router from './Routes/RootRoute.jsx';
import { LanguageProvider } from './Routes/HomePage/Context/LanguageContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
