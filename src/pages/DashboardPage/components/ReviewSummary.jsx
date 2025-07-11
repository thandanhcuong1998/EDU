import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookCheck } from 'lucide-react';
import './DashboardComponents.css';

export default function ReviewSummary() {
    const srsItems = useSelector(state => state.userProgress.srsItems);
    const now = new Date().toISOString();
    const itemsToReview = srsItems.filter(item => item.nextReviewDate <= now).length;

    return (
        <div className="dashboard-card review-summary-card">
            <h3 className="dashboard-card__title">Ôn tập kiến thức</h3>
            <div className="review-summary-card__content">
                <p>Bạn có <strong>{itemsToReview}</strong> mục cần ôn tập hôm nay.</p>
                <Link 
                    to="/review"
                    className="dashboard-card__button" 
                    disabled={itemsToReview === 0}
                >
                    <BookCheck size={20} />
                    <span>Bắt đầu ôn tập</span>
                </Link>
            </div>
        </div>
    );
}
