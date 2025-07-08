import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Home, Languages, Trophy, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { logout } from '@/features/authentication/state/authSlice.js';

import './assets/LearnPage.css'; // Import the main layout CSS

import Logo from './Logo.jsx';
import ThemeToggle from '@/features/theme/components/ThemeToggle.jsx';
import Sidebar from '@/features/learn/components/Sidebar.jsx';
import DailyChallenge from '@/features/learn/components/DailyChallenge.jsx';

export default function MainStudyApp() {
    const [listMenu] = useState([
        { key: 'learn', title: 'Learn', icon: <Home className="lucide" />, path: '/learn' },
        { key: 'characters', title: 'Characters', icon: <Languages className="lucide" />, path: '/learn/characters' },
        { key: 'leaderboard', title: 'Leaderboards', icon: <Trophy className="lucide" />, path: '/leaderboard' },
        { key: 'profile', title: 'Profile', icon: <User className="lucide" />, path: '/profile' },
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
                            <Link to={menuItem.path} className="nav-link">
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
                <DailyChallenge /> {/* Add DailyChallenge here */}
                <Sidebar />
            </aside>
        </div>
    );
}

