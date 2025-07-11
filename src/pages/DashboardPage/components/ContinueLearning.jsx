import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import './DashboardComponents.css';

export default function ContinueLearning() {
    const navigate = useNavigate();

    // Placeholder logic - in the future, this would get the actual next lesson
    const nextLesson = {
        topic: 'Basic Greetings',
        level: 'Level 1',
    };

    return (
        <div className="dashboard-card continue-learning-card">
            <h3 className="dashboard-card__title">Tiếp tục hành trình của bạn</h3>
            <p className="dashboard-card__subtitle">
                Bài học tiếp theo: <strong>{nextLesson.topic} - {nextLesson.level}</strong>
            </p>
            <button 
                className="dashboard-card__button" 
                onClick={() => navigate('/learn/path')}
            >
                <PlayCircle size={20} />
                <span>Bắt đầu học</span>
            </button>
        </div>
    );
}
