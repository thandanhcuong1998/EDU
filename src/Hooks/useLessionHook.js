import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { isObject } from '../Helpers/util.jsx';
import {
   setAnswer,
   updateQuestionIndex,
} from '../Redux/Reducers/LessionQuestionChoiceReducer.jsx';
import { useNavigate } from 'react-router-dom';

export const useLessionHook = () => {
   const navigation = useNavigate();
   const dispatch = useDispatch();
   const isCorrect = useSelector(
      state => state.LessionQuestionChoice.isCorrect
   );
   const progressBar = useSelector(
      state => state.LessionQuestionChoice.progressBar
   );

   const [isActiveButtonContinue, setIsActiveButtonContinue] = useState(false);
   const [answerState, setAnswerState] = useState([]);

   // Tính toán giá trị buttonValue
   const buttonValue = useMemo(() => {
      if (isCorrect === true) return 'Continue';
      if (isCorrect === false) return 'Not correct';
      if (progressBar === 100) return 'Finish';

      return 'Check';
   }, [isCorrect]);

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

   const handleButtonClick = () => {
      if (isCorrect === null) {
         checkAnswer();
      } else if (progressBar === 100) {
         navigation('/learn');
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
