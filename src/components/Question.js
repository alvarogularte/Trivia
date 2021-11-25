import PropTypes from 'prop-types';
import React from 'react';
import Answers from './Answers';
import Stopwatch from './Stopwatch';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.handleScore = this.handleScore.bind(this);

    this.state = {
      score: 0,
    };
  }

  handleScore({ target }) {
    const { name } = target;
    const { question } = this.props;
    const { click, score } = this.state;
    if (name === question.correct_answer) {
      return this.setState({ click: !click, score: score + 1 });
    }
    return this.setState({ click: !click });
  }

  render() {
    const { score } = this.state;
    const { question, click, index, handleClick,
      allQuestions, second, decreaseTime } = this.props;
    return (
      <div>
        <span>{ score }</span>
        <div>
          <h4 data-testid="question-category">{ question.category }</h4>
          <p data-testid="question-text">{ question.question }</p>
        </div>
        { allQuestions.map((element, key) => (
          <Answers
            correct={ question.correct_answer }
            answer={ element }
            color={ element === question.correct_answer ? 'green' : 'red' }
            key={ key }
            index={ index }
            handleScore={ this.handleScore }
            handleClick={ handleClick }
            click={ click }
          />
        )) }
        <span>
          { click ? second : <Stopwatch
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
