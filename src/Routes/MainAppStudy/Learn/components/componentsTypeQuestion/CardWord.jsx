import useCardWordHook from '../../../../../Hooks/useCardWordHook.jsx';
import { playApiAudio } from '../../../../../Helpers/util.jsx';

export default function CardWord({
   listConfigQuestion,
   classRoot,
   handleAnswer,
   type,
}) {
   const {
      listAnswer,
      onHandleAnswer,
      removeAnswer,
      handleDragStart,
      handleDrop,
      handleDragEnd,
      handleDragOver,
   } = useCardWordHook(handleAnswer, type);

   return (
      <div
         className={`${classRoot} d-flex justify-content-start flex-column align-items-start`}
      >
         <h3 className="text-white">{listConfigQuestion.title}</h3>
         <div className="content-question d-flex justify-content-start align-items-baseline">
            <ListOptionsByType
               type={type}
               listConfigQuestion={listConfigQuestion}
            />
         </div>
         <div className="answer-choice">
            <ListAnswerChoicedByType
               listAnswer={listAnswer}
               handleDragStart={handleDragStart}
               handleDragOver={handleDragOver}
               handleDrop={handleDrop}
               handleDragEnd={handleDragEnd}
               removeAnswer={removeAnswer}
               type={type}
            />
         </div>

         <div className="content-answer">
            <ListContentAnswer
               type={type}
               listConfigQuestion={listConfigQuestion}
               listAnswer={listAnswer}
               onHandleAnswer={onHandleAnswer}
            />
         </div>
      </div>
   );
}

const ListOptionsByType = ({ type, listConfigQuestion }) => {
   const { hintToken, pronunciation } = listConfigQuestion || {};
   const handleOnHover = romaji => {
      playApiAudio(romaji); // call api text to speed
   };

   if (type === 'card-word-english') {
      return (
         <>
            {hintToken?.map((option, index) => (
               <div className="options" key={index}>
                  <ruby
                     onMouseEnter={() => {
                        handleOnHover(option?.text);
                     }}
                  >
                     {option?.text}
                     <rp>(</rp>
                     <rt>{option?.pronunciation}</rt>
                     <rp>)</rp>
                  </ruby>
               </div>
            ))}
         </>
      );
   }

   return <p>{hintToken}</p>;
};

const ListAnswerChoicedByType = ({
   type,
   listAnswer,
   handleDragStart,
   handleDragOver,
   handleDrop,
   handleDragEnd,
   removeAnswer,
}) => {
   if (listAnswer?.length === 0) return null;

   const renderAnswerItem = (item, index) => (
      <li
         key={index}
         className="no-select"
         draggable
         onDragStart={() => handleDragStart(index)}
         onDragOver={handleDragOver}
         onDrop={() => handleDrop(index)}
         onDragEnd={handleDragEnd}
         onClick={() => removeAnswer(item.index)}
      >
         {type === 'card-word-english' ? (
            item.answer
         ) : (
            <ruby>
               {item?.answer?.text}
               <rp>(</rp>
               <rt>{item?.answer?.pronunciation}</rt>
               <rp>)</rp>
            </ruby>
         )}
      </li>
   );

   return <ul className="list-answer">{listAnswer.map(renderAnswerItem)}</ul>;
};

const ListContentAnswer = ({
   type,
   listConfigQuestion,
   listAnswer,
   onHandleAnswer,
}) => {
   const renderAnswerItem = (item, index) => {
      const isActive = listAnswer.some(answer => answer.index === index);
      return (
         <li
            className={`no-select ${isActive ? 'selected' : ''}`} // Sử dụng isActive để thêm class
            key={index}
            onClick={() => onHandleAnswer(item, index)}
         >
            {type === 'card-word-english' ? (
               item
            ) : (
               <ruby>
                  {item.text}
                  <rp>(</rp>
                  <rt>{item.pronunciation}</rt>
                  <rp>)</rp>
               </ruby>
            )}
         </li>
      );
   };

   return (
      <ul className="list-answer">
         {listConfigQuestion?.options?.map(renderAnswerItem)}
      </ul>
   );
};
