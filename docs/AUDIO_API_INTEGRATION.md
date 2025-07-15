# Audio API Integration

## Tổng quan

Ứng dụng học tiếng Nhật đã được tích hợp với API audio chất lượng cao để phát âm thanh tiếng Nhật với giọng đọc tự nhiên và chính xác.

## API Configuration

### Environment Variables

```bash
VITE_AUDIO_API_URL=https://proxy.junookyo.workers.dev/
```

### Default Configuration

Nếu không có environment variable, ứng dụng sẽ sử dụng URL mặc định:
- **API URL**: `https://proxy.junookyo.workers.dev/`

## API Parameters

### Required Parameters

- `language`: Ngôn ngữ (mặc định: `ja-JP`)
- `text`: Văn bản cần đọc
- `speed`: Tốc độ đọc (mặc định: `1`)

### Example API Call

```
GET https://proxy.junookyo.workers.dev/?language=ja-JP&text=こんにちは&speed=1
```

## AudioService Methods

### 1. playApiAudio(text, options)
Phát âm thanh từ API với các tùy chọn:

```javascript
await audioService.playApiAudio('こんにちは', {
    lang: 'ja-JP',
    speed: '0.8',
    volume: 0.7
});
```

### 2. playKanaAudio(kanaCharacter, options)
Phát âm thanh cho ký tự kana:

```javascript
await audioService.playKanaAudio('あ', {
    speed: '1',
    volume: 0.5
});
```

### 3. playJapaneseWord(word, options)
Phát âm thanh cho từ vựng:

```javascript
await audioService.playJapaneseWord('ありがとう', {
    speed: '0.8',
    volume: 0.6
});
```

### 4. playJapaneseSentence(sentence, options)
Phát âm thanh cho câu hoàn chỉnh:

```javascript
await audioService.playJapaneseSentence('おはようございます', {
    speed: '0.7',
    volume: 0.5
});
```

### 5. playFeedbackSound(isCorrect)
Phát âm thanh phản hồi:

```javascript
await audioService.playFeedbackSound(true); // 正解です
await audioService.playFeedbackSound(false); // 不正解です
```

### 6. playUISound(soundType)
Phát âm thanh UI:

```javascript
await audioService.playUISound('click'); // クリック
await audioService.playUISound('success'); // 成功
```

## Speed Options

- `'0.5'`: Rất chậm (cho người mới học)
- `'0.7'`: Chậm (cho câu hoàn chỉnh)
- `'0.8'`: Trung bình chậm (cho từ vựng)
- `'1.0'`: Bình thường (mặc định)
- `'1.2'`: Nhanh
- `'1.5'`: Rất nhanh

## Fallback System

Nếu API không hoạt động, AudioService sẽ tự động fallback về Web Speech API:

```javascript
// Ưu tiên: API của bạn
await audioService.playApiAudio('こんにちは');

// Fallback: Web Speech API (nếu API không hoạt động)
// Tự động chuyển sang SpeechSynthesis
```

## Caching

AudioService có hệ thống cache để tối ưu hiệu suất:

- Cache audio files theo URL
- Tự động quản lý memory
- Clear cache khi cần thiết

## Error Handling

```javascript
try {
    await audioService.playApiAudio('こんにちは');
} catch (error) {
    console.error('Audio playback failed:', error);
    // Fallback to Web Speech API
}
```

## Usage Examples

### Trong Components

```javascript
import audioService from '@/shared/services/audioService.js';

// Phát âm thanh khi click
const handleClick = async () => {
    await audioService.playUISound('click');
};

// Phát âm thanh cho từ vựng
const handleWordClick = async (word) => {
    await audioService.playJapaneseWord(word);
};
```

### Trong Hooks

```javascript
import { useEffect } from 'react';
import audioService from '@/shared/services/audioService.js';

const useAudioFeedback = (isCorrect) => {
    useEffect(() => {
        if (isCorrect !== null) {
            audioService.playFeedbackSound(isCorrect);
        }
    }, [isCorrect]);
};
```

## Performance Optimization

1. **Caching**: Audio files được cache để tránh tải lại
2. **Volume Control**: Kiểm soát âm lượng để tránh quá to
3. **Error Recovery**: Tự động fallback khi có lỗi
4. **Memory Management**: Tự động dọn dẹp audio objects

## Troubleshooting

### Lỗi thường gặp

1. **API không phản hồi**: Kiểm tra network connection
2. **Audio không phát**: Kiểm tra browser permissions
3. **Chất lượng âm thanh kém**: Điều chỉnh speed parameter

### Debug

```javascript
// Enable logging
environment.log('Audio API URL:', environment.audioApiUrl);

// Check audio service status
console.log('Audio enabled:', audioService.isAudioEnabled());
console.log('Audio volume:', audioService.getVolume());
```

## Migration từ Web Speech API

Nếu bạn muốn chuyển từ Web Speech API sang API này:

1. Thay thế `playTextToSpeech()` bằng `playApiAudio()`
2. Cập nhật parameters từ `rate` sang `speed`
3. Test fallback system

## Future Enhancements

- [ ] Support cho nhiều giọng đọc
- [ ] Custom audio effects
- [ ] Background audio processing
- [ ] Audio analytics
- [ ] Offline audio caching 