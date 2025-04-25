import ProgressBar from 'react-bootstrap/ProgressBar';
import { CheckCircle2, XCircle } from 'lucide-react';
import Question from '../Question.jsx';
import { useLessionHook } from '../../../../../Hooks/useLessionHook.js';
import ListQuestionFakeDataLession from '../../../../../Helpers/ListQuestionFakeDataLession.jsx';
import { useEffect, useState, useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { LanguageContext } from '../../../../../Routes/HomePage/Context/LanguageContext.jsx';

export default function Lession() {
   // Get URL parameters for dynamic lesson selection
   const [searchParams] = useSearchParams();
   const jlptLevel = searchParams.get('level') || 'N5';
   const topic = searchParams.get('topic') || 'orderFood';
   const lessonType = searchParams.get('type') || 'level1';

   // Get translations from context
   const { translations } = useContext(LanguageContext);

   // State to store the current questions
   const [currentQuestions, setCurrentQuestions] = useState([]);

   // Get lesson hook functionality
   const {
      isActiveButtonContinue,
      buttonValue,
      setAnswerState,
      handleButtonClick,
      isCorrect,
      progressBar,
   } = useLessionHook();

   // Load questions based on URL parameters
   useEffect(() => {
      try {
         // Check if the requested lesson content exists
         if (
            ListQuestionFakeDataLession[jlptLevel] &&
            ListQuestionFakeDataLession[jlptLevel][topic] &&
            ListQuestionFakeDataLession[jlptLevel][topic][lessonType]
         ) {
            // Set the questions from the requested path
            setCurrentQuestions(
               ListQuestionFakeDataLession[jlptLevel][topic][lessonType]
            );
         } else {
            // Fallback to default content if requested path doesn't exist
            console.warn(
               `Lesson content not found for ${jlptLevel}.${topic}.${lessonType}, using default content`
            );
            setCurrentQuestions(
               ListQuestionFakeDataLession.N5.orderFood.level1
            );
         }
      } catch (error) {
         console.error('Error loading lesson content:', error);
         // Fallback to default content in case of error
         setCurrentQuestions(ListQuestionFakeDataLession.N5.orderFood.level1);
      }
   }, [jlptLevel, topic, lessonType]);
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
                        {/* Display lesson title if it's a theory lesson */}
                        {lessonType === 'theory' && currentQuestions.title && (
                           <div className="mb-4 text-center">
                              <h2 className="text-2xl font-bold">
                                 {currentQuestions.title}
                              </h2>
                           </div>
                        )}

                        {/* Display theory content if available */}
                        {lessonType === 'theory' && currentQuestions.content ? (
                           <div className="theory-content mb-6 p-4 bg-gray-800 rounded-lg">
                              {currentQuestions.content.map(
                                 (paragraph, index) => (
                                    <p key={index} className="mb-3">
                                       {paragraph}
                                    </p>
                                 )
                              )}

                              {/* Display vocabulary section if available */}
                              {currentQuestions.vocabulary &&
                                 currentQuestions.vocabulary.length > 0 && (
                                    <div className="vocabulary-section mt-4">
                                       <h3 className="text-xl font-semibold mb-2">
                                          Từ vựng
                                       </h3>
                                       <ul className="list-disc pl-5">
                                          {currentQuestions.vocabulary.map(
                                             (item, index) => (
                                                <li
                                                   key={index}
                                                   className="mb-2"
                                                >
                                                   <span className="font-bold">
                                                      {item.japanese}
                                                   </span>{' '}
                                                   ({item.romaji}) -{' '}
                                                   {item.vietnamese}
                                                   {item.usage && (
                                                      <span className="text-gray-400 text-sm block">
                                                         {item.usage}
                                                      </span>
                                                   )}
                                                </li>
                                             )
                                          )}
                                       </ul>
                                    </div>
                                 )}

                              {/* Display grammar section if available */}
                              {currentQuestions.grammar &&
                                 currentQuestions.grammar.length > 0 && (
                                    <div className="grammar-section mt-4">
                                       <h3 className="text-xl font-semibold mb-2">
                                          Ngữ pháp
                                       </h3>
                                       <ul className="list-disc pl-5">
                                          {currentQuestions.grammar.map(
                                             (item, index) => (
                                                <li
                                                   key={index}
                                                   className="mb-2"
                                                >
                                                   <span className="font-bold">
                                                      {item.pattern}
                                                   </span>{' '}
                                                   - {item.explanation}
                                                   {item.examples && (
                                                      <ul className="list-circle pl-5 mt-1">
                                                         {item.examples.map(
                                                            (example, i) => (
                                                               <li
                                                                  key={i}
                                                                  className="text-sm"
                                                               >
                                                                  {example}
                                                               </li>
                                                            )
                                                         )}
                                                      </ul>
                                                   )}
                                                </li>
                                             )
                                          )}
                                       </ul>
                                    </div>
                                 )}
                           </div>
                        ) : (
                           /* Display practice questions for non-theory lessons */
                           <Question
                              questions={currentQuestions}
                              isCorrectRedux={isCorrect}
                              setAnswerState={setAnswerState}
                           />
                        )}
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
                           <p>{translations.learn.feedback.greatJob}</p>
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
                           <p>{translations.learn.feedback.notCorrect}</p>
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
