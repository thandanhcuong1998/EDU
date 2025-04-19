import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../../../../../Redux/Reducers/LessionQuestionChoiceReducer.jsx';

// Hằng số cho thời gian
const FEEDBACK_DURATION_MS = 300;
const INITIAL_CHECK_DELAY_MS = 200; // Xem xét có cần delay này không

export default function MappingWord({ listConfigQuestion, classRoot }) {
   const dispatch = useDispatch();

   const [activeOptions, setActiveOptions] = useState({
      option1: null,
      option2: null,
   });

   // Khởi tạo state options một lần duy nhất khi component mount hoặc props thay đổi
   const [optionsState, setOptionsState] = useState(() => ({
      // Dùng lazy initializer
      options1: listConfigQuestion.options1.map(option => ({
         ...option,
         isCorrect: false,
      })),
      options2: listConfigQuestion.options2.map(option => ({
         ...option,
         isCorrect: false,
      })),
   }));

   const [showError, setShowError] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);
   const [zoomClass, setZoomClass] = useState({ option1: '', option2: '' });
   const currentQuestionIndex = useSelector(
      state => state.LessionQuestionChoice.currentQuestionIndex
   );

   //  --- hàm xử lý chọn ---
   const onHandleSelected = useCallback(
      (typeOption, index) => {
         // Dùng useCallback nếu hàm này được truyền xuống component con
         // Ngăn chọn lại item đã đúng
         if (
            (typeOption === 'option1' &&
               optionsState.options1[index]?.isCorrect) ||
            (typeOption === 'option2' &&
               optionsState.options2[index]?.isCorrect)
         ) {
            return;
         }

         setActiveOptions(prev => ({ ...prev, [typeOption]: index }));

         // Xử lý zoom (nếu vẫn giữ state zoomClass)
         setZoomClass(prev => ({ ...prev, [typeOption]: index }));
         setTimeout(() => {
            setZoomClass(prev => ({ ...prev, [typeOption]: '' }));
         }, FEEDBACK_DURATION_MS);
      },
      [optionsState]
   ); // Thêm dependency

   // --- Hàm xử lý khi cặp sai ---
   const handleIncorrectPair = useCallback(() => {
      // *** SỬA: Tắt thông báo thành công (nếu có) ngay lập tức ***
      setShowSuccess(false);
      setShowError(true);
      setActiveOptions({ option1: null, option2: null });
      const timer = setTimeout(() => {
         setShowError(false);
      }, FEEDBACK_DURATION_MS);
      return timer;
   }, []);

   // --- Hàm xử lý khi cặp đúng ---
   const handleCorrectPair = useCallback((option1Index, option2Index) => {
      // *** SỬA: Tắt thông báo lỗi (nếu có) ngay lập tức ***
      setShowError(false);
      setShowSuccess(true);
      setActiveOptions({ option1: null, option2: null }); // Reset ngay

      setOptionsState(prevState => ({
         options1: prevState.options1.map((opt, idx) => ({
            ...opt,
            isCorrect: opt.isCorrect || idx === option1Index,
         })),
         options2: prevState.options2.map((opt, idx) => ({
            ...opt,
            isCorrect: opt.isCorrect || idx === option2Index,
         })),
      }));

      const timer = setTimeout(() => {
         setShowSuccess(false);
      }, FEEDBACK_DURATION_MS);
      return timer;
   }, []);

   // --- useEffect chính xử lý kiểm tra cặp ---
   useEffect(() => {
      const { option1, option2 } = activeOptions;

      if (option1 !== null && option2 !== null) {
         const correctIndexOption2 =
            optionsState.options1[option1]?.indexCorrect - 1;
         const isPairCorrect = correctIndexOption2 === option2;

         let cleanupTimer;
         if (isPairCorrect) {
            cleanupTimer = handleCorrectPair(option1, option2);
         } else {
            cleanupTimer = handleIncorrectPair();
         }
         return () => clearTimeout(cleanupTimer);
      }
   }, [
      activeOptions,
      handleCorrectPair,
      handleIncorrectPair,
      optionsState.options1,
   ]);

   // --- useEffect kiểm tra hoàn thành ---
   useEffect(() => {
      const isAllCorrect = optionsState.options1.every(item => item.isCorrect);
      if (isAllCorrect) {
         dispatch(setAnswer({ type: classRoot, index: currentQuestionIndex }));
      }
   }, [optionsState.options1, dispatch, classRoot, currentQuestionIndex]);

   return (
      <div
         className={`${classRoot} d-flex justify-content-start flex-column align-items-start`}
      >
         <h3 className="text-white">{listConfigQuestion.title}</h3>
         <div className="content-answer d-flex justify-content-between align-items-center">
            {/* List Answer 1 */}
            <ul className="list-answer">
               {optionsState.options1.map((item, index) => {
                  // Xác định các class dựa trên state
                  const isActive = activeOptions.option1 === index;
                  const isSuccess = optionsState.options1[index]?.isCorrect;
                  const isError = showError && isActive;
                  const isZooming = zoomClass.option1 === index; // Nếu dùng state zoom

                  return (
                     <li
                        onClick={() => onHandleSelected('option1', index)}
                        key={`opt1-${index}`} // Key nên rõ ràng hơn
                        className={`d-flex justify-content-between align-items-center ${isActive ? 'active-mapping' : ''} ${isError ? 'error-option' : ''} ${isSuccess ? 'success-option' : ''} ${isZooming ? 'zoom-in' : ''}`}
                     >
                        <span className={`index-answer`}>{index + 1}</span>
                        <ruby>
                           {item.text}
                           <rp>(</rp>
                           <rt>{item?.pronunciation}</rt>
                           <rp>)</rp>
                        </ruby>
                        <span></span>
                     </li>
                  );
               })}
            </ul>
            {/* List Answer 2 */}
            <ul className="list-answer2 options2">
               {optionsState.options2.map((item, index) => {
                  const isActive = activeOptions.option2 === index;
                  const isSuccess = optionsState.options2[index]?.isCorrect;
                  const isError = showError && isActive;
                  const isZooming = zoomClass.option2 === index;

                  return (
                     <li
                        onClick={() => onHandleSelected('option2', index)}
                        key={`opt2-${index}`}
                        className={`d-flex justify-content-between align-items-center ${isActive ? 'active-mapping' : ''} ${isError ? 'error-option' : ''} ${isSuccess ? 'success-option' : ''} ${isZooming ? 'zoom-in' : ''}`}
                     >
                        <span className={`index-answer`}>{index + 1}</span>
                        {item.text}
                        <span></span>
                     </li>
                  );
               })}
            </ul>
         </div>
         {showSuccess && (
            <div className="success-message success">Correct!</div>
         )}
         {showError && <div className="error-message isFail">Incorrect!</div>}
      </div>
   );
}
