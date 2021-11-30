import PropTypes from 'prop-types';
import React from 'react';
import Answers from './Answers';
import Stopwatch from './Stopwatch';

class Question extends React.Component {
  render() {
    const { question, click, index, handleClick,
      allQuestions, second, decreaseTime } = this.props;
    return (
      <div>
        <div>
          <h4 data-testid="question-category">
            Category
            {' '}
            { question.category }
          </h4>
          <p data-testid="question-text">{ question.question }</p>
        </div>
        <div className="answers">
          { allQuestions.map((element, key) => (
            <Answers
              correct={ question.correct_answer }
              answer={ element }
              color={ element === question.correct_answer ? 'green' : 'red' }
              key={ key }
              index={ index }
              handleClick={ handleClick }
              click={ click }
            />
          )) }
        </div>
        <span>
          { click ? <Stopwatch second={ second } /> : <Stopwatch
            decreaseTime={ decreaseTime }
            second={ second }
          /> }
        </span>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.string,
    map: PropTypes.func,
    question: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  click: PropTypes.bool.isRequired,
  allQuestions: PropTypes.isRequired,
  second: PropTypes.number.isRequired,
  decreaseTime: PropTypes.func.isRequired,
};

export default Question;
