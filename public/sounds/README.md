# Audio Files Directory

## Tổng quan

Thư mục này dành cho các file âm thanh tĩnh (nếu cần). Tuy nhiên, ứng dụng hiện tại đã được tích hợp với API audio chất lượng cao.

## Audio System

### API Integration (Khuyến nghị)

Ứng dụng sử dụng API audio với URL: `https://proxy.junookyo.workers.dev/`

**Ưu điểm:**
- Giọng đọc tiếng Nhật tự nhiên và chính xác
- Không cần quản lý file âm thanh
- Tự động fallback khi có lỗi
- Cache tự động để tối ưu hiệu suất

### Static Audio Files (Tùy chọn)

Nếu bạn muốn sử dụng file âm thanh tĩnh, có thể thêm vào thư mục này:

```
sounds/
├── ui/
│   ├── click.mp3
│   ├── hover.mp3
│   ├── success.mp3
│   └── notification.mp3
├── feedback/
│   ├── correct.mp3
│   └── incorrect.mp3
└── vocabulary/
    ├── greetings/
    └── numbers/
```

## Usage

### Sử dụng API (Mặc định)

```javascript
import audioService from '@/shared/services/audioService.js';

// Phát âm thanh từ API
await audioService.playApiAudio('こんにちは');
await audioService.playJapaneseWord('ありがとう');
await audioService.playFeedbackSound(true);
```

### Sử dụng File (Nếu có)

```javascript
// Chỉ khi có file âm thanh
await audioService.playAudio('/sounds/ui/click.mp3');
```

## Configuration

API audio được cấu hình trong `src/config/env.js`:

```javascript
audioApiUrl: import.meta.env.VITE_AUDIO_API_URL || 'https://proxy.junookyo.workers.dev/'
```

## Fallback System

1. **Ưu tiên**: API audio của bạn
2. **Fallback**: Web Speech API (nếu API không hoạt động)
3. **Cuối cùng**: Static files (nếu có)

## Performance

- Audio được cache tự động
- Không cần tải file lớn
- Tối ưu cho mobile devices
- Memory management tự động

## Troubleshooting

Nếu gặp vấn đề với audio:

1. Kiểm tra network connection
2. Xem console logs
3. Test API endpoint trực tiếp
4. Kiểm tra browser permissions

## Migration

Nếu chuyển từ static files sang API:

1. Cập nhật AudioService calls
2. Test fallback system
3. Remove unused audio files
4. Update documentation 