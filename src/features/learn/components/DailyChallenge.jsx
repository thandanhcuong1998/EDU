
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Flame, Target } from 'lucide-react';
import './DailyChallenge.css';
import { LanguageContext } from '@/app/providers/LanguageProvider.jsx';

export default function DailyChallenge() {
    const { translations } = useContext(LanguageContext);
    const { currentStreak } = useSelector(state => state.userProgress);

    // Define a simple daily goal (e.g., complete 1 lesson or gain 50 XP)
    const dailyGoal = translations.dailyChallenge.goal;

    return (
        <div className="daily-challenge-card">
            <h3 className="daily-challenge-title">
                <Target size={20} /> {translations.dailyChallenge.title}
            </h3>
            <p className="daily-challenge-goal">{dailyGoal}</p>
            <div className="daily-challenge-streak">
                <Flame size={24} className="streak-icon" />
                <span className="streak-count">{currentStreak}</span>
                <span className="streak-label">{translations.dailyChallenge.streakLabel}</span>
            </div>
        </div>
    );
}
