import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState, useContext } from 'react';
import { isObject } from '../Helpers/util.jsx';
import {
   setAnswer,
   updateQuestionIndex,
   resetState,
   setLessonQuestions,
} from '../Redux/Reducers/LessionQuestionChoiceReducer.jsx';
import {
   addExperience,
   completeLevel,
} from '../Redux/Reducers/UserProgressReducer.jsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ListQuestionFakeDataLession from '../Helpers/ListQuestionFakeDataLession.jsx';
import { LanguageContext } from '../Routes/HomePage/Context/LanguageContext.jsx';

export const useLessionHook = () => {
   const navigation = useNavigate();
   const dispatch = useDispatch();
   const [searchParams] = useSearchParams();
   const { translations } = useContext(LanguageContext);

   // Get current lesson parameters from URL
   const jlptLevel = searchParams.get('level') || 'N5';
   const topic = searchParams.get('topic') || 'orderFood';
   const lessonType = searchParams.get('type') || 'level1';

   const isCorrect = useSelector(
      state => state.LessionQuestionChoice.isCorrect
   );
   const progressBar = useSelector(
      state => state.LessionQuestionChoice.progressBar
   );
   const listQuestionFail = useSelector(
      state => state.LessionQuestionChoice.listQuestionFail
   );

   const [isActiveButtonContinue, setIsActiveButtonContinue] = useState(false);
   const [answerState, setAnswerState] = useState([]);

   // Add state for tracking time and incorrect attempts
   const [startTime, setStartTime] = useState(null);
   const [timeSpent, setTimeSpent] = useState(0);
   const [incorrectAttempts, setIncorrectAttempts] = useState(0);
   const [showReport, setShowReport] = useState(false);
   const [lessonStats, setLessonStats] = useState(null);

   // Calculate button value using translations
   const buttonValue = useMemo(() => {
      // For theory lessons, use different button text
      if (lessonType === 'theory') {
         if (progressBar === 100) return translations.learn.buttons.nextLevel;
         return translations.learn.buttons.continue;
      }

      // For regular lessons
      if (isCorrect === true) return translations.learn.buttons.continue;
      if (isCorrect === false) return translations.learn.buttons.notCorrect;
      if (progressBar === 100) return translations.learn.buttons.nextLevel;

      return translations.learn.buttons.check;
   }, [isCorrect, progressBar, translations.learn.buttons, lessonType]);

   // Initialize timer when lesson starts
   useEffect(() => {
      setStartTime(Date.now());
      return () => {
         // Cleanup timer if component unmounts
         if (startTime) {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            setTimeSpent(elapsed);
         }
      };
   }, []);

   // Track incorrect attempts
   useEffect(() => {
      if (isCorrect === false) {
         setIncorrectAttempts(prev => prev + 1);
      }
   }, [isCorrect]);

   useEffect(() => {
      // For theory lessons, always enable the button
      if (lessonType === 'theory') {
         setIsActiveButtonContinue(true);
         return;
      }

      // For regular lessons, check if an answer has been selected
      if (isObject(answerState) && answerState.answer?.length > 0) {
         setIsActiveButtonContinue(true);
      } else {
         setIsActiveButtonContinue(false);
      }
   }, [answerState, lessonType]);

   const changeScreenQuestion = () => {
      // For theory lessons, pass isTheory flag
      if (lessonType === 'theory') {
         dispatch(updateQuestionIndex({ isIntroduction: true }));
      } else {
         dispatch(updateQuestionIndex());
      }

      // For theory lessons, keep the button active
      if (lessonType !== 'theory') {
         setIsActiveButtonContinue(false);
      }

      setAnswerState([]);
   };

   const checkAnswer = () => {
      if ('answer' in answerState) {
         dispatch(setAnswer(answerState));
      }
   };

   /**
    * Determines the next level based on current level parameters
    * @returns {Object|null} Next level information or null if no next level exists
    */
   const getNextLevel = () => {
      // Parse the current level number if it's a level type
      const currentLevelMatch = lessonType.match(/level(\d+)/);

      // If not a level type (e.g., it's a theory lesson), default to level1
      if (!currentLevelMatch) {
         // If it's a theory lesson, move to level1 of the same topic
         if (lessonType === 'theory') {
            return { level: jlptLevel, topic, type: 'level1' };
         }
         return { level: jlptLevel, topic, type: 'level1' };
      }

      const currentLevelNum = parseInt(currentLevelMatch[1]);
      const nextLevelNum = currentLevelNum + 1;
      const nextLevelType = `level${nextLevelNum}`;

      // Check if next level exists for this topic
      if (
         ListQuestionFakeDataLession[jlptLevel] &&
         ListQuestionFakeDataLession[jlptLevel][topic] &&
         ListQuestionFakeDataLession[jlptLevel][topic][nextLevelType]
      ) {
         // Next level exists, return it
         return { level: jlptLevel, topic, type: nextLevelType };
      }

      // If no next level for this topic, check if there are more topics in this JLPT level
      if (ListQuestionFakeDataLession[jlptLevel]) {
         const topics = Object.keys(ListQuestionFakeDataLession[jlptLevel]);
         const currentTopicIndex = topics.indexOf(topic);

         if (currentTopicIndex < topics.length - 1) {
            // Move to the first level of the next topic
            const nextTopic = topics[currentTopicIndex + 1];
            // Check if the next topic has a theory lesson first
            if (ListQuestionFakeDataLession[jlptLevel][nextTopic].theory) {
               return { level: jlptLevel, topic: nextTopic, type: 'theory' };
            }
            // Otherwise go to level1
            return { level: jlptLevel, topic: nextTopic, type: 'level1' };
         }
      }

      // If no more topics in this JLPT level, check if there's a next JLPT level
      const jlptLevels = Object.keys(ListQuestionFakeDataLession);
      const currentLevelIndex = jlptLevels.indexOf(jlptLevel);

      if (currentLevelIndex < jlptLevels.length - 1) {
         // Move to the first topic and level of the next JLPT level
         const nextJlptLevel = jlptLevels[currentLevelIndex + 1];
         if (ListQuestionFakeDataLession[nextJlptLevel]) {
            const nextTopics = Object.keys(
               ListQuestionFakeDataLession[nextJlptLevel]
            );
            if (nextTopics.length > 0) {
               // Check if the first topic has a theory lesson
               if (
                  ListQuestionFakeDataLession[nextJlptLevel][nextTopics[0]]
                     .theory
               ) {
                  return {
                     level: nextJlptLevel,
                     topic: nextTopics[0],
                     type: 'theory',
                  };
               }
               // Otherwise go to level1
               return {
                  level: nextJlptLevel,
                  topic: nextTopics[0],
                  type: 'level1',
               };
            }
         }
      }

      // If no next level exists at all, return null
      return null;
   };

   /**
    * Creates a combined question set with review questions from previous levels
    * @param {Object} nextLevelInfo - Information about the next level
    * @returns {Array} Combined questions
    */
   const createCombinedQuestions = nextLevelInfo => {
      if (!nextLevelInfo) return [];

      const { level, topic, type } = nextLevelInfo;

      // If it's a theory lesson, just return the theory content
      if (type === 'theory') {
         return ListQuestionFakeDataLession[level][topic][type];
      }

      // Get questions for the next level
      const nextLevelQuestions =
         ListQuestionFakeDataLession[level][topic][type];

      // If this is level1, no need for review questions
      if (type === 'level1') {
         return nextLevelQuestions;
      }

      // Get review questions from previous level
      const currentLevelMatch = type.match(/level(\d+)/);
      if (!currentLevelMatch) return nextLevelQuestions;

      const currentLevelNum = parseInt(currentLevelMatch[1]);
      const prevLevelType = `level${currentLevelNum - 1}`;

      // Check if previous level exists
      if (
         ListQuestionFakeDataLession[level] &&
         ListQuestionFakeDataLession[level][topic] &&
         ListQuestionFakeDataLession[level][topic][prevLevelType]
      ) {
         const prevLevelQuestions =
            ListQuestionFakeDataLession[level][topic][prevLevelType];

         // Select a subset of review questions (e.g., 30% of previous level)
         const reviewCount = Math.max(
            1,
            Math.floor(prevLevelQuestions.length * 0.3)
         );
         const reviewQuestions = [];

         // Randomly select review questions
         const indices = new Set();
         while (
            indices.size < reviewCount &&
            indices.size < prevLevelQuestions.length
         ) {
            const randomIndex = Math.floor(
               Math.random() * prevLevelQuestions.length
            );
            if (!indices.has(randomIndex)) {
               indices.add(randomIndex);
               // Create a copy of the question to avoid reference issues
               const questionCopy = JSON.parse(
                  JSON.stringify(prevLevelQuestions[randomIndex])
               );
               // Add a flag to indicate this is a review question
               questionCopy.isReview = true;
               reviewQuestions.push(questionCopy);
            }
         }

         // Combine new questions with review questions
         return [...nextLevelQuestions, ...reviewQuestions];
      }

      return nextLevelQuestions;
   };

   /**
    * Calculate XP based on performance
    * @returns {number} XP earned
    */
   const calculateXP = () => {
      // Base XP for the level (simple algorithm)
      const baseXP = 50;

      // Deduct for errors (up to 50% reduction)
      const errorPenalty = Math.min(incorrectAttempts * 5, 50);

      // Time bonus for quick completion (up to 20% bonus)
      const expectedTime = 120; // 2 minutes as expected time
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const timeBonus =
         elapsed < expectedTime ? Math.floor((expectedTime - elapsed) / 6) : 0;

      // Calculate final XP
      const finalXP = Math.floor(
         baseXP * (1 - errorPenalty / 100) * (1 + timeBonus / 100)
      );
      return Math.max(finalXP, Math.floor(baseXP * 0.3)); // Minimum 30% of base XP
   };

   /**
    * Format topic name for display
    */
   const formatTopicName = topicName => {
      return topicName
         .replace(/([A-Z])/g, ' $1') // Add space before capital letters
         .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
   };

   /**
    * Get human-readable lesson name
    */
   const getLessonName = lessonTypeName => {
      if (lessonTypeName === 'theory') return translations.learn.lessons.theory;

      const levelMatch = lessonTypeName.match(/level(\d+)/);
      if (levelMatch) {
         return translations.learn.lessons.level.replace(
            '{{level}}',
            levelMatch[1]
         );
      }

      return lessonTypeName;
   };

   const handleButtonClick = () => {
      // Force the button to be active for theory lessons
      if (lessonType === 'theory') {
         if (progressBar === 100) {
            // Calculate final time spent
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            setTimeSpent(elapsed);

            // Prepare lesson stats for report
            setLessonStats({
               timeSpent: elapsed,
               incorrectAttempts,
               topic: formatTopicName(topic),
               level: getLessonName(lessonType),
               xpEarned: calculateXP(),
            });

            // Mark level as completed
            dispatch(completeLevel({ jlptLevel, topic, level: lessonType }));

            // Show report instead of immediately navigating
            setShowReport(true);
         } else {
            // Instead of just updating the question index, navigate to level1 of the same topic
            // This will refresh the page and load the actual lesson content
            navigation(`/lession?level=${jlptLevel}&topic=${topic}&type=level1`);
         }
         return;
      }

      // For regular lessons
      if (isCorrect === null) {
         // Only check answer if an answer has been selected
         if (isObject(answerState) && answerState.answer?.length > 0) {
            checkAnswer();
         }
      } else if (progressBar === 100 && listQuestionFail.length === 0) {
         // Only show completion report if progress is 100% AND there are no failed questions
         // Calculate final time spent
         const elapsed = Math.floor((Date.now() - startTime) / 1000);
         setTimeSpent(elapsed);

         // Prepare lesson stats for report
         setLessonStats({
            timeSpent: elapsed,
            incorrectAttempts,
            topic: formatTopicName(topic),
            level: getLessonName(lessonType),
            xpEarned: calculateXP(),
         });

         // Mark level as completed
         dispatch(completeLevel({ jlptLevel, topic, level: lessonType }));

         // Show report instead of immediately navigating
         setShowReport(true);
      } else if (progressBar === 100 && listQuestionFail.length > 0) {
         // If progress is 100% but there are failed questions, move to the first failed question
         changeScreenQuestion();
      } else {
         changeScreenQuestion();
      }
   };

   return {
      isActiveButtonContinue,
      buttonValue,
      setAnswerState,
      handleButtonClick,
      isCorrect,
      progressBar,
      showReport,
      lessonStats,
      setShowReport,
      timeSpent,
      incorrectAttempts,
      getNextLevel,
      formatTopicName,
      getLessonName,
      createCombinedQuestions,
   };
};
