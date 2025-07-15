import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotifications, removeNotification } from '../state/xpSlice.js';
import { X, Star, TrendingUp, Trophy } from 'lucide-react';
import './XPNotifications.scss';

const XPNotifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotifications);
    const [visibleNotifications, setVisibleNotifications] = useState([]);

    useEffect(() => {
        // Hiển thị notifications mới
        if (notifications.length > 0) {
            const latestNotification = notifications[0];
            setVisibleNotifications(prev => [latestNotification, ...prev.slice(0, 2)]);
        }
    }, [notifications]);

    const handleRemoveNotification = (id) => {
        dispatch(removeNotification(id));
        setVisibleNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'xp_gain':
                return <Star size={16} />;
            case 'level_up':
                return <TrendingUp size={16} />;
            case 'achievement':
                return <Trophy size={16} />;
            default:
                return <Star size={16} />;
        }
    };

    const getNotificationClass = (type) => {
        switch (type) {
            case 'xp_gain':
                return 'xp-notification--xp-gain';
            case 'level_up':
                return 'xp-notification--level-up';
            case 'achievement':
                return 'xp-notification--achievement';
            default:
                return '';
        }
    };

    if (visibleNotifications.length === 0) {
        return null;
    }

    return (
        <div className="xp-notifications">
            {visibleNotifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`xp-notification ${getNotificationClass(notification.type)}`}
                >
                    <div className="xp-notification__icon">
                        {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="xp-notification__content">
                        <p className="xp-notification__message">
                            {notification.message}
                        </p>
                    </div>
                    
                    <button
                        className="xp-notification__close"
                        onClick={() => handleRemoveNotification(notification.id)}
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default XPNotifications; 