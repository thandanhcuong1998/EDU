import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Lession from '@/features/learn/components/Lession.jsx';
import ListQuestionFakeDataLession from '@/features/learn/data/ListQuestionFakeDataLession.jsx';

export default function ReviewPage() {
    const srsItems = useSelector(state => state.userProgress.srsItems);
    const now = new Date().toISOString();
    const itemsToReview = srsItems.filter(item => item.nextReviewDate <= now);

    if (itemsToReview.length === 0) {
        return (
            <div className="review-page-container">
                <h2>Ôn tập</h2>
                <p>Bạn không có mục nào cần ôn tập hôm nay. Hãy quay lại sau nhé!</p>
                <Link to="/learn">Quay lại Dashboard</Link>
            </div>
        );
    }

    // We can reuse the Lession component for the review session
    // We'll need to pass the review questions to it.
    // This part will require modification in the Lession component to accept questions as props.
    return (
        <div className="review-page-container">
            <Lession questions={itemsToReview.map(item => item.question)} />
        </div>
    );
}
