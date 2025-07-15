import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    startReviewSession, 
    endReviewSession, 
    nextReviewItem, 
    previousReviewItem,
    addReviewResult,
    reviewSRSItem,
    loadDueItems,
    selectCurrentReviewSession,
    selectCurrentReviewItem,
    selectSRSLoading,
    selectDueItems
} from '../state/srsSlice.js';
import { useAudio } from '@/shared/hooks/useAudio.js';
import xpService from '@/shared/services/xpService.js';
import './SRSReview.scss';

const SRSReview = () => {
    const dispatch = useDispatch();
    const { playFeedback } = useAudio();
    
    const currentSession = useSelector(selectCurrentReviewSession);
    const currentItem = useSelector(selectCurrentReviewItem);
    const loading = useSelector(selectSRSLoading);
    const dueItems = useSelector(selectDueItems);
    
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        // Load due items khi component mount
        dispatch(loadDueItems());
    }, [dispatch]);

    const handleStartReview = () => {
        if (dueItems.length > 0) {
            dispatch(startReviewSession({ items: dueItems }));
        }
    };

    const handleEndReview = () => {
        dispatch(endReviewSession());
        setSelectedDifficulty(null);
        setShowAnswer(false);
    };

    const handleDifficultySelect = async (difficulty) => {
        if (!currentItem) return;

        setSelectedDifficulty(difficulty);
        const isCorrect = difficulty >= 3;

        // Phát âm thanh feedback
        await playFeedback(isCorrect);

        // Thêm kết quả vào session
        dispatch(addReviewResult({
            itemId: currentItem.id,
            difficulty,
            isCorrect
        }));

        // Cập nhật SRS data
        await dispatch(reviewSRSItem({
            itemId: currentItem.id,
            difficulty
        }));

        // Update XP data
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.id) {
            // Khởi tạo XP user nếu chưa có
            let xpUser = xpService.getUserData(currentUser.id);
            if (!xpUser) {
                xpUser = xpService.initializeUser(currentUser.id);
            }

            // Thêm XP cho SRS review
            const action = isCorrect ? 'srsCorrect' : 'srsIncorrect';
            xpService.addXP(currentUser.id, action, {
                itemId: currentItem.id,
                difficulty,
                isCorrect
            });
        }

        // Chuyển sang câu hỏi tiếp theo sau 1 giây
        setTimeout(() => {
            if (currentSession.currentIndex < currentSession.items.length - 1) {
                dispatch(nextReviewItem());
                setSelectedDifficulty(null);
                setShowAnswer(false);
            } else {
                // Kết thúc session
                handleEndReview();
            }
        }, 1000);
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const getDifficultyLabel = (difficulty) => {
        const labels = {
            0: 'Hoàn toàn quên',
            1: 'Rất khó',
            2: 'Khó',
            3: 'Bình thường',
            4: 'Dễ',
            5: 'Rất dễ'
        };
        return labels[difficulty] || '';
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            0: '#ef4444', // Red
            1: '#f97316', // Orange
            2: '#eab308', // Yellow
            3: '#22c55e', // Green
            4: '#3b82f6', // Blue
            5: '#8b5cf6'  // Purple
        };
        return colors[difficulty] || '#6b7280';
    };

    if (loading) {
        return (
            <div className="srs-review">
                <div className="srs-review__loading">
                    <div className="spinner"></div>
                    <p>Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!currentSession.isActive) {
        return (
            <div className="srs-review">
                <div className="srs-review__start">
                    <h2>Ôn tập thông minh</h2>
                    <p>Hệ thống sẽ giúp bạn ôn tập những câu hỏi cần thiết dựa trên thuật toán Spaced Repetition.</p>
                    
                    {dueItems.length > 0 ? (
                        <div className="srs-review__stats">
                            <p>Có <strong>{dueItems.length}</strong> câu hỏi cần ôn tập hôm nay</p>
                            <button 
                                className="srs-review__start-btn"
                                onClick={handleStartReview}
                            >
                                Bắt đầu ôn tập
                            </button>
                        </div>
                    ) : (
                        <div className="srs-review__no-due">
                            <p>🎉 Tuyệt vời! Không có câu hỏi nào cần ôn tập hôm nay.</p>
                            <p>Hãy tiếp tục học bài mới hoặc quay lại sau!</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (!currentItem) {
        return (
            <div className="srs-review">
                <div className="srs-review__error">
                    <p>Không tìm thấy câu hỏi để ôn tập.</p>
                    <button onClick={handleEndReview}>Quay lại</button>
                </div>
            </div>
        );
    }

    return (
        <div className="srs-review">
            <div className="srs-review__header">
                <div className="srs-review__progress">
                    <span>Câu {currentSession.currentIndex + 1} / {currentSession.items.length}</span>
                    <div className="srs-review__progress-bar">
                        <div 
                            className="srs-review__progress-fill"
                            style={{ width: `${((currentSession.currentIndex + 1) / currentSession.items.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <button 
                    className="srs-review__end-btn"
                    onClick={handleEndReview}
                >
                    Kết thúc
                </button>
            </div>

            <div className="srs-review__content">
                <div className="srs-review__question">
                    <h3>Câu hỏi:</h3>
                    <p>{currentItem.metadata?.title || 'Câu hỏi ôn tập'}</p>
                    
                    {currentItem.metadata?.type && (
                        <span className="srs-review__question-type">
                            {currentItem.metadata.type}
                        </span>
                    )}
                </div>

                {!showAnswer && (
                    <div className="srs-review__show-answer">
                        <button 
                            className="srs-review__show-answer-btn"
                            onClick={handleShowAnswer}
                        >
                            Xem đáp án
                        </button>
                    </div>
                )}

                {showAnswer && (
                    <div className="srs-review__answer">
                        <h3>Đáp án:</h3>
                        <p>{currentItem.metadata?.answer || 'Đáp án'}</p>
                    </div>
                )}

                {showAnswer && (
                    <div className="srs-review__difficulty">
                        <h3>Mức độ khó khăn:</h3>
                        <p>Bạn cảm thấy câu hỏi này như thế nào?</p>
                        
                        <div className="srs-review__difficulty-buttons">
                            {[0, 1, 2, 3, 4, 5].map((difficulty) => (
                                <button
                                    key={difficulty}
                                    className={`srs-review__difficulty-btn ${
                                        selectedDifficulty === difficulty ? 'srs-review__difficulty-btn--selected' : ''
                                    }`}
                                    style={{ 
                                        borderColor: getDifficultyColor(difficulty),
                                        backgroundColor: selectedDifficulty === difficulty ? getDifficultyColor(difficulty) : 'transparent',
                                        color: selectedDifficulty === difficulty ? 'white' : getDifficultyColor(difficulty)
                                    }}
                                    onClick={() => handleDifficultySelect(difficulty)}
                                    disabled={selectedDifficulty !== null}
                                >
                                    {difficulty}
                                    <span className="srs-review__difficulty-label">
                                        {getDifficultyLabel(difficulty)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="srs-review__navigation">
                <button
                    className="srs-review__nav-btn"
                    onClick={() => dispatch(previousReviewItem())}
                    disabled={currentSession.currentIndex === 0}
                >
                    ← Trước
                </button>
                
                <span className="srs-review__nav-info">
                    {currentSession.currentIndex + 1} / {currentSession.items.length}
                </span>
                
                <button
                    className="srs-review__nav-btn"
                    onClick={() => dispatch(nextReviewItem())}
                    disabled={currentSession.currentIndex === currentSession.items.length - 1}
                >
                    Sau →
                </button>
            </div>
        </div>
    );
};

export default SRSReview; 