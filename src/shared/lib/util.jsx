// Hàm để tạo khoảng trắng
export const createSpaces = number_ => ' '.repeat(number_); // Tạo khoảng trắng bằng cách lặp lại

export const isObject = object => {
   return object !== null && typeof object === 'object';
};

export const isArray = array => {
   return Array.isArray(array);
};

export const isEmpty = value => {
   return value === null || value === undefined || value === '';
};

export const deepClone = object => {
   // Kiểm tra kiểu dữ liệu
   if (object === null || typeof object !== 'object') {
      return object; // Trả về giá trị nguyên thủy
   }

   // Tạo một mảng hoặc đối tượng mới
   const clone = Array.isArray(object) ? [] : {};

   // Duyệt qua từng thuộc tính của đối tượng
   for (const key in object) {
      if (object.hasOwnProperty(key)) {
         clone[key] = deepClone(object[key]); // Đệ quy để sao chép sâu
      }
   }

   return clone;
};

export const arraysEqual = (array1, array2) => {
   // Kiểm tra độ dài của hai mảng
   if (array1.length !== array2.length) {
      return false;
   }

   // So sánh từng phần tử của hai mảng
   for (let index = 0; index < array1.length; index++) {
      if (array1[index] !== array2[index]) {
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
   const parameters = new URLSearchParams({
      language: 'ja-JP',
      text: kanaCharacter, // Ký tự kana cần đọc
      speed: '1', // Tốc độ bạn đã cung cấp
   });

   // Tạo URL đầy đủ
   const apiUrl = `${baseApiUrl}?${parameters.toString()}`;
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
