import React from 'react';
import { useSelector } from 'react-redux';
import { 
    selectUserXPData, 
    selectLevelUpInfo, 
    selectUserRank 
} from '../state/xpSlice.js';
import { TrendingUp, Star, Trophy } from 'lucide-react';
import './XPDisplay.scss';

const XPDisplay = ({ className = '', showDetails = false }) => {
    const userData = useSelector(selectUserXPData);
    const levelUpInfo = useSelector(selectLevelUpInfo);
    const userRank = useSelector(selectUserRank);

    if (!userData) {
        return (
            <div className={`xp-display ${className}`}>
                <div className="xp-display__loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    const formatNumber = (num) => {
        return num.toLocaleString('vi-VN');
    };

    return (
        <div className={`xp-display ${className}`}>
            {/* Level và Rank */}
            <div className="xp-display__header">
                <div className="xp-display__level">
                    <span className="xp-display__level-number">{userData.level}</span>
                    <span className="xp-display__level-label">Level</span>
                </div>
                
                <div className="xp-display__rank">
                    <Trophy size={16} />
                    <span className="xp-display__rank-name">{userRank?.name}</span>
                </div>
            </div>

            {/* XP Progress Bar */}
            <div className="xp-display__progress">
                <div className="xp-display__progress-info">
                    <span className="xp-display__xp-current">
                        {formatNumber(userData.currentXP)} XP
                    </span>
                    {!levelUpInfo?.isMaxLevel && (
                        <span className="xp-display__xp-required">
                            / {formatNumber(userData.currentXP + levelUpInfo?.xpRequired)} XP
                        </span>
                    )}
                </div>
                
                <div className="xp-display__progress-bar">
                    <div 
                        className="xp-display__progress-fill"
                        style={{ width: `${levelUpInfo?.xpProgress || 0}%` }}
                    ></div>
                </div>
                
                {!levelUpInfo?.isMaxLevel && (
                    <div className="xp-display__progress-label">
                        {formatNumber(levelUpInfo?.xpRequired || 0)} XP để level {levelUpInfo?.nextLevel}
                    </div>
                )}
            </div>

            {/* Total XP */}
            <div className="xp-display__total">
                <Star size={14} />
                <span>Tổng: {formatNumber(userData.totalXP)} XP</span>
            </div>

            {/* Streak */}
            {userData.streak > 0 && (
                <div className="xp-display__streak">
                    <TrendingUp size={14} />
                    <span>Streak: {userData.streak}</span>
                </div>
            )}

            {/* Detailed Stats (optional) */}
            {showDetails && (
                <div className="xp-display__details">
                    <div className="xp-display__stats">
                        <div className="xp-display__stat">
                            <span className="xp-display__stat-label">Bài học</span>
                            <span className="xp-display__stat-value">
                                {formatNumber(userData.stats.lessonsCompleted)}
                            </span>
                        </div>
                        
                        <div className="xp-display__stat">
                            <span className="xp-display__stat-label">Câu đúng</span>
                            <span className="xp-display__stat-value">
                                {formatNumber(userData.stats.correctAnswers)}/{formatNumber(userData.stats.questionsAnswered)}
                            </span>
                        </div>
                        
                        <div className="xp-display__stat">
                            <span className="xp-display__stat-label">Ôn tập</span>
                            <span className="xp-display__stat-value">
                                {formatNumber(userData.stats.srsReviews)}
                            </span>
                        </div>
                        
                        <div className="xp-display__stat">
                            <span className="xp-display__stat-label">Ngày liên tiếp</span>
                            <span className="xp-display__stat-value">
                                {userData.dailyStreak}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default XPDisplay; 