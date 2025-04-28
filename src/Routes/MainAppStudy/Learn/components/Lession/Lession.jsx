import ProgressBar from 'react-bootstrap/ProgressBar';
import { CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import Question from '../Question.jsx';
import { useLessionHook } from '../../../../../Hooks/useLessionHook.js';
import ListQuestionFakeDataLession from '../../../../../Helpers/ListQuestionFakeDataLession.jsx';
import { useEffect, useState, useContext } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../../HomePage/Context/LanguageContext.jsx';
import LessonReport from '../LessonReport.jsx';
import VocabularyItem from '../VocabularyItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
   resetState,
   updateQuestionIndex,
   setLessonQuestions,
} from '../../../../../Redux/Reducers/LessionQuestionChoiceReducer.jsx';
import { setTheme } from '../../../../../Redux/Reducers/ThemeReducer.jsx';
import '../styles.css';

export default function Lession() {
   // Get URL parameters for dynamic lesson selection
   const [searchParams] = useSearchParams();
   const jlptLevel = searchParams.get('level') || 'N5';
   const topic = searchParams.get('topic') || 'orderFood';
   const lessonType = searchParams.get('type') || 'level1';

   // Get translations from context
   const { translations } = useContext(LanguageContext);

   // Navigation and dispatch hooks
   const navigate = useNavigate();
   const dispatch = useDispatch();

   // Get questions from Redux store
   const currentQuestions = useSelector(
      state => state.LessionQuestionChoice.questions
   );

   // State to track whether to show introduction or questions
   const [showIntroduction, setShowIntroduction] = useState(true);

   // Get current question index from Redux store
   const currentQuestionIndex = useSelector(
      state => state.LessionQuestionChoice.currentQuestionIndex
   );

   // Get theme from Redux store
   const { theme } = useSelector(state => state.theme);

   // Get lesson hook functionality
   const {
      isActiveButtonContinue,
      buttonValue,
      setAnswerState,
      handleButtonClick,
      isCorrect,
      progressBar,
      showReport,
      lessonStats,
      setShowReport,
      getNextLevel,
      createCombinedQuestions,
      getLessonName,
   } = useLessionHook();

   // Update showIntroduction state when currentQuestionIndex changes
   useEffect(() => {
      // If currentQuestionIndex is greater than 0, we're no longer on the introduction screen
      if (currentQuestionIndex > 0) {
         setShowIntroduction(false);
      }
   }, [currentQuestionIndex]);

   // Load questions based on URL parameters
   useEffect(() => {
      try {
         // Reset introduction state when lesson changes
         setShowIntroduction(true);

         // Check if the requested lesson content exists
         if (
            ListQuestionFakeDataLession[jlptLevel] &&
            ListQuestionFakeDataLession[jlptLevel][topic] &&
            ListQuestionFakeDataLession[jlptLevel][topic][lessonType]
         ) {
            // Dispatch action to set questions in Redux store
            dispatch(setLessonQuestions({
               questions: ListQuestionFakeDataLession[jlptLevel][topic][lessonType]
            }));
         } else {
            // Fallback to default content if requested path doesn't exist
            console.warn(
               `Lesson content not found for ${jlptLevel}.${topic}.${lessonType}, using default content`
            );
            dispatch(setLessonQuestions({
               questions: ListQuestionFakeDataLession.N5.orderFood.level1
            }));
         }
      } catch (error) {
         console.error('Error loading lesson content:', error);
         // Fallback to default content in case of error
         dispatch(setLessonQuestions({
            questions: ListQuestionFakeDataLession.N5.orderFood.level1
         }));
      }
   }, [jlptLevel, topic, lessonType, dispatch]);
   return (
      <>
         {showReport && lessonStats && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
               <LessonReport
                  stats={lessonStats}
                  onContinue={() => {
                     setShowReport(false);

                     // Get next level info
                     const nextLevelInfo = getNextLevel();

                     if (nextLevelInfo) {
                        // Navigate to the next level
                        const { level, topic, type } = nextLevelInfo;

                        // Create combined questions with review
                        const combinedQuestions =
                           createCombinedQuestions(nextLevelInfo);

                        // Update Redux store with the new questions
                        dispatch(setLessonQuestions({ questions: combinedQuestions }));

                        // Navigate to the next level
                        navigate(
                           `/lession?level=${level}&topic=${topic}&type=${type}`
                        );
                     } else {
                        // If no next level, go back to learn page
                        navigate('/learn');
                     }
                  }}
               />
            </div>
         )}
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
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                          {currentQuestions.vocabulary.map(
                                             (item, index) => (
                                                <VocabularyItem
                                                   key={index}
                                                   item={{
                                                      ...item,
                                                      audio: true, // Enable audio for all vocabulary items
                                                   }}
                                                />
                                             )
                                          )}
                                       </div>
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
                        ) : /* Display introduction or practice questions for non-theory lessons */
                        lessonType !== 'theory' &&
                          showIntroduction &&
                          currentQuestions.introduction ? (
                           <div className="level-introduction mb-6 p-4 bg-gray-800 rounded-lg">
                              <h2 className="text-2xl font-bold mb-4">
                                 {currentQuestions.introduction.title ||
                                    `Giới thiệu ${getLessonName(lessonType)}`}
                              </h2>

                              {currentQuestions.introduction.content &&
                                 currentQuestions.introduction.content.map(
                                    (paragraph, index) => (
                                       <p key={index} className="mb-3">
                                          {paragraph}
                                       </p>
                                    )
                                 )}

                              {currentQuestions.introduction.vocabulary &&
                                 currentQuestions.introduction.vocabulary
                                    .length > 0 && (
                                    <div className="vocabulary-section mt-4">
                                       <h3 className="text-xl font-semibold mb-2">
                                          Từ vựng mới
                                       </h3>
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                          {currentQuestions.introduction.vocabulary.map(
                                             (item, index) => (
                                                <VocabularyItem
                                                   key={index}
                                                   item={{
                                                      ...item,
                                                      audio: true,
                                                   }}
                                                />
                                             )
                                          )}
                                       </div>
                                    </div>
                                 )}

                              <div className="mt-6 text-center">
                                 <button
                                    onClick={() => {
                                       setShowIntroduction(false);
                                       dispatch(
                                          updateQuestionIndex({
                                             isIntroduction: true,
                                          })
                                       );
                                    }}
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
                                 >
                                    Bắt đầu học
                                 </button>
                              </div>
                           </div>
                        ) : (
                           <Question
                              questions={currentQuestions}
                              isCorrectRedux={isCorrect}
                              setAnswerState={setAnswerState}
                              theme={theme}
                           />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Hide footer on introduction page */}
         {!(
            lessonType !== 'theory' &&
            showIntroduction &&
            currentQuestions.introduction
         ) && (
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
                           lessonType === 'theory' || isActiveButtonContinue
                              ? `theme-bg ${isCorrect === false ? 'bg-danger' : ''}`
                              : 'bg-slate-gray cursor-not-allowed opacity-50' // Lớp disabled từ config Tailwind
                        }`}
                        disabled={
                           lessonType !== 'theory' &&
                           !isActiveButtonContinue &&
                           isCorrect === null
                        } // Enable button on theory pages
                     >
                        {buttonValue}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
