import React from 'react';
import PropTypes from 'prop-types';

/**
 * SelectedAnswers component renders the list of selected answers with drag-and-drop functionality
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of card word question (card-word-japan or card-word-english)
 * @param {Array} props.answers - List of selected answers
 * @param {Function} props.onDragStart - Function to call when drag starts
 * @param {Function} props.onDragOver - Function to call when dragging over
 * @param {Function} props.onDrop - Function to call when dropping
 * @param {Function} props.onDragEnd - Function to call when drag ends
 * @param {Function} props.onRemove - Function to call when removing an answer
 * @returns {React.ReactElement|null} The rendered SelectedAnswers component or null if no answers
 */
const SelectedAnswers = ({
  type,
  answers,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onRemove
}) => {
  if (!answers?.length) return null;

  const renderAnswerItem = (item, index) => (
    <li
      key={index}
      className="no-select"
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
      onDragEnd={onDragEnd}
      onClick={() => onRemove(item.index)}
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

  return <ul className="list-answer">{answers.map(renderAnswerItem)}</ul>;
};

SelectedAnswers.propTypes = {
  type: PropTypes.oneOf(['card-word-english', 'card-word-japan']).isRequired,
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          text: PropTypes.string,
          pronunciation: PropTypes.string
        })
      ]),
      index: PropTypes.number
    })
  ),
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

SelectedAnswers.defaultProps = {
  answers: []
};

export default SelectedAnswers;