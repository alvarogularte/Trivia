import PropTypes from 'prop-types';
import React from 'react';

class Answers extends React.Component {
  render() {
    const { answer, color, handleScore, click, index, handleClick } = this.props;
    return (
      <button
        data-testid={ color === 'green' ? 'correct-answer' : `wrong-answer-${index}` }
        onClick={ click ? null : handleScore && handleClick }
        type="button"
        name={ answer }
        className={ click ? color : null }
      >
        { answer }
      </button>
    );
  }
}

Answers.propTypes = {
  answer: PropTypes.string.isRequired,
  click: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  handleScore: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Answers;
