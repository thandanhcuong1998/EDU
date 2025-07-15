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

// Import AudioService để sử dụng thay vì có hàm riêng
import audioService from '@/shared/services/audioService.js';

export const playApiAudio = kanaCharacter => {
   if (!kanaCharacter) {
      console.warn('No character provided to play audio.');
      return;
   }

   // Sử dụng AudioService thay vì tạo Audio object trực tiếp
   audioService.playKanaAudio(kanaCharacter);
};
