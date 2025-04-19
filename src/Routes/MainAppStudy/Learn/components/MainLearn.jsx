import { ArrowLeft, NotebookText, Star } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainLearn({ children }) {
    const [isClickCourse, setIsClickCourse] = useState(false);
    const navigate = useNavigate();

    const onHandleClickCourse = () => {
        setIsClickCourse(prev => !prev);
    };

    const onHandleStartLession = () => {
        navigate('/lession');
    };

    return (
        <section className="section-1">
            <div className="top-header d-flex justify-content-between align-items-center">
                <div className="heading d-flex justify-content-center align-items-start flex-column">
                    <a className="d-flex">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Section 1, unit 1</span>
                    </a>
                    <p>order food</p>
                </div>
                <div className="tips d-flex justify-content-around align-items-center">
                    <NotebookText className="w-8 h-8" />
                    guidebook
                </div>
            </div>
            <div className="line-study d-flex justify-content-center align-items-center">
                <ul className="step-course">
                    <li
                        className={`course position-relative ${isClickCourse ? 'click' : ''}`}
                        onClick={onHandleClickCourse}
                    >
                        <Star size={42} />
                        <div className="tooltiptext">
                            <p>Order food</p>
                            <p>Lession 1 of 4</p>
                            <button onClick={onHandleStartLession}>
                                click me now
                            </button>
                        </div>
                    </li>
                    <li className="course position-relative r-64px not-active">
                        <Star size={42} color="rgb(77, 89, 97)" />
                    </li>
                    <li className="course position-relative r-120px not-active">
                        <Star size={42} color="rgb(77, 89, 97)" />
                    </li>
                    <li className="course position-relative r-64px not-active">
                        <Star size={42} color="rgb(77, 89, 97)" />
                    </li>
                    <li className="course position-relative not-active">
                        <Star size={42} color="rgb(77, 89, 97)" />
                    </li>
                </ul>

                <div className="lottie">
                    <DotLottieReact
                        src="https://lottie.host/65f6a290-041f-42a6-89b5-82a9db439420/iQt8TS5rAz.json"
                        loop
                        autoplay
                    />
                </div>
            </div>
        </section>
    );
}
