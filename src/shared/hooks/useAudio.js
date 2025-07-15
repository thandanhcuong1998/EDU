import { useEffect, useCallback } from 'react';
import audioService from '@/shared/services/audioService.js';

export const useAudio = () => {
    // Khởi tạo audio service khi component mount
    useEffect(() => {
        audioService.init();
    }, []);

    // Play Japanese word
    const playWord = useCallback(async (word, options = {}) => {
        try {
            await audioService.playJapaneseWord(word, options);
        } catch (error) {
            console.error('Error playing word:', error);
        }
    }, []);

    // Play Japanese sentence
    const playSentence = useCallback(async (sentence, options = {}) => {
        try {
            await audioService.playJapaneseSentence(sentence, options);
        } catch (error) {
            console.error('Error playing sentence:', error);
        }
    }, []);

    // Play UI sound
    const playUISound = useCallback(async (soundType) => {
        try {
            await audioService.playUISound(soundType);
        } catch (error) {
            console.error('Error playing UI sound:', error);
        }
    }, []);

    // Play feedback sound
    const playFeedback = useCallback(async (isCorrect) => {
        try {
            await audioService.playFeedbackSound(isCorrect);
        } catch (error) {
            console.error('Error playing feedback:', error);
        }
    }, []);

    // Stop all audio
    const stopAll = useCallback(() => {
        audioService.stopAllAudio();
    }, []);

    // Get audio settings
    const getAudioSettings = useCallback(() => ({
        isEnabled: audioService.isAudioEnabled(),
        volume: audioService.getVolume()
    }), []);

    return {
        playWord,
        playSentence,
        playUISound,
        playFeedback,
        stopAll,
        getAudioSettings
    };
}; 