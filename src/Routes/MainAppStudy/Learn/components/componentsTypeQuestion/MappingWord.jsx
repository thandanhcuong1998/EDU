import { useEffect, useState } from 'react';
import { deepClone, isEmpty } from '../../../../Helpers/util.jsx';
import { setAnswer } from '../../../../Redux/Actions/LessionQuestionChoiceAction.jsx';
import { useDispatch } from 'react-redux';

export default function MappingWord({ listConfigQuestion, classRoot }) {
  const dispatch = useDispatch();

  const [activeOptions, setActiveOptions] = useState({
    option1: null,
    option2: null,
  });

  const [optionsState, setOptionsState] = useState({
    options1: listConfigQuestion.options1.map(option => ({
      ...option,
      isCorrect: false,
    })),
    options2: listConfigQuestion.options2.map(option => ({
      ...option,
      isCorrect: false,
    })),
  });

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [zoomClass, setZoomClass] = useState({ option1: '', option2: '' });

  const onHandleSelected = (typeOption, index) => {
    if (typeOption === 'option1' && optionsState.options1[index].isCorrect)
      return;
    if (typeOption === 'option2' && optionsState.options2[index].isCorrect)
      return;

    setActiveOptions(prev => ({ ...prev, [typeOption]: index }));
    setZoomClass(prev => ({ ...prev, [typeOption]: index }));

    setTimeout(() => {
      setZoomClass(prev => ({ ...prev, [typeOption]: '' })); // Không cần zoom-out nữa
    }, 500); // Thời gian để zoom out
  };

  useEffect(() => {
    const { option1, option2 } = activeOptions;

    if (option1 !== null && option2 !== null) {
      const timer = setTimeout(() => {
        const correctIndex = optionsState.options1[option1].indexCorrect - 1;
        const isCorrect = correctIndex === option2;

        if (isCorrect) {
          setShowSuccess(true);

          setOptionsState(prevState => {
            const newOptions1 = prevState.options1.map((opt, idx) => ({
              ...opt,
              isCorrect: opt.isCorrect || idx === option1,
            }));

            const newOptions2 = prevState.options2.map((opt, idx) => ({
              ...opt,
              isCorrect: opt.isCorrect || idx === option2,
            }));

            return { options1: newOptions1, options2: newOptions2 };
          });

          setTimeout(() => {
            setActiveOptions({ option1: null, option2: null }); // Reset active options
            setShowSuccess(false);
          }, 500);
        } else {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
            setActiveOptions({ option1: null, option2: null });
          }, 500);
        }
      }, 200); // Thời gian chờ 1000ms

      return () => clearTimeout(timer);
    }
  }, [activeOptions]);

  useEffect(() => {
    const checkIsCorrect = optionsState.options1.find(
      item => item.isCorrect === false
    );
    if (checkIsCorrect === undefined || checkIsCorrect === '') {
      dispatch(setAnswer({ type: classRoot }));
    }
  }, [showSuccess]);

  return (
    <div
      className={`${classRoot} d-flex justify-content-start flex-column align-items-start`}
    >
      <h3 className="text-white">{listConfigQuestion.title}</h3>
      <div className="content-answer d-flex justify-content-between align-items-center">
        <ul className="list-answer">
          {optionsState.options1.map((item, index) => (
            <li
              onClick={() => onHandleSelected('option1', index)}
              key={index}
              className={`d-flex justify-content-between align-items-center ${zoomClass.option1 === index ? 'zoom-in' : ''} ${activeOptions.option1 === index ? 'active-mapping' : ''} ${showError && activeOptions.option1 === index ? 'error-option' : ''} ${optionsState.options1[index].isCorrect ? 'success-option' : ''}`}
            >
              <span className={`index-answer`}>{index + 1}</span>
              <ruby>
                {item.text}
                <rp>(</rp>
                <rt>{item?.pronunciation}</rt>
                <rp>)</rp>
              </ruby>
              <span></span>
            </li>
          ))}
        </ul>
        <ul className="list-answer2 options2">
          {optionsState.options2.map((item, index) => (
            <li
              onClick={() => onHandleSelected('option2', index)}
              key={index}
              className={`d-flex justify-content-between align-items-center ${zoomClass.option2 === index ? 'zoom-in' : ''} ${activeOptions.option2 === index ? 'active-mapping' : ''} ${showError && activeOptions.option2 === index ? 'error-option' : ''} ${optionsState.options2[index].isCorrect ? 'success-option' : ''}`}
            >
              <span className={`index-answer`}>{index + 1}</span>
              {item.text}
              <span></span>
            </li>
          ))}
        </ul>
      </div>
      {showSuccess && (
        <div className="success-message" style={{ color: '#37464F' }}>
          Correct!
        </div>
      )}
      {showError && (
        <div className="error-message" style={{ color: 'red' }}>
          Incorrect!
        </div>
      )}
    </div>
  );
}
