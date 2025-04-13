import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ListQuestionsSet } from '../Helpers/ListQuestionSetWelcome.jsx';

const useQuestionWelcomeHook = props => {
  const [progressBar, setProgressBar] = useState(0);
  const questionChoiceWelcome = useSelector(
    state => state.questionChoiceWelcome
  );

  const [questionChoice, setQuestionChoice] = useState(null);

  const handleProgressPercentage = () => {
    // Tính toán điểm hoàn thành
    const completedQuestions = questionChoiceWelcome.length; // Giả sử `value` là cách xác định câu hỏi đã hoàn thành
    setProgressBar(
      (completedQuestions / Object.keys(ListQuestionsSet).length) * 100
    );
  };

  useEffect(() => {
    handleProgressPercentage();
    setQuestionChoice(null);
  }, [questionChoiceWelcome]);

  return {
    questionChoice,
    setQuestionChoice,
    progressBar,
    questionChoiceWelcome,
  };
};

export default useQuestionWelcomeHook;
