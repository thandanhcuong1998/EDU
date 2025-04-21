// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Nếu bạn dùng Vite hoặc có file index.html ở gốc
    './src/**/*.{js,ts,jsx,tsx}', // Quét tất cả các file JS/TS/JSX/TSX trong thư mục src
  ],
  theme: {
    extend: {
      // Bạn có thể mở rộng theme ở đây (ví dụ: thêm màu sắc, font chữ tùy chỉnh)
      // Ví dụ tích hợp biến CSS màu của bạn:
      colors: {
        primary: 'rgb(var(--primary-color) / <alpha-value>)',
        'primary-light': 'rgb(var(--primary-color-light) / <alpha-value>)',
        success: 'rgb(var(--success-color) / <alpha-value>)',
        danger: 'rgb(var(--false) / <alpha-value>)',
        'slate-gray': 'rgb(var(--slate-gray) / <alpha-value>)',
      },
      fontFamily: {
        vietnam: ['"Be Vietnam Pro"', 'sans-serif'],
        japanese: ['"Noto Sans JP"', 'sans-serif'],
      },
      // --- (Tùy chọn) Tích hợp font size ---
      fontSize: {
        'title-desktop': '48px', // Nếu bạn vẫn muốn dùng biến CSS
        // Hoặc định nghĩa trực tiếp: 'title-desktop': '48px',
      },
    },
  },
  plugins: [],
};
