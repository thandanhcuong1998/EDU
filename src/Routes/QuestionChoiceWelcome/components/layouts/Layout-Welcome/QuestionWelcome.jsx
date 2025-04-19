import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Icon } from '../Icon.jsx';
import { isObject } from '../../../../../Helpers/util.jsx';
import useQuestionWelcomeHook from '../../../../../Hooks/useQuestionWelcomeHook.jsx';
import { updateQuestionChoice } from '../../../../../Redux/Actions/QuestionSetWelcomeAction.jsx';
import { useDispatch } from 'react-redux';

const QuestionWelcome = props => {
    const { IDQuestionSet, title, listQuestionSet } = props;
    let location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        questionChoice,
        setQuestionChoice,
        progressBar,
        questionChoiceWelcome,
    } = useQuestionWelcomeHook(props);

    const [setAnswer] = useOutletContext();

    const handleSelected = (id, value) => {
        setAnswer({
            IDQuestionSet,
            questionChoice: { id, value },
        });

        setQuestionChoice(id);
    };

    const backQuestion = () => {
        const step = getValueURLParameters(location.pathname);
        if (step === 'proficiency') navigate(`/welcome/step=two`);
        if (step === 'dailyGoal') navigate(`/welcome/step=proficiency`);

        setAnswer({});
        dispatch(updateQuestionChoice({ IDQuestionSet }));
    };

    const getValueURLParameters = url => {
        const path = url;
        const stepPart = path.split('/').find(part => part.startsWith('step='));
        return stepPart ? stepPart.split('=')[1] : null; // Tách theo '='
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
                    {listQuestionSet.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={`d-flex align-items-end justify-content-center flex ${questionChoice === index ? 'active' : ''}`}
                                onClick={() =>
                                    handleSelected(Number(index), item)
                                }
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
                                    <span className="flex-grow-1">{item}</span> // Xử lý trường hợp không phải object
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default QuestionWelcome;
