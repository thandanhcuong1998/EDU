import ProgressBar from 'react-bootstrap/ProgressBar';
import { CheckmarkCircleOutline, CloseCircleOutline } from 'react-ionicons';
import Question from '../Question.jsx';
import { useLessionHook } from '../../../../../Hooks/useLessionHook.js';
import ListQuestionFakeDataLession from '../../../../../Helpers/ListQuestionFakeDataLession.jsx';

export default function Lession() {
   const {
      isActiveButtonContinue,
      buttonValue,
      setAnswerState,
      handleButtonClick,
      isCorrect,
      progressBar,
   } = useLessionHook();
   return (
      <>
         <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="row">
               <div className="col-md-12">
                  <div className="w-1000 height-80vh">
                     <div className="header-top d-flex align-items-center">
                        <ProgressBar
                           now={progressBar}
                           style={{ width: '950px' }}
                        />
                     </div>
                     <div className="question-step text-white d-flex justify-content-center align-items-center flex-column">
                        <Question
                           questions={
                              ListQuestionFakeDataLession.N5.orderFood.level1
                           }
                           isCorrectRedux={isCorrect}
                           setAnswerState={setAnswerState}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="footer-lession">
            <div className="content-footer content d-flex justify-content-around align-items-center">
               <div
                  className={`status-resutl-question d-flex justify-content-center align-items-center ${isCorrect === null ? '' : isCorrect ? 'success' : 'isFail'}`}
               >
                  {isCorrect ? (
                     <>
                        <CheckmarkCircleOutline
                           color={'#7eb137'}
                           height="80px"
                           width="80px"
                           className="icon-circle-check"
                        />
                        <div className="text">
                           <p>Great job</p>
                        </div>
                     </>
                  ) : isCorrect === false ? (
                     <>
                        <CloseCircleOutline
                           color={'#bb4b42'}
                           height="80px"
                           width="80px"
                           className="icon-circle-check"
                        />
                        <div className="text">
                           <p>Not Correct</p>
                        </div>
                     </>
                  ) : (
                     <></>
                  )}
               </div>
               <div className="button">
                  <button
                     onClick={handleButtonClick}
                     className={`${!isActiveButtonContinue ? 'disabled' : ''} ${isCorrect === null ? '' : isCorrect ? 'success' : 'isFail'}`}
                  >
                     {buttonValue}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}
