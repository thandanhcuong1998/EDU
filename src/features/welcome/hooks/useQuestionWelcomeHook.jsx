import { useSelector } from 'react-redux';
import { useState } from 'react';

const useQuestionWelcomeHook = () => {
    const { questions, progress } = useSelector(state => state.welcome);
    const [questionChoice, setQuestionChoice] = useState(null);

    return {
        questionChoice,
        setQuestionChoice,
        progressBar: progress, // Đổi tên để tương thích với component
        questionChoiceWelcome: questions, // Đổi tên để tương thích
    };
};

export default useQuestionWelcomeHook;
