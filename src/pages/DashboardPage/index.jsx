import React from 'react';
import DailyChallenge from '@/features/learn/components/DailyChallenge.jsx';
import ContinueLearning from './components/ContinueLearning.jsx';
import ReviewSummary from './components/ReviewSummary.jsx';
import './DashboardPage.css';

export default function DashboardPage() {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Bảng điều khiển</h1>
            <div className="dashboard-grid">
                <div className="dashboard-main-column">
                    <ContinueLearning />
                    <ReviewSummary />
                </div>
                <div className="dashboard-side-column">
                    <DailyChallenge />
                </div>
            </div>
        </div>
    );
}
