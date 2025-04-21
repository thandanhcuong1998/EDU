// Hàm để tạo khoảng trắng
export const createSpaces = num => ' '.repeat(num); // Tạo khoảng trắng bằng cách lặp lại

export const isObject = obj => {
   return obj !== null && typeof obj === 'object';
};

export const isArray = arr => {
   return Array.isArray(arr);
};

export const isEmpty = value => {
   return value === null || value === undefined || value === '';
};

export const deepClone = obj => {
   // Kiểm tra kiểu dữ liệu
   if (obj === null || typeof obj !== 'object') {
      return obj; // Trả về giá trị nguyên thủy
   }

   // Tạo một mảng hoặc đối tượng mới
   const clone = Array.isArray(obj) ? [] : {};

   // Duyệt qua từng thuộc tính của đối tượng
   for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
         clone[key] = deepClone(obj[key]); // Đệ quy để sao chép sâu
      }
   }

   return clone;
};

export const arraysEqual = (arr1, arr2) => {
   // Kiểm tra độ dài của hai mảng
   if (arr1.length !== arr2.length) {
      return false;
   }

   // So sánh từng phần tử của hai mảng
   for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
         return false;
      }
   }

   return true;
};

export const playApiAudio = kanaCharacter => {
   if (!kanaCharacter) {
      console.warn('No character provided to play audio.');
      return;
   }

   // --- Sử dụng API bạn cung cấp ---
   const baseApiUrl = 'https://proxy.junookyo.workers.dev/';
   const params = new URLSearchParams({
      language: 'ja-JP',
      text: kanaCharacter, // Ký tự kana cần đọc
      speed: '1', // Tốc độ bạn đã cung cấp
   });

   // Tạo URL đầy đủ
   const apiUrl = `${baseApiUrl}?${params.toString()}`;
   console.log('Playing audio from:', apiUrl); // Log URL để kiểm tra

   // Tạo đối tượng Audio và phát
   try {
      const audio = new Audio(apiUrl);
      audio.play().catch(error => {
         console.error('Error playing audio from API:', error);
         // Có thể thông báo lỗi cho người dùng nếu cần
         alert(
            `Không thể phát âm thanh cho "${kanaCharacter}". Có lỗi xảy ra hoặc API không phản hồi.`
         );
      });
   } catch (error) {
      console.error('Error creating Audio object:', error);
      alert(`Có lỗi khi tạo đối tượng Audio cho "${kanaCharacter}".`);
   }
};
