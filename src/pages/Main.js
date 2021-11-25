import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addQuestions } from '../actions';
import Question from '../components/Question';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.randomizeArrays = this.randomizeArrays.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);

    this.state = {
      index: 0,
      click: false,
      second: 30,
      randomizedArrays: [],
    };
  }

  async componentDidMount() {
    const { questionsToState } = this.props;
    await questionsToState();
    this.randomizeArrays();
  }

  randomizeArrays() {
    const { questionsFromState } = this.props;
    const meio = 0.5;
    const menosUm = -1;
    const randomizedArrays = questionsFromState.map((element) => (
      [...element.incorrect_answers, element.correct_answer].sort(() => (
        (Math.random() > meio) ? 1 : menosUm))
    ));
    this.setState({ randomizedArrays });
  }

  nextQuestion() {
    const { index, click } = this.state;
    this.setState({ index: index + 1, click: !click, second: 30 });
  }

  handleClick() {
    const { click } = this.state;
    this.setState({ click: !click });
  }

  decreaseTime(second) {
    if (second === 0) {
      return this.setState({ second: 0, click: true });
    }
    this.setState({ second: second - 1 });
  }

  render() {
    const { index, click, randomizedArrays, second } = this.state;
    const { questionsFromState } = this.props;
    return (
      <div>
        <Header />
        { questionsFromState && randomizedArrays.length ? <Question
          question={ questionsFromState[index] }
          click={ click }
          index={ index }
          allQuestions={ randomizedArrays[index] }
          handleClick={ this.handleClick }
          second={ second }
          decreaseTime={ this.decreaseTime }
        /> : null }
        <button
          onClick={ this.nextQuestion }
          hidden={ !click }
          type="button"
          data-testid="btn-next"
        >
          Próxima
        </button>
      </div>
    );
  }
}

Main.propTypes = {
  questionsFromState: PropTypes.isRequired,
  questionsToState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  questionsToState: () => dispatch(addQuestions()),
});

const mapStateToProps = (state) => ({
  questionsFromState: state.main.questions.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
