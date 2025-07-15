# Environment Setup

## Vite Environment Variables

Ứng dụng sử dụng Vite, vì vậy tất cả environment variables phải có prefix `VITE_`.

### Tạo file .env

Tạo file `.env` trong thư mục root của project:

```bash
# API URLs
VITE_API_URL=https://api.japanese-edu.com
VITE_AUDIO_API_URL=https://proxy.junookyo.workers.dev/

# Environment
VITE_ENV=development

# Feature Flags
VITE_ENABLE_LOGGING=true
VITE_ENABLE_MOCK_DATA=false
```

### Sử dụng trong code

```javascript
// ✅ Đúng - Sử dụng import.meta.env
const apiUrl = import.meta.env.VITE_API_URL;

// ❌ Sai - process.env không hoạt động trong Vite
const apiUrl = process.env.REACT_APP_API_URL;
```

### Environment Variables có sẵn

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Main API URL | `https://api.japanese-edu.com` |
| `VITE_AUDIO_API_URL` | Audio API URL | `https://proxy.junookyo.workers.dev/` |
| `VITE_ENV` | Environment | `development` |
| `VITE_ENABLE_LOGGING` | Enable console logging | `false` |
| `VITE_ENABLE_MOCK_DATA` | Use mock data | `false` |

### Development vs Production

```bash
# Development
VITE_ENV=development
VITE_ENABLE_LOGGING=true
VITE_ENABLE_MOCK_DATA=true

# Production
VITE_ENV=production
VITE_ENABLE_LOGGING=false
VITE_ENABLE_MOCK_DATA=false
```

### Troubleshooting

1. **Lỗi "process is not defined"**
   - Đảm bảo sử dụng `import.meta.env` thay vì `process.env`
   - Kiểm tra prefix `VITE_` cho tất cả variables

2. **Environment variables không load**
   - Restart dev server sau khi thay đổi .env
   - Kiểm tra syntax trong file .env

3. **Variables không có sẵn trong browser**
   - Chỉ variables có prefix `VITE_` mới được expose ra browser
   - Variables khác chỉ có sẵn trong build process 