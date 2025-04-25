import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState, useContext } from 'react';
import { isObject } from '../Helpers/util.jsx';
import {
   setAnswer,
   updateQuestionIndex,
   resetState,
} from '../Redux/Reducers/LessionQuestionChoiceReducer.jsx';
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

   const [isActiveButtonContinue, setIsActiveButtonContinue] = useState(false);
   const [answerState, setAnswerState] = useState([]);

   // Calculate button value using translations
   const buttonValue = useMemo(() => {
      if (isCorrect === true) return translations.learn.buttons.continue;
      if (isCorrect === false) return translations.learn.buttons.notCorrect;
      if (progressBar === 100) return translations.learn.buttons.nextLevel;

      return translations.learn.buttons.check;
   }, [isCorrect, progressBar, translations.learn.buttons]);

   useEffect(() => {
      if (isObject(answerState) && answerState.answer?.length > 0) {
         setIsActiveButtonContinue(true);
      } else {
         setIsActiveButtonContinue(false);
      }
   }, [answerState]);

   const changeScreenQuestion = () => {
      dispatch(updateQuestionIndex());
      setIsActiveButtonContinue(false);
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

   const handleButtonClick = () => {
      if (isCorrect === null) {
         checkAnswer();
      } else if (progressBar === 100) {
         // Level completed, determine next level
         const nextLevelInfo = getNextLevel();

         if (nextLevelInfo) {
            // Navigate to the next level
            const { level, topic, type } = nextLevelInfo;

            // Create combined questions with review
            const combinedQuestions = createCombinedQuestions(nextLevelInfo);

            // Update Redux store with the new questions
            dispatch(resetState({ questions: combinedQuestions }));

            // Navigate to the next level
            navigation(`/lession?level=${level}&topic=${topic}&type=${type}`);
         } else {
            // If no next level, go back to learn page
            navigation('/learn');
         }
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
   };
};
