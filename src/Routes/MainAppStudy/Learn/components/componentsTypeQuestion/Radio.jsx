import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../../../../Helpers/util.jsx';

export default function Radio({
   listConfigQuestion,
   classRoot,
   handleAnswer,
   isCorrectRedux,
}) {
   // add. services

   // add states
   const [isChecked, setChecked] = useState(null);

   // use effect
   // add functions
   const hanldeChoiceAnswer = (value, index) => {
      if (!isEmpty(index)) {
         handleAnswer([
            {
               answer: value,
               index: index + 1,
            },
         ]);
         setChecked(index);
      }
   };

   const getClassNames = index => {
      const isCheckedIndex = !isEmpty(isChecked) && isChecked === index;
      return `options d-flex justify-content-center align-items-center flex-column ${isCheckedIndex ? 'selected' : ''} ${isCheckedIndex && isCorrectRedux === true ? 'success' : isCorrectRedux === false ? 'isFail' : ''}`;
   };

   return (
      <div className={classRoot}>
         <h3 className="text-white m-5">{listConfigQuestion.title}</h3>
         <div
            className={`content-question d-flex justify-content-around align-items-center ${isCorrectRedux === true ? 'no-select' : ''}`}
         >
            {listConfigQuestion?.options?.map((option, index) => (
               <div
                  key={index}
                  className={`${getClassNames(index)} `}
                  onClick={() => {
                     hanldeChoiceAnswer(option, index);
                  }}
               >
                  <img src={listConfigQuestion?.images[index]} alt="option" />
                  <ruby>
                     {option}
                     <rp>(</rp>
                     <rt>{listConfigQuestion?.pronunciation[index]}</rt>
                     <rp>)</rp>
                  </ruby>
               </div>
            ))}
         </div>
      </div>
   );
}
