import { ArrowLeft, NotebookText, Star } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ListQuestionFakeDataLession from '../../../../Helpers/ListQuestionFakeDataLession.jsx';
import { LanguageContext } from '../../../../Routes/HomePage/Context/LanguageContext.jsx';

export default function MainLearn({ children }) {
   const [selectedJlptLevel, setSelectedJlptLevel] = useState('N5');
   const [selectedTopic, setSelectedTopic] = useState('');
   const [availableTopics, setAvailableTopics] = useState([]);
   const [topicLessons, setTopicLessons] = useState([]);
   const [clickedLessonIndex, setClickedLessonIndex] = useState(null);

   // Get translations from context
   const { translations } = useContext(LanguageContext);

   const navigate = useNavigate();

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
               {topicLessons.map((lessonType, index) => (
                  <li
                     key={lessonType}
                     className={`course position-relative ${getPositionClass(index, topicLessons.length)} ${clickedLessonIndex === index ? 'click' : ''}`}
                     onClick={() => onHandleClickCourse(index)}
                  >
                     <Star
                        size={42}
                        color={
                           index === 0 || clickedLessonIndex === index
                              ? undefined
                              : 'rgb(77, 89, 97)'
                        }
                     />
                     <div className="tooltiptext">
                        <p>{formatTopicName(selectedTopic)}</p>
                        <p>{getLessonName(lessonType)}</p>
                        <button
                           onClick={() => onHandleStartLession(lessonType)}
                        >
                           {translations.learn.lessons.startLearning}
                        </button>
                     </div>
                  </li>
               ))}
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
