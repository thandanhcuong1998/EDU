import { ArrowLeft, NotebookText, Star, Lock } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unlockTopic } from '../../../../Redux/Reducers/UserProgressReducer.jsx';
import { setLessonQuestions } from '../../../../Redux/Reducers/LessionQuestionChoiceReducer.jsx';
import ListQuestionFakeDataLession from '../../../../Helpers/ListQuestionFakeDataLession.jsx';
import { LanguageContext } from '../../../../Routes/HomePage/Context/LanguageContext.jsx';
import './styles.css';

export default function MainLearn({ children }) {
   const [selectedJlptLevel, setSelectedJlptLevel] = useState('N5');
   const [selectedTopic, setSelectedTopic] = useState('');
   const [availableTopics, setAvailableTopics] = useState([]);
   const [topicLessons, setTopicLessons] = useState([]);
   const [clickedLessonIndex, setClickedLessonIndex] = useState(null);

   // Get translations from context
   const { translations } = useContext(LanguageContext);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   // Get user progress from Redux
   const userProgress = useSelector(state => state.userProgress);

   // Check if a topic is unlocked
   const isTopicUnlocked = (jlptLevel, topicName) => {
      return userProgress.unlockedTopics[jlptLevel]?.includes(topicName);
   };

   // Check if a level is unlocked
   const isLevelUnlocked = (jlptLevel, topicName, levelType) => {
      // Theory is always available for unlocked topics
      if (levelType === 'theory') {
         return isTopicUnlocked(jlptLevel, topicName);
      }

      // Extract level number
      const levelMatch = levelType.match(/level(\d+)/);
      if (!levelMatch) return false;

      const levelNum = parseInt(levelMatch[1]);

      // Level 1 is available if the topic is unlocked
      if (levelNum === 1) {
         return isTopicUnlocked(jlptLevel, topicName);
      }

      // Higher levels require previous level to be completed
      const prevLevel = `level${levelNum - 1}`;
      return userProgress.completedLevels[jlptLevel]?.[topicName]?.includes(prevLevel);
   };

   // Check if user has enough XP to unlock a topic
   const hasEnoughXP = (jlptLevel, topicName) => {
      // Get required XP from metadata (if available)
      const requiredXP = ListQuestionFakeDataLession[jlptLevel]?.[topicName]?.metadata?.requiredXp || 0;
      return userProgress.experience >= requiredXP;
   };

   // Try to unlock a topic if user has enough XP
   const tryUnlockTopic = (jlptLevel, topicName) => {
      if (!isTopicUnlocked(jlptLevel, topicName) && hasEnoughXP(jlptLevel, topicName)) {
         dispatch(unlockTopic({ jlptLevel, topic: topicName }));
         return true;
      }
      return false;
   };

   // Initialize available topics and select the first one
   useEffect(() => {
      if (ListQuestionFakeDataLession[selectedJlptLevel]) {
         const topics = Object.keys(
            ListQuestionFakeDataLession[selectedJlptLevel]
         );
         setAvailableTopics(topics);

         if (topics.length > 0 && !selectedTopic) {
            setSelectedTopic(topics[0]);
         }
      }
   }, [selectedJlptLevel]);

   // Update available lessons when topic changes
   useEffect(() => {
      if (
         selectedJlptLevel &&
         selectedTopic &&
         ListQuestionFakeDataLession[selectedJlptLevel] &&
         ListQuestionFakeDataLession[selectedJlptLevel][selectedTopic]
      ) {
         const lessonTypes = Object.keys(
            ListQuestionFakeDataLession[selectedJlptLevel][selectedTopic]
         );

         // Sort lesson types: theory first, then levels in order
         const sortedLessonTypes = lessonTypes.sort((a, b) => {
            if (a === 'theory') return -1;
            if (b === 'theory') return 1;

            const levelA = a.match(/level(\d+)/);
            const levelB = b.match(/level(\d+)/);

            if (levelA && levelB) {
               return parseInt(levelA[1]) - parseInt(levelB[1]);
            }

            return a.localeCompare(b);
         });

         setTopicLessons(sortedLessonTypes);
      } else {
         setTopicLessons([]);
      }
   }, [selectedJlptLevel, selectedTopic]);

   const onHandleClickCourse = index => {
      setClickedLessonIndex(index === clickedLessonIndex ? null : index);
   };

   const onHandleStartLession = lessonType => {
      // Check if the level is unlocked
      if (!isLevelUnlocked(selectedJlptLevel, selectedTopic, lessonType)) {
         // Try to unlock if it's the first level and user has enough XP
         if (lessonType === 'level1' || lessonType === 'theory') {
            if (!tryUnlockTopic(selectedJlptLevel, selectedTopic)) {
               // Show message that more XP is needed
               const requiredXP = ListQuestionFakeDataLession[selectedJlptLevel]?.[selectedTopic]?.metadata?.requiredXp || 0;
               alert(`Bạn cần ${requiredXP} XP để mở khóa chủ đề này. Hiện tại bạn có ${userProgress.experience} XP.`);
               return;
            }
         } else {
            // Show message that previous level needs to be completed
            alert('Bạn cần hoàn thành cấp độ trước để mở khóa cấp độ này.');
            return;
         }
      }

      // Get the questions for the selected lesson
      const lessonQuestions = 
         ListQuestionFakeDataLession[selectedJlptLevel][selectedTopic][lessonType];

      // Update Redux store with the selected questions
      dispatch(setLessonQuestions({ questions: lessonQuestions }));

      // Navigate to the lesson
      navigate(
         `/lession?level=${selectedJlptLevel}&topic=${selectedTopic}&type=${lessonType}`
      );
   };

   // Helper function to get a human-readable lesson name
   const getLessonName = lessonType => {
      if (lessonType === 'theory') return translations.learn.lessons.theory;

      const levelMatch = lessonType.match(/level(\d+)/);
      if (levelMatch) {
         // Replace {{level}} with the actual level number
         return translations.learn.lessons.level.replace(
            '{{level}}',
            levelMatch[1]
         );
      }

      return lessonType;
   };

   // Helper function to get position classes for stars
   const getPositionClass = (index, total) => {
      if (index === 0) return '';
      if (index === 1 || index === total - 1) return 'r-64px';
      if (index === 2 || index === total - 2) return 'r-120px';
      return '';
   };

   // Format topic name for display
   const formatTopicName = topic => {
      return topic
         .replace(/([A-Z])/g, ' $1') // Add space before capital letters
         .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
   };

   return (
      <section className="section-1">
         <div className="top-header d-flex justify-content-between align-items-center">
            <div className="heading d-flex justify-content-center align-items-start flex-column">
               <div className="d-flex align-items-center mb-2">
                  <select
                     value={selectedJlptLevel}
                     onChange={e => setSelectedJlptLevel(e.target.value)}
                     className="mr-3 p-1 rounded bg-gray-700 text-white border-none"
                  >
                     {Object.keys(ListQuestionFakeDataLession).map(level => (
                        <option key={level} value={level}>
                           {level}
                        </option>
                     ))}
                  </select>

                  <select
                     value={selectedTopic}
                     onChange={e => setSelectedTopic(e.target.value)}
                     className="p-1 rounded bg-gray-700 text-white border-none"
                  >
                     {availableTopics.map(topic => (
                        <option key={topic} value={topic}>
                           {formatTopicName(topic)}
                        </option>
                     ))}
                  </select>
               </div>
               <p className="text-xl font-semibold">
                  {formatTopicName(selectedTopic)}
               </p>
            </div>
            <div className="tips d-flex justify-content-around align-items-center">
               <NotebookText className="w-8 h-8" />
               {translations.learn.navigation.guidebook}
            </div>
         </div>
         <div className="line-study d-flex justify-content-center align-items-center">
            <ul className="step-course">
               {topicLessons.map((lessonType, index) => {
                  const isUnlocked = isLevelUnlocked(selectedJlptLevel, selectedTopic, lessonType);

                  return (
                     <li
                        key={lessonType}
                        className={`course position-relative ${getPositionClass(index, topicLessons.length)} ${clickedLessonIndex === index ? 'click' : ''} ${!isUnlocked ? 'locked' : ''}`}
                        onClick={() => isUnlocked && onHandleClickCourse(index)}
                     >
                        {isUnlocked ? (
                           <Star
                              size={42}
                              color={
                                 index === 0 || clickedLessonIndex === index
                                    ? undefined
                                    : 'rgb(77, 89, 97)'
                              }
                           />
                        ) : (
                           <div className="locked-icon">
                              <Lock size={42} color="rgb(77, 89, 97)" />
                           </div>
                        )}

                        <div className="tooltiptext">
                           <p>{formatTopicName(selectedTopic)}</p>
                           <p>{getLessonName(lessonType)}</p>

                           {isUnlocked ? (
                              <button onClick={() => onHandleStartLession(lessonType)}>
                                 {translations.learn.lessons.startLearning}
                              </button>
                           ) : (
                              <div className="locked-message">
                                 {lessonType === 'level1' || lessonType === 'theory' ? (
                                    <p>Cần {ListQuestionFakeDataLession[selectedJlptLevel]?.[selectedTopic]?.metadata?.requiredXp || 0} XP để mở khóa</p>
                                 ) : (
                                    <p>Hoàn thành cấp độ trước để mở khóa</p>
                                 )}
                              </div>
                           )}
                        </div>
                     </li>
                  );
               })}
            </ul>

            <div className="lottie">
               <DotLottieReact
                  src="https://lottie.host/65f6a290-041f-42a6-89b5-82a9db439420/iQt8TS5rAz.json"
                  loop
                  autoplay
               />
            </div>
         </div>
      </section>
   );
}
