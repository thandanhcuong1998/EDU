import { useState } from 'react';
import './index.css';
import { Outlet } from 'react-router-dom';
import { useWelcomeNavigation } from '@/features/welcome/hooks/useWelcomeNavigation.js';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUserProgress } from '@/features/user-profile/state/UserProgressReducer.jsx';

const Welcome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleNext, isNextDisabled, currentStepId } = useWelcomeNavigation();
    const dispatch = useDispatch();
    const welcomeQuestions = useSelector(state => state.welcome.questions);

    const handleContinue = () => {
        if (currentStepId === 'dailyGoal') {
            dispatch(initializeUserProgress(welcomeQuestions));
            setIsLoading(true);
            setTimeout(() => {
                handleNext(); // Navigate to /learn after timeout
            }, 2000); // 2-second loading simulation
            return;
        }
        handleNext();
    };

    if (isLoading) {
        return (
            <div className="w-1000 height-80vh d-flex justify-content-center align-items-center">
                <h3 className="text-white">Generating your personalized learning plan...</h3>
            </div>
        );
    }

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-md-12">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="footer-welcome">
                <div className="content d-flex justify-content-around align-items-center">
                    <div className=""></div>
                    <div className="button">
                        <button
                            onClick={handleContinue}
                            disabled={isNextDisabled()}
                        >
                            Tiếp Tục
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Welcome;
