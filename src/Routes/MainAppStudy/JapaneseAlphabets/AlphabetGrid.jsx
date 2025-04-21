// src/components/AlphabetGrid.js
import React from 'react'; // Bỏ useEffect, useState nếu không dùng nữa
import './Alphabet.css';
import { playApiAudio } from '../../../Helpers/util.jsx';

const AlphabetGrid = ({ characters }) => {
   return (
      <div className="grid grid-cols-5 gap-2 md:gap-3">
         {characters.map((char, index) =>
            char ? (
               // Ô chứa chữ cái (dùng button)
               <button
                  key={`${char.kana}-${index}`}
                  // Styling cho button:
                  // - flex, flex-col, items-center, justify-center: Căn giữa nội dung theo cả 2 chiều
                  // - p-2: Padding
                  // - border, border-gray-300, rounded-md: Đường viền và bo góc
                  // - bg-white: Nền trắng
                  // - min-h-[60px] md:min-h-[75px]: Chiều cao tối thiểu, responsive
                  // - hover:bg-gray-100: Hiệu ứng khi rê chuột
                  // - active:scale-95: Hiệu ứng khi nhấn
                  // - transition-all, duration-100: Hiệu ứng chuyển động mượt mà
                  // - focus:outline-none, focus:ring-2, focus:ring-indigo-500: Style khi focus (quan trọng cho accessibility)
                  className="alb text-white flex flex-col items-center justify-center p-2 border border-gray-300 rounded-md bg-white min-h-[60px] md:min-h-[75px] hover:bg-gray-100 active:scale-95 transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 shadow-sm hover:shadow"
                  onClick={() => playApiAudio(char.kana)}
                  aria-label={`Phát âm ${char.kana} (${char.romaji})`}
               >
                  {/* Ký tự Kana */}
                  {/* Tăng kích thước chữ, đổi màu, đảm bảo font hỗ trợ tiếng Nhật */}
                  <span
                     className="text-2xl md:text-3xl font-medium text-gray-900"
                     lang="ja"
                  >
                     {char.kana}
                  </span>
                  {/* Romaji */}
                  {/* Chữ nhỏ hơn, màu xám hơn */}
                  <span className="text-xs text-gray-500 uppercase">
                     {char.romaji}
                  </span>
               </button>
            ) : (
               // Ô trống (placeholder)
               // Nền nhạt hơn, không có hiệu ứng hover/active
               <div
                  key={`empty-${index}`}
                  className="border border-transparent rounded-md bg-gray-50 min-h-[60px] md:min-h-[75px]"
               ></div>
            )
         )}
      </div>
   );
};

export default AlphabetGrid;
