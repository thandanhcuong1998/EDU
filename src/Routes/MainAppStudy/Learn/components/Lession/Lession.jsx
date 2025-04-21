import ProgressBar from 'react-bootstrap/ProgressBar';
// import { CheckmarkCircleOutline, CloseCircleOutline } from 'react-ionicons'; // Xóa dòng này
import { CheckCircle2, XCircle } from 'lucide-react'; // Thêm dòng này
import Question from '../Question.jsx';
import { useLessionHook } from '../../../../../Hooks/useLessionHook.js';
import ListQuestionFakeDataLession from '../../../../../Helpers/ListQuestionFakeDataLession.jsx';

export default function Lession() {
   const {
      isActiveButtonContinue,
      buttonValue,
      setAnswerState,
      handleButtonClick,
      isCorrect,
      progressBar,
   } = useLessionHook();
   return (
      <>
         <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="row">
               <div className="col-md-12">
                  {/* Sử dụng lớp Tailwind thay thế nếu có thể */}
                  <div className="max-w-5xl mx-auto h-[80vh]">
                     {' '}
                     {/* Ví dụ thay thế w-1000 và height-80vh */}
                     <div className="header-top d-flex align-items-center">
                        <ProgressBar
                           now={progressBar}
                           // Cân nhắc dùng lớp Tailwind cho width nếu ProgressBar hỗ trợ className
                           style={{ width: '95%' }} // Hoặc dùng % hay lớp w-[950px]
                        />
                     </div>
                     <div className="question-step text-white d-flex justify-content-center align-items-center flex-column">
                        <Question
                           questions={
                              ListQuestionFakeDataLession.N5.orderFood.level1
                           }
                           isCorrectRedux={isCorrect}
                           setAnswerState={setAnswerState}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="footer-lession">
            {/* Cân nhắc dùng Tailwind cho layout footer */}
            <div className="content-footer content d-flex justify-content-around align-items-center">
               <div
                  // Sử dụng Tailwind classes cho màu sắc thay vì .success/.isFail nếu có thể
                  className={`status-resutl-question d-flex justify-content-center align-items-center ${isCorrect === null ? '' : isCorrect ? 'theme-text' : 'text-danger'}`} // Ví dụ dùng text-success/text-danger từ config
               >
                  {isCorrect ? (
                     <>
                        {/* Thay thế icon và props */}
                        <CheckCircle2
                           className="theme-text-success" // Hoặc dùng theme('colors.success') nếu CSS xử lý
                           size={80} // Dùng size thay cho height/width
                        />
                        <div className="text">
                           <p>Great job</p>
                        </div>
                     </>
                  ) : isCorrect === false ? (
                     <>
                        {/* Thay thế icon và props */}
                        <XCircle
                           color={'#bb4b42'} // Hoặc dùng theme('colors.danger')
                           size={80}
                        />
                        <div className="text">
                           <p>Not Correct</p>
                        </div>
                     </>
                  ) : (
                     <div style={{ height: '80px', width: '80px' }}></div> // Placeholder để giữ layout
                  )}
               </div>
               <div className="button button-check-question">
                  <button
                     onClick={handleButtonClick}
                     // Sử dụng Tailwind classes cho trạng thái button
                     className={`py-2 px-6 rounded text-white font-semibold button-check-question ${
                        !isActiveButtonContinue
                           ? 'bg-slate-gray cursor-not-allowed opacity-50' // Lớp disabled từ config Tailwind
                           : `theme-bg ${isCorrect === false ? 'bg-danger' : ''}`
                     }`}
                     disabled={!isActiveButtonContinue && isCorrect === null} // Thêm thuộc tính disabled chuẩn
                  >
                     {buttonValue}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}

// ? 'root-bg-gray hover:bg-primary-light' // Lớp màu primary từ config
// : isCorrect
//    ? 'theme-bg' // Lớp success từ config
//    : 'bg-danger' // Lớp danger từ config