
import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Home, Languages, Trophy, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '@/features/authentication/state/authSlice.js';

import '@/pages/LearnPage/assets/LearnPage.css'; // Import the main layout CSS

import Logo from '@/pages/LearnPage/Logo.jsx';
import ThemeToggle from '@/features/theme/components/ThemeToggle.jsx';
import Sidebar from '@/features/learn/components/Sidebar.jsx';

// Outlet from react-router-dom will render the child routes here
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
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
        localStorage.removeItem('currentUser'); // Clear user from localStorage
        navigate('/auth/signin'); // Redirect to login page
    };

    return (
        <div className="learn-page-container">
            <nav className="left-sidebar">
                <div className="logo-container">
                    <Logo />
                </div>
                <Nav variant="pills" className="nav-menu">
                    {listMenu.map((menuItem) => (
                        <Nav.Item key={menuItem.key}>
                            <Link to={`/${menuItem.key}`} className="nav-link">
                                {menuItem.icon}
                                <span>{menuItem.title}</span>
                            </Link>
                        </Nav.Item>
                    ))}
                </Nav>
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
