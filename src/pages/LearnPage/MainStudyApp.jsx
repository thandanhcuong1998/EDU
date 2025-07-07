
import React, { useState, useContext } from 'react';
import { Tab, Nav } from 'react-bootstrap'; // Still using for Tab functionality
import { Home, Languages, Trophy, User } from 'lucide-react';

import './assets/LearnPage.css'; // Import the new CSS

import MainContentStudyApp from './MainContentStudyApp.jsx';
import MainLearn from '@/features/learn/components/MainLearn.jsx';
import Logo from './Logo.jsx';
import ThemeToggle from '@/features/theme/components/ThemeToggle.jsx';
import JapaneseAlphabet from '@/features/japanese-alphabet/components/JapaneseAlphabet.jsx';
import Sidebar from '@/features/learn/components/Sidebar.jsx';

export default function MainStudyApp() {
    const [listMenu] = useState([
        { key: 'learn', title: 'Learn', icon: <Home className="lucide" /> },
        { key: 'characters', title: 'Characters', icon: <Languages className="lucide" /> },
        { key: 'leaderboards', title: 'Leaderboards', icon: <Trophy className="lucide" /> },
        { key: 'profile', title: 'Profile', icon: <User className="lucide" /> },
    ]);

    return (
        <div className="learn-page-container">
            <Tab.Container id="learn-tabs" defaultActiveKey={listMenu[0]?.key}>
                <nav className="left-sidebar">
                    <div className="logo-container">
                        <Logo />
                    </div>
                    <Nav variant="pills" className="nav-menu">
                        {listMenu.map((menuItem) => (
                            <Nav.Item key={menuItem.key}>
                                <Nav.Link eventKey={menuItem.key}>
                                    {menuItem.icon}
                                    <span>{menuItem.title}</span>
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    <div className="theme-toggle-container">
                        <ThemeToggle />
                    </div>
                </nav>

                <main className="main-content">
                    <Tab.Content>
                        <Tab.Pane eventKey="learn">
                            <MainLearn />
                        </Tab.Pane>
                        <Tab.Pane eventKey="characters">
                            <JapaneseAlphabet />
                        </Tab.Pane>
                        {/* Other panes can be added here */}
                    </Tab.Content>
                </main>

                <aside className="right-sidebar">
                    <Sidebar />
                </aside>
            </Tab.Container>
        </div>
    );
}

