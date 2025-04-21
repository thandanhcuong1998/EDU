// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './index.html', // Nếu bạn dùng Vite hoặc có file index.html ở gốc
      './src/**/*.{js,ts,jsx,tsx}', // Quét tất cả các file JS/TS/JSX/TSX trong thư mục src
   ],
   theme: {
      extend: {
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
