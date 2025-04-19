import { useEffect, useState } from 'react';
import './assets/index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    setQuestionChoice,
    updateQuestionChoice,
} from '../../Redux/Actions/QuestionSetWelcomeAction.jsx';
import { isEmpty, isObject } from '../../Helpers/util.jsx';
import { ListQuestionsSet } from '../../Helpers/ListQuestionSetWelcome.jsx';
import questionWelcome from './components/layouts/Layout-Welcome/QuestionWelcome.jsx';

const Welcome = ({ stepWelcome }) => {
    const dispatch = useDispatch();

    const [answer, setAnswer] = useState({});

    const navigate = useNavigate();
    let location = useLocation();

    const questionChoiceWelcome = useSelector(
        state => state.questionChoiceWelcome
    );

    const handleChangeScreenWelcome = () => {
        const step = getValueURLParameters(location.pathname);

        if (isEmpty(step)) {
            navigate(`/welcome/step=${stepWelcome}`);
        } else {
            const stepMap = {
                two: 'proficiency',
                proficiency: 'dailyGoal',
            };
            navigate(`/welcome/step=${stepMap[step] || step}`);
        }

        if (answer.IDQuestionSet) {
            dispatch(setQuestionChoice(answer));
            setAnswer({});
        }
    };

    const getValueURLParameters = url => {
        const stepPart = url.split('/').find(part => part.startsWith('step='));
        return stepPart?.split('=')[1] || null;
    };

    useEffect(() => {
        if (
            Object.keys(ListQuestionsSet).length ===
            questionChoiceWelcome.length
        )
            navigate('/learn');
    }, [answer]);

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-md-12">
                        <Outlet context={[setAnswer]} />
                    </div>
                </div>
            </div>
            <div className="footer-welcome">
                <div className="content d-flex justify-content-around align-items-center">
                    <div className=""></div>
                    <div className="button">
                        <button
                            onClick={handleChangeScreenWelcome}
                            className={`${Object.keys(answer).length === 0 ? 'disabled' : ''}`}
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
