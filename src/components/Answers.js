import PropTypes from 'prop-types';
import React from 'react';

class Answers extends React.Component {
  render() {
    const { answer, color, click, index, handleClick } = this.props;
    return (
      <button
        data-testid={ color === 'green' ? 'correct-answer' : `wrong-answer-${index}` }
        onClick={ click ? null : handleClick }
        type="button"
        value={ color }
        disabled={ click }
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
  handleClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Answers;
