import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSRSStats, selectSRSStats, selectSRSLoading } from '../state/srsSlice.js';
import { TrendingUp, Clock, CheckCircle, XCircle, Target, RefreshCw } from 'lucide-react';
import './SRSStats.scss';

const SRSStats = () => {
    const dispatch = useDispatch();
    const stats = useSelector(selectSRSStats);
    const loading = useSelector(selectSRSLoading);

    useEffect(() => {
        dispatch(loadSRSStats());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="srs-stats">
                <div className="srs-stats__loading">
                    <div className="spinner"></div>
                    <p>Đang tải thống kê...</p>
                </div>
            </div>
        );
    }

    const formatNumber = (num) => {
        return num.toLocaleString('vi-VN');
    };

    const getAccuracyColor = (accuracy) => {
        if (accuracy >= 90) return '#22c55e'; // Green
        if (accuracy >= 70) return '#eab308'; // Yellow
        return '#ef4444'; // Red
    };

    return (
        <div className="srs-stats">
            <h3 className="srs-stats__title">Thống kê học tập</h3>
            
            <div className="srs-stats__grid">
                {/* Tổng số items */}
                <div className="srs-stats__card">
                    <div className="srs-stats__card-icon">
                        <Target size={24} />
                    </div>
                    <div className="srs-stats__card-content">
                        <h4>Tổng cộng</h4>
                        <p className="srs-stats__card-value">{formatNumber(stats.totalItems)}</p>
                        <span className="srs-stats__card-label">câu hỏi</span>
                    </div>
                </div>

                {/* Items mới */}
                <div className="srs-stats__card">
                    <div className="srs-stats__card-icon srs-stats__card-icon--new">
                        <TrendingUp size={24} />
                    </div>
                    <div className="srs-stats__card-content">
                        <h4>Mới</h4>
                        <p className="srs-stats__card-value">{formatNumber(stats.newItems)}</p>
                        <span className="srs-stats__card-label">câu hỏi</span>
                    </div>
                </div>

                {/* Đang học */}
                <div className="srs-stats__card">
                    <div className="srs-stats__card-icon srs-stats__card-icon--learning">
                        <Clock size={24} />
                    </div>
                    <div className="srs-stats__card-content">
                        <h4>Đang học</h4>
                        <p className="srs-stats__card-value">{formatNumber(stats.learningItems)}</p>
                        <span className="srs-stats__card-label">câu hỏi</span>
                    </div>
                </div>

                {/* Đang ôn tập */}
                <div className="srs-stats__card">
                    <div className="srs-stats__card-icon srs-stats__card-icon--reviewing">
                        <RefreshCw size={24} />
                    </div>
                    <div className="srs-stats__card-content">
                        <h4>Ôn tập</h4>
                        <p className="srs-stats__card-value">{formatNumber(stats.reviewingItems)}</p>
                        <span className="srs-stats__card-label">câu hỏi</span>
                    </div>
                </div>

                {/* Độ chính xác */}
                <div className="srs-stats__card srs-stats__card--accuracy">
                    <div className="srs-stats__card-icon srs-stats__card-icon--accuracy">
                        <CheckCircle size={24} />
                    </div>
                    <div className="srs-stats__card-content">
                        <h4>Độ chính xác</h4>
                        <p 
                            className="srs-stats__card-value"
                            style={{ color: getAccuracyColor(stats.accuracy) }}
                        >
                            {stats.accuracy.toFixed(1)}%
                        </p>
                        <span className="srs-stats__card-label">
                            {formatNumber(stats.correctReviews)} / {formatNumber(stats.totalReviews)} đúng
                        </span>
                    </div>
                </div>

                {/* Cần ôn tập hôm nay */}
                <div className="srs-stats__card srs-stats__card--due">
                    <div className="srs-stats__card-icon srs-stats__card-icon--due">
                        <Clock size={24} />
                    </div>
                    <div className="srs-stats__card-content">
                        <h4>Cần ôn tập</h4>
                        <p className="srs-stats__card-value">{formatNumber(stats.dueItems)}</p>
                        <span className="srs-stats__card-label">câu hỏi hôm nay</span>
                    </div>
                </div>
            </div>

            {/* Progress bars */}
            <div className="srs-stats__progress">
                <h4>Tiến độ học tập</h4>
                
                <div className="srs-stats__progress-item">
                    <div className="srs-stats__progress-label">
                        <span>Đã học</span>
                        <span>{stats.totalItems - stats.newItems} / {stats.totalItems}</span>
                    </div>
                    <div className="srs-stats__progress-bar">
                        <div 
                            className="srs-stats__progress-fill"
                            style={{ 
                                width: `${stats.totalItems > 0 ? ((stats.totalItems - stats.newItems) / stats.totalItems) * 100 : 0}%` 
                            }}
                        ></div>
                    </div>
                </div>

                <div className="srs-stats__progress-item">
                    <div className="srs-stats__progress-label">
                        <span>Đã ôn tập</span>
                        <span>{stats.reviewingItems} / {stats.totalItems}</span>
                    </div>
                    <div className="srs-stats__progress-bar">
                        <div 
                            className="srs-stats__progress-fill srs-stats__progress-fill--reviewing"
                            style={{ 
                                width: `${stats.totalItems > 0 ? (stats.reviewingItems / stats.totalItems) * 100 : 0}%` 
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SRSStats; 