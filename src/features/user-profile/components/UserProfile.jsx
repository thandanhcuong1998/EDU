
import React, { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'; // We will create this CSS file
import { Award, BookOpen, CheckCircle, User as UserIcon, ArrowLeft, Trophy, Star } from 'lucide-react';
import { LanguageContext } from '@/app/providers/LanguageProvider.jsx';
import ListQuestionFakeDataLession from '@/features/learn/data/ListQuestionFakeDataLession.jsx';

export default function UserProfile() {
    const { translations } = useContext(LanguageContext);
    const user = useSelector(state => state.auth.user);
    const userProgress = useSelector(state => state.userProgress);
    const navigate = useNavigate();

    // Calculate total completed lessons/topics
    const totalCompletedLessons = useMemo(() => {
        return Object.values(userProgress.completedLevels).reduce((acc, level) => {
            return acc + Object.values(level).reduce((topicAcc, lessons) => topicAcc + lessons.length, 0);
        }, 0);
    }, [userProgress.completedLevels]);

    // Simple level calculation based on XP
    const userLevel = useMemo(() => Math.floor(userProgress.experience / 100) + 1, [userProgress.experience]); // 100 XP per level

    // Mock achievements based on user progress
    const achievements = useMemo(() => {
        const achieved = [];
        if (userProgress.experience >= 500) {
            achieved.push({ id: 'xp500', name: 'Người học chăm chỉ', description: 'Đạt 500 XP', icon: <Trophy size={24} /> });
        }
        if (userProgress.experience >= 1000) {
            achieved.push({ id: 'xp1000', name: 'Chuyên gia XP', description: 'Đạt 1000 XP', icon: <Award size={24} /> });
        }
        if (totalCompletedLessons >= 5) {
            achieved.push({ id: 'lessons5', name: 'Người hoàn thành bài học', description: 'Hoàn thành 5 bài học', icon: <BookOpen size={24} /> });
        }
        // Add more achievements here
        return achieved;
    }, [userProgress.experience, totalCompletedLessons]);

    return (
        <div className="user-profile-container">
            <div className="profile-card">
                <button className="back-to-learn-button" onClick={() => navigate('/learn')}>
                    <ArrowLeft size={20} /> Quay lại Học
                </button>
                <div className="profile-header">
                    <div className="profile-avatar">
                        <UserIcon size={60} />
                    </div>
                    <h2 className="profile-name">{user?.username || 'Người dùng'}</h2>
                    <p className="profile-email">{user?.email || 'email@example.com'}</p>
                </div>

                <div className="profile-stats-grid">
                    <div className="stat-item">
                        <Award size={24} className="stat-icon" />
                        <p className="stat-label">Tổng XP</p>
                        <p className="stat-value">{userProgress.experience}</p>
                    </div>
                    <div className="stat-item">
                        <BookOpen size={24} className="stat-icon" />
                        <p className="stat-label">Cấp độ</p>
                        <p className="stat-value">{userLevel}</p>
                    </div>
                    <div className="stat-item">
                        <CheckCircle size={24} className="stat-icon" />
                        <p className="stat-label">Bài học hoàn thành</p>
                        <p className="stat-value">{totalCompletedLessons}</p>
                    </div>
                </div>

                <div className="profile-section">
                    <h3 className="section-title">Tiến độ học tập</h3>
                    <div className="progress-list">
                        {Object.keys(ListQuestionFakeDataLession).map(jlptLevel => (
                            <div key={jlptLevel} className="jlpt-progress-item">
                                <h4 className="jlpt-progress-title">{jlptLevel}</h4>
                                {Object.keys(ListQuestionFakeDataLession[jlptLevel]).map(topic => {
                                    const totalLessonsInTopic = Object.keys(ListQuestionFakeDataLession[jlptLevel][topic]).filter(key => key !== 'metadata').length;
                                    const completedLessonsInTopic = userProgress.completedLevels[jlptLevel]?.[topic]?.length || 0;
                                    const progressPercentage = totalLessonsInTopic > 0 ? (completedLessonsInTopic / totalLessonsInTopic) * 100 : 0;
                                    return (
                                        <div key={topic} className="topic-progress-bar">
                                            <p className="topic-progress-label">{topic.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                                            <div className="progress-bar-container">
                                                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                                            </div>
                                            <span className="progress-text">{completedLessonsInTopic}/{totalLessonsInTopic}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="profile-section">
                    <h3 className="section-title">Thành tích</h3>
                    <div className="achievements-grid">
                        {achievements.length > 0 ? (
                            achievements.map(achievement => (
                                <div key={achievement.id} className="achievement-card">
                                    <div className="achievement-icon">{achievement.icon}</div>
                                    <h4 className="achievement-title">{achievement.name}</h4>
                                    <p className="achievement-description">{achievement.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="section-description">Chưa có thành tích nào. Hãy học tập chăm chỉ để mở khóa nhé!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
