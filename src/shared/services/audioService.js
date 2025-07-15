/**
 * Audio service for playing sounds in the application
 */

import environment from '@/config/env.js';

class AudioService {
    constructor() {
        this.audioContext = null;
        this.audioCache = new Map();
        this.isEnabled = true;
        this.volume = 0.7;
        this.currentAudio = null;
        this.apiUrl = environment.audioApiUrl;
    }

    // Khởi tạo audio context
    init() {
        if (typeof window !== 'undefined' && window.AudioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // Bật/tắt âm thanh
    toggleAudio() {
        this.isEnabled = !this.isEnabled;
        localStorage.setItem('audioEnabled', this.isEnabled);
        return this.isEnabled;
    }

    // Đặt âm lượng
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('audioVolume', this.volume);
    }

    // Lấy âm lượng hiện tại
    getVolume() {
        return this.volume;
    }

    // Kiểm tra trạng thái âm thanh
    isAudioEnabled() {
        return this.isEnabled;
    }

    // Phát âm thanh từ URL
    async playAudio(url, options = {}) {
        if (!this.isEnabled || !url) return;

        try {
            // Dừng âm thanh hiện tại nếu có
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio = null;
            }

            // Kiểm tra cache
            if (this.audioCache.has(url)) {
                const audio = this.audioCache.get(url);
                audio.currentTime = 0;
                audio.volume = options.volume || this.volume;
                await audio.play();
                this.currentAudio = audio;
                return;
            }

            // Tạo audio mới
            const audio = new Audio(url);
            audio.volume = options.volume || this.volume;
            
            // Cache audio
            this.audioCache.set(url, audio);
            
            // Phát âm thanh
            await audio.play();
            this.currentAudio = audio;

            // Xử lý khi kết thúc
            audio.onended = () => {
                this.currentAudio = null;
            };

        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    // Phát âm thanh từ text sử dụng API của bạn
    async playTextToSpeech(text, options = {}) {
        if (!this.isEnabled || !text) return;

        try {
            // Sử dụng API của bạn thay vì Web Speech API
            const parameters = new URLSearchParams({
                language: options.lang || 'ja-JP',
                text: text,
                speed: options.rate ? (1 / options.rate).toString() : '1', // Chuyển đổi rate thành speed
            });

            const apiUrl = `${this.apiUrl}?${parameters.toString()}`;
            
            // Dừng âm thanh hiện tại nếu có
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio = null;
            }

            // Kiểm tra cache
            if (this.audioCache.has(apiUrl)) {
                const audio = this.audioCache.get(apiUrl);
                audio.currentTime = 0;
                audio.volume = options.volume || this.volume;
                await audio.play();
                this.currentAudio = audio;
                return;
            }

            // Tạo audio mới từ API
            const audio = new Audio(apiUrl);
            audio.volume = options.volume || this.volume;
            
            // Cache audio
            this.audioCache.set(apiUrl, audio);
            
            // Phát âm thanh
            await audio.play();
            this.currentAudio = audio;

            // Xử lý khi kết thúc
            audio.onended = () => {
                this.currentAudio = null;
            };

        } catch (error) {
            console.error('Error with API text-to-speech:', error);
            // Fallback to Web Speech API nếu API của bạn không hoạt động
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = options.lang || 'ja-JP';
                utterance.rate = options.rate || 0.8;
                utterance.pitch = options.pitch || 1;
                utterance.volume = options.volume || this.volume;
                window.speechSynthesis.speak(utterance);
            }
        }
    }

    // Method tương thích với playApiAudio trong util.jsx
    async playKanaAudio(kanaCharacter, options = {}) {
        if (!kanaCharacter) {
            console.warn('No character provided to play audio.');
            return;
        }

        await this.playApiAudio(kanaCharacter, {
            lang: 'ja-JP',
            speed: '1',
            ...options
        });
    }

    // Method mới để phát âm thanh từ API của bạn (tương tự như playApiAudio trong util.jsx)
    async playApiAudio(text, options = {}) {
        if (!this.isEnabled || !text) return;

        try {
            const parameters = new URLSearchParams({
                language: options.lang || 'ja-JP',
                text: text,
                speed: options.speed || '1',
            });

            const apiUrl = `${this.apiUrl}?${parameters.toString()}`;
            
            // Dừng âm thanh hiện tại nếu có
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio = null;
            }

            // Tạo audio mới
            const audio = new Audio(apiUrl);
            audio.volume = options.volume || this.volume;
            
            // Phát âm thanh
            await audio.play();
            this.currentAudio = audio;

            // Xử lý khi kết thúc
            audio.onended = () => {
                this.currentAudio = null;
            };

        } catch (error) {
            console.error('Error playing audio from API:', error);
        }
    }

    // Phát âm thanh cho từ vựng tiếng Nhật
    async playJapaneseWord(word, options = {}) {
        if (!word) return;

        // Ưu tiên sử dụng audio file nếu có
        const audioUrl = options.audioUrl;
        if (audioUrl) {
            await this.playAudio(audioUrl, options);
            return;
        }

        // Sử dụng API của bạn cho từ vựng tiếng Nhật
        await this.playApiAudio(word, {
            lang: 'ja-JP',
            speed: '0.8', // Tốc độ chậm hơn cho từ vựng
            ...options
        });
    }

    // Phát âm thanh cho câu hoàn chỉnh
    async playJapaneseSentence(sentence, options = {}) {
        if (!sentence) return;

        await this.playApiAudio(sentence, {
            lang: 'ja-JP',
            speed: '0.7', // Tốc độ chậm hơn cho câu hoàn chỉnh
            ...options
        });
    }

    // Phát âm thanh phản hồi (đúng/sai)
    async playFeedbackSound(isCorrect) {
        // Sử dụng API của bạn cho feedback sounds
        const message = isCorrect ? '正解です' : '不正解です';
        await this.playApiAudio(message, { 
            lang: 'ja-JP', 
            volume: 0.5,
            speed: '0.8' 
        });
    }

    // Phát âm thanh UI (click, hover, etc.)
    async playUISound(soundType) {
        // Sử dụng API của bạn cho UI sounds
        const soundMap = {
            click: 'クリック',
            hover: 'ホバー',
            success: '成功',
            notification: '通知'
        };

        const message = soundMap[soundType];
        if (message) {
            await this.playApiAudio(message, { 
                lang: 'ja-JP', 
                volume: 0.2,
                speed: '1.0' 
            });
        }
    }

    // Dừng tất cả âm thanh
    stopAllAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        
        // Vẫn giữ fallback cho Web Speech API nếu cần
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }

    // Xóa cache
    clearCache() {
        this.audioCache.clear();
    }

    // Load settings từ localStorage
    loadSettings() {
        const audioEnabled = localStorage.getItem('audioEnabled');
        const audioVolume = localStorage.getItem('audioVolume');
        
        if (audioEnabled !== null) {
            this.isEnabled = JSON.parse(audioEnabled);
        }
        
        if (audioVolume !== null) {
            this.volume = parseFloat(audioVolume);
        }
    }
}

// Tạo instance singleton
const audioService = new AudioService();

// Khởi tạo khi module được load
if (typeof window !== 'undefined') {
    audioService.init();
    audioService.loadSettings();
}

export default audioService;
