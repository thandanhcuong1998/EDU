import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Award, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addExperience } from '@/features/user-profile/state/UserProgressReducer.jsx';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './LessonReport.css'; // Import the new styles

export default function LessonReport({ stats, onContinue }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    const { score, performanceMessage } = useMemo(() => {
        let calculatedScore = 100 - (stats.incorrectAttempts * 5);
        calculatedScore = Math.max(0, calculatedScore);

        let message = "Cần cố gắng hơn! Hãy xem lại bài học này.";
        if (calculatedScore >= 90) message = "Xuất sắc! Bạn đã nắm vững bài học này.";
        else if (calculatedScore >= 70) message = "Tốt! Bạn đã hiểu phần lớn bài học.";
        else if (calculatedScore >= 50) message = "Khá! Hãy xem lại những phần bạn còn chưa chắc.";

        return { score: calculatedScore, performanceMessage: message };
    }, [stats.incorrectAttempts]);

    const handleContinue = () => {
        dispatch(addExperience(stats.xpEarned));
        if (onContinue) {
            onContinue();
        } else {
            navigate('/learn');
        }
    };

    return (
        <div className="lesson-report-overlay">
            <div className="lesson-report-card">
                <header className="report-header">
                    <div className="report-header__lottie">
                        <DotLottieReact
                            src="https://lottie.host/a353832f-1139-4973-9f15-21f589094b6e/pToAFj2M2x.json"
                            loop
                            autoplay
                        />
                    </div>
                    <h2 className="report-header__title">Bài học hoàn thành!</h2>
                    <p className="report-header__subtitle">{stats.topic} - {stats.level}</p>
                </header>

                <section className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-item__label"><Clock size={16} /> Thời gian</span>
                        <p className="stat-item__value">{formatTime(stats.timeSpent)}</p>
                    </div>
                    <div className="stat-item">
                        <span className="stat-item__label"><CheckCircle size={16} /> Độ chính xác</span>
                        <p className="stat-item__value">{100 - (stats.incorrectAttempts * 5)}%</p>
                    </div>
                    <div className="stat-item">
                        <span className="stat-item__label"><Award size={16} /> Kinh nghiệm</span>
                        <p className="stat-item__value">+{stats.xpEarned} XP</p>
                    </div>
                </section>

                <section className="score-section">
                    <h3 className="score-section__label">Tổng điểm: {score}/100</h3>
                    <div className="score-bar-container">
                        <div className="score-bar" style={{ width: `${score}%` }}></div>
                    </div>
                    <p className="score-section__message">{performanceMessage}</p>
                </section>

                <footer className="report-footer">
                    <button className="continue-button" onClick={handleContinue}>
                        <span>Tiếp tục</span>
                        <ArrowRight size={20} />
                    </button>
                    <button className="exit-button" onClick={() => navigate('/learn')}>
                        Thoát
                    </button>
                </footer>
            </div>
        </div>
    );
}