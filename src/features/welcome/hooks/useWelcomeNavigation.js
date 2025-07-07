
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStepConfig } from '../welcomeFlow.js';
import { updateProgress } from '../state/welcomeSlice.js';

export const useWelcomeNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const questions = useSelector(state => state.welcome.questions);

    const getCurrentStepId = useCallback(() => {
        const stepPart = location.pathname.split('/').find(part => part.startsWith('step='));
        return stepPart?.split('=')[1] || 'one';
    }, [location.pathname]);

    const currentStepId = getCurrentStepId();
    const stepConfig = getStepConfig(currentStepId);

    const navigateTo = useCallback((stepId) => {
        const config = getStepConfig(stepId);
        if (config) {
            navigate(`/welcome/${config.path}`);
        }
    }, [navigate]);

    const handleNext = useCallback(() => {
        dispatch(updateProgress());
        if (stepConfig && stepConfig.next) {
            navigateTo(stepConfig.next);
        } else {
            // Last step, navigate to the main app
            navigate('/learn');
        }
    }, [stepConfig, navigateTo, navigate, dispatch]);

    const handleBack = useCallback(() => {
        if (stepConfig && stepConfig.previous) {
            navigateTo(stepConfig.previous);
        }
    }, [stepConfig, navigateTo]);

    const isNextDisabled = useCallback(() => {
        if (!stepConfig?.isQuestion) {
            // Not a question step, button is always enabled
            return false;
        }
        // Is a question step, check if an answer has been selected
        return !questions.some(q => q.id === currentStepId && q.questionChoice);
    }, [stepConfig, currentStepId, questions]);

    return { handleNext, handleBack, isNextDisabled, currentStepId };
};
