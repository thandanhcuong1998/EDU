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
