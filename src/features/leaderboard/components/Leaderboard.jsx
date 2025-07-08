
import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css'; // We will create this CSS file
import { Award, Crown, ArrowLeft } from 'lucide-react';
import { LanguageContext } from '@/app/providers/LanguageProvider.jsx';

export default function Leaderboard() {
    const { translations } = useContext(LanguageContext);
    const currentUser = useSelector(state => state.auth.user);
    const currentUserProgress = useSelector(state => state.userProgress);
    const navigate = useNavigate();

    // Mock data for other users
    const mockUsers = useMemo(() => [
        { id: 'user1', username: 'Sakura', experience: 1250 },
        { id: 'user2', username: 'Kenji', experience: 1100 },
        { id: 'user3', username: 'Aoi', experience: 980 },
        { id: 'user4', username: 'Hiroshi', experience: 850 },
        { id: 'user5', username: 'Yuki', experience: 720 },
        { id: 'user6', username: 'Daichi', experience: 600 },
        { id: 'user7', username: 'Rina', experience: 550 },
        { id: 'user8', username: 'Takumi', experience: 480 },
        { id: 'user9', username: 'Mio', experience: 390 },
        { id: 'user10', username: 'Kaito', experience: 300 },
    ], []);

    const leaderboardData = useMemo(() => {
        const allUsers = [...mockUsers];
        
        // Add current user if logged in and not already in mock data
        if (currentUser && !allUsers.some(u => u.id === currentUser.email)) {
            allUsers.push({
                id: currentUser.email,
                username: currentUser.username,
                experience: currentUserProgress.experience,
            });
        }

        // Sort by experience in descending order
        return allUsers.sort((a, b) => b.experience - a.experience);
    }, [mockUsers, currentUser, currentUserProgress.experience]);

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-card">
                <button className="back-to-learn-button" onClick={() => navigate('/learn')}>
                    <ArrowLeft size={20} /> Quay lại Học
                </button>
                <h2 className="leaderboard-title"><Award size={32} /> Bảng xếp hạng</h2>
                <p className="leaderboard-subtitle">Xem vị trí của bạn so với các học viên khác!</p>

                <div className="leaderboard-list">
                    <div className="leaderboard-list__header">
                        <span className="rank-col">#</span>
                        <span className="name-col">Tên người dùng</span>
                        <span className="xp-col">XP</span>
                    </div>
                    {leaderboardData.map((user, index) => (
                        <div 
                            key={user.id}
                            className={`leaderboard-list__item ${currentUser && user.id === currentUser.email ? 'leaderboard-list__item--current-user' : ''}`}
                        >
                            <span className="rank-col">{index + 1}{index === 0 && <Crown size={16} className="crown-icon" />}</span>
                            <span className="name-col">{user.username}</span>
                            <span className="xp-col">{user.experience} XP</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
