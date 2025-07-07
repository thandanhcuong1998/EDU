import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch } from 'react-redux';
import { Icon } from '../../../shared/components/Icon.jsx';
import { isObject } from '../../../shared/lib/util.jsx';
import useQuestionWelcomeHook from '../hooks/useQuestionWelcomeHook.jsx';
import { setQuestionChoice as setQuestionChoiceAction, removeQuestionChoice } from '../state/welcomeSlice.js';
import { useEffect } from 'react';

const QuestionWelcome = ({ IDQuestionSet, title, listQuestionSet }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        questionChoice,
        setQuestionChoice,
        progressBar,
        questionChoiceWelcome
    } = useQuestionWelcomeHook();

    useEffect(() => {
        const currentQuestion = questionChoiceWelcome.find(q => q.id === IDQuestionSet);
        if (currentQuestion) {
            setQuestionChoice(currentQuestion.questionChoice.id);
        } else {
            setQuestionChoice(null);
        }
    }, [IDQuestionSet, questionChoiceWelcome, setQuestionChoice]);

    const handleSelected = (id, value) => {
        dispatch(setQuestionChoiceAction({
            IDQuestionSet,
            questionChoice: { id, value },
        }));
        setQuestionChoice(id);
    };

    const backQuestion = () => {
        const step = getValueURLParameters(location.pathname);
        if (step === 'proficiency') navigate('/welcome/step=two');
        if (step === 'dailyGoal') navigate('/welcome/step=proficiency');

        dispatch(removeQuestionChoice({ IDQuestionSet }));
    };

    const getValueURLParameters = url => {
        const path = url;
        const stepPart = path.split('/').find(part => part.startsWith('step='));
        return stepPart ? stepPart.split('=')[1] : null;
    };

    return (
        <div className="w-1000 height-80vh">
            <div className="header-top d-flex align-items-center align-content-center">
                <Icon
                    className="cursor-pointer"
                    iconName="ArrowLeftShort"
                    width={35}
                    height={35}
                    style={{ color: 'rgb(77, 89, 97)' }}
                    onClick={backQuestion}
                />
                <ProgressBar now={progressBar} style={{ width: '950px' }} />
            </div>
            <h3 className="text-white m-5">{title}</h3>
            <div className="question-step text-white d-flex justify-content-center align-items-center">
                <ul className="list-question-step">
                    {listQuestionSet.map((item, index) => (
                        <li
                            key={index}
                            className={`d-flex align-items-end justify-content-center flex ${questionChoice === index ? 'active' : ''}`}
                            onClick={() => handleSelected(Number(index), item)}
                        >
                            <Icon
                                iconName={`Reception${index}`}
                                width={35}
                                height={35}
                            />
                            {isObject(item) ? (
                                <>
                                    <span className="flex-grow-1">
                                        {item.content}
                                    </span>
                                    <span>{item.subContent}</span>
                                </>
                            ) : (
                                <span className="flex-grow-1">{item}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuestionWelcome;
