import { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { BookOpenText, Lightbulb } from 'lucide-react';
import { LanguageContext } from '@/app/providers/LanguageProvider.jsx';
import { setLessonQuestions } from '@/features/learn/redux/lessonSlice.js';
import ListQuestionFakeDataLession from '@/features/learn/data/ListQuestionFakeDataLession.jsx';
import { useLessionHook } from '@/features/learn/hooks/useLessionHook.js';
import Question from '@/features/learn/components/Question/Question.jsx';
import LessonReport from './LessonReport.jsx';
import VocabularyItem from './VocabularyItem.jsx';
import './Lession.scss';

export default function Lession() {
   // Get URL parameters for dynamic lesson selection
   const [searchParameters] = useSearchParams();
   const jlptLevel = searchParameters.get('level') || 'N5';
   const topic = searchParameters.get('topic') || 'orderFood';
   const lessonType = searchParameters.get('type') || 'level1';

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
            dispatch(
               setLessonQuestions({
                  questions:
                     ListQuestionFakeDataLession[jlptLevel][topic][lessonType],
               })
            );
         } else {
            // Fallback to default content if requested path doesn't exist
            console.warn(
               `Lesson content not found for ${jlptLevel}.${topic}.${lessonType}, using default content`
            );
            dispatch(
               setLessonQuestions({
                  questions: ListQuestionFakeDataLession.N5.orderFood.level1,
               })
            );
         }
      } catch (error) {
         console.error('Error loading lesson content:', error);
         // Fallback to default content in case of error
         dispatch(
            setLessonQuestions({
               questions: ListQuestionFakeDataLession.N5.orderFood.level1,
            })
         );
      }
   }, [jlptLevel, topic, lessonType, dispatch]);

   // Check if we have questions to display
   if (!currentQuestions || currentQuestions.length === 0) {
      return (
         <div className="container-fluid">
            <div className="row">
               <div className="col-md-12">
                  <div className="lesson-scrollable-content">
                     <div className="header-top">
                        <ProgressBar now={0} />
                     </div>
                     <div className="question-step d-flex justify-content-center align-items-center flex-column">
                        <div className="loading-state">
                           <div className="loading-spinner"></div>
                           <p>Đang tải bài học...</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

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
                        dispatch(
                           setLessonQuestions({ questions: combinedQuestions })
                        );

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
         <div className="container-fluid">
            <div className="row">
               <div className="col-md-12">
                  <div className="lesson-scrollable-content">
                     <div className="header-top">
                        <ProgressBar now={progressBar} />
                     </div>
                     <div className="question-step d-flex justify-content-center align-items-center flex-column">
                        {/* Display lesson title if it's a theory lesson */}
                        {lessonType === 'theory' && currentQuestions.title && (
                           <div className="theory-header">
                              <h2 className="theory-title">
                                 {/* Test BookOpenText component */}
                                 {(() => {
                                    try {
                                       console.log('Rendering BookOpenText with size 32');
                                       return <BookOpenText size={32} />;
                                    } catch (error) {
                                       console.error('Error rendering BookOpenText:', error);
                                       return <span>📚</span>;
                                    }
                                 })()}{' '}
                                 {currentQuestions.title}
                              </h2>
                           </div>
                        )}

                        {/* Display theory content if available */}
                        {lessonType === 'theory' && currentQuestions.content ? (
                           <div className="theory-content-blocks">
                              {currentQuestions.content.map(
                                 (paragraph, index) => (
                                    <div
                                       key={index}
                                       className="theory-content-block"
                                    >
                                       <p>{paragraph}</p>
                                    </div>
                                 )
                              )}

                              {/* Display vocabulary section if available */}
                              {currentQuestions.vocabulary &&
                                 currentQuestions.vocabulary.length > 0 && (
                                    <div className="vocabulary-section">
                                       <h3 className="section-title">
                                          <Lightbulb size={24} />{' '}
                                          {
                                             translations.learn.lessons
                                                .vocabulary
                                          }
                                       </h3>
                                       <div className="vocabulary-list">
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
                                    <div className="grammar-section">
                                       <h3 className="section-title">
                                          <BookOpenText size={24} />{' '}
                                          {
                                             translations.learn.lessons
                                                .grammar
                                          }
                                       </h3>
                                       <div className="grammar-list">
                                          {currentQuestions.grammar.map(
                                             (item, index) => (
                                                <div
                                                   key={index}
                                                   className="grammar-item"
                                                >
                                                   <h4>{item.title}</h4>
                                                   <p>{item.explanation}</p>
                                                   {item.examples && (
                                                      <div className="examples">
                                                         <h5>Ví dụ:</h5>
                                                         <ul>
                                                            {item.examples.map(
                                                               (example, idx) => (
                                                                  <li key={idx}>
                                                                     {example}
                                                                  </li>
                                                               )
                                                            )}
                                                         </ul>
                                                      </div>
                                                   )}
                                                </div>
                                             )
                                          )}
                                       </div>
                                    </div>
                                 )}

                              {/* Continue button for theory lessons */}
                              <div className="theory-actions">
                                 <button
                                    className="continue-btn"
                                    onClick={() => {
                                       setShowIntroduction(false);
                                       // For theory lessons, we need to load the actual questions
                                       // Check if there are questions in the lesson
                                       if (currentQuestions.questions && currentQuestions.questions.length > 0) {
                                          dispatch(
                                             setLessonQuestions({
                                                questions: currentQuestions.questions,
                                             })
                                          );
                                       } else {
                                          // If no questions, go to next level
                                          const nextLevelInfo = getNextLevel();
                                          if (nextLevelInfo) {
                                             const { level, topic, type } = nextLevelInfo;
                                             navigate(`/lession?level=${level}&topic=${topic}&type=${type}`);
                                          } else {
                                             navigate('/learn');
                                          }
                                       }
                                    }}
                                 >
                                    Tiếp tục với bài tập
                                 </button>
                              </div>
                           </div>
                        ) : (
                           // Display questions for non-theory lessons
                           <>
                              {/* Introduction screen */}
                              {showIntroduction && (
                                 <div className="introduction-screen">
                                    <div className="introduction-content">
                                       <h2 className="lesson-title">
                                          {getLessonName()}
                                       </h2>
                                       <p className="lesson-description">
                                          Hãy chuẩn bị để bắt đầu bài học mới!
                                       </p>
                                       <div className="lesson-info">
                                          <div className="info-item">
                                             <span className="info-label">
                                                Số câu hỏi:
                                             </span>
                                             <span className="info-value">
                                                {currentQuestions.length}
                                             </span>
                                          </div>
                                          <div className="info-item">
                                             <span className="info-label">
                                                Thời gian ước tính:
                                             </span>
                                             <span className="info-value">
                                                {Math.ceil(
                                                   currentQuestions.length * 2
                                                )}{' '}
                                                phút
                                             </span>
                                          </div>
                                       </div>
                                       <button
                                          className="start-lesson-btn"
                                          onClick={() =>
                                             setShowIntroduction(false)
                                          }
                                       >
                                          Bắt đầu học
                                       </button>
                                    </div>
                                 </div>
                              )}

                              {/* Questions screen */}
                              {!showIntroduction && (
                                 <div className="questions-screen">
                                    <Question
                                       question={
                                          currentQuestions[currentQuestionIndex]
                                       }
                                       onAnswerSelected={setAnswerState}
                                       isCorrect={isCorrect}
                                    />

                                    <div className="lesson-actions">
                                       <button
                                          className={`continue-btn ${
                                             isActiveButtonContinue
                                                ? 'active'
                                                : 'disabled'
                                          }`}
                                          onClick={handleButtonClick}
                                          disabled={!isActiveButtonContinue}
                                       >
                                          {buttonValue}
                                       </button>
                                    </div>
                                 </div>
                              )}
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
