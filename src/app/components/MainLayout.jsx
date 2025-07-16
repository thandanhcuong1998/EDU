
import { useState } from 'react';
import { Home, Languages, Trophy, User, Users, Gamepad2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { logout } from '@/features/authentication/state/authSlice.js';
import { resetWelcomeState } from '@/features/welcome/state/welcomeSlice.js';
import { resetProgress } from '@/features/user-profile/state/UserProgressReducer.jsx';
import { resetState as resetLessonState } from '@/features/learn/redux/lessonSlice.js';

import '@/pages/LearnPage/assets/LearnPage.css'; // Import the main layout CSS

import Logo from '@/pages/LearnPage/Logo.jsx';
import ThemeToggle from '@/features/theme/components/ThemeToggle.jsx';
import Sidebar from '@/features/learn/components/Sidebar.jsx';

// Outlet from react-router-dom will render the child routes here
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    const location = useLocation();
    const [listMenu] = useState([
        { key: 'learn', title: 'Learn', icon: <Home className="lucide" /> },
        { key: 'characters', title: 'Characters', icon: <Languages className="lucide" /> },
        { key: 'leaderboard', title: 'Leaderboards', icon: <Trophy className="lucide" /> },
        { key: 'profile', title: 'Profile', icon: <User className="lucide" /> },
    ]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetWelcomeState());
        dispatch(resetProgress());
        dispatch(resetLessonState());
        localStorage.removeItem('currentUser'); // Clear user from localStorage
        navigate('/auth/signin'); // Redirect to login page
    };

    return (
        <div className="learn-page-container">
            <nav className="left-sidebar">
                <div className="logo-container">
                    <Logo />
                </div>
                <nav className="nav-menu">
                    {listMenu.map((menuItem) => {
                        const isActive = location.pathname === `/${menuItem.key}`;
                        return (
                            <Link 
                                key={menuItem.key} 
                                to={`/${menuItem.key}`} 
                                className={`nav-link ${isActive ? 'active' : ''}`}
                            >
                                {menuItem.icon}
                                <span>{menuItem.title}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="theme-toggle-container">
                    <ThemeToggle />
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    Đăng xuất
                </button>
            </nav>

            <main className="main-content">
                <Outlet /> {/* This is where child routes will be rendered */}
            </main>

            <aside className="right-sidebar">
                <Sidebar />
            </aside>
        </div>
    );
}
