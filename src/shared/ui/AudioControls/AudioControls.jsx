import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Volume1, Volume } from 'lucide-react';
import audioService from '@/shared/services/audioService.js';
import './AudioControls.scss';

const AudioControls = ({ className = '' }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [volume, setVolume] = useState(0.7);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    useEffect(() => {
        // Load settings từ service
        setIsEnabled(audioService.isAudioEnabled());
        setVolume(audioService.getVolume());
    }, []);

    const handleToggleAudio = () => {
        const newState = audioService.toggleAudio();
        setIsEnabled(newState);
        
        // Phát âm thanh feedback
        if (newState) {
            audioService.playUISound('click');
        }
    };

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        audioService.setVolume(newVolume);
        
        // Phát âm thanh test khi thay đổi volume
        if (isEnabled) {
            audioService.playUISound('click');
        }
    };

    const getVolumeIcon = () => {
        if (!isEnabled) return <VolumeX size={20} />;
        if (volume === 0) return <VolumeX size={20} />;
        if (volume < 0.3) return <Volume size={20} />;
        if (volume < 0.7) return <Volume1 size={20} />;
        return <Volume2 size={20} />;
    };

    const handleVolumeClick = () => {
        if (isEnabled) {
            setShowVolumeSlider(!showVolumeSlider);
        }
    };

    return (
        <div className={`audio-controls ${className}`}>
            {/* Toggle Audio Button */}
            <button
                className={`audio-controls__toggle ${!isEnabled ? 'audio-controls__toggle--disabled' : ''}`}
                onClick={handleToggleAudio}
                title={isEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
                {getVolumeIcon()}
            </button>

            {/* Volume Slider */}
            {isEnabled && (
                <div className="audio-controls__volume-container">
                    <button
                        className="audio-controls__volume-btn"
                        onClick={handleVolumeClick}
                        title="Điều chỉnh âm lượng"
                    >
                        {getVolumeIcon()}
                    </button>
                    
                    {showVolumeSlider && (
                        <div className="audio-controls__volume-slider">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                className="audio-controls__volume-input"
                            />
                            <div className="audio-controls__volume-value">
                                {Math.round(volume * 100)}%
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AudioControls; 