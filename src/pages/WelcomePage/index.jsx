import { useState, useCallback } from 'react';
import './index.css';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from '@/shared/lib/util.jsx';
import { updateProgress } from '@/features/welcome/state/welcomeSlice.js';

const Welcome = ({ stepWelcome }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const questions = useSelector(state => state.welcome.questions);

    const getValueURLParameters = url => {
        const stepPart = url.split('/').find(part => part.startsWith('step='));
        return stepPart?.split('=')[1] || null;
    };

    const currentStep = getValueURLParameters(location.pathname);

    const handleChangeScreenWelcome = () => {
        dispatch(updateProgress());

        if (currentStep === 'dailyGoal') {
            setIsLoading(true);
            setTimeout(() => {
                navigate('/learn');
            }, 2000); // 2-second loading simulation
            return;
        }

        if (isEmpty(currentStep)) {
            navigate(`/welcome/step=${stepWelcome}`);
        } else {
            const stepMap = {
                two: 'proficiency',
                proficiency: 'dailyGoal',
            };
            const nextStep = stepMap[currentStep];
            if (nextStep) {
                navigate(`/welcome/step=${nextStep}`);
            }
        }
    };
    
    const isButtonDisabled = useCallback(() => {
        if (currentStep === 'two') {
            return false;
        }
        return !questions.some(q => q.id === currentStep);
    }, [currentStep, questions]);

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
                            onClick={handleChangeScreenWelcome}
                            disabled={isButtonDisabled()}
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
