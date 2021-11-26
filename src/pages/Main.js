import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addQuestions, addScore } from '../actions';
import Question from '../components/Question';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.randomizeArrays = this.randomizeArrays.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    // this.stateLocalStorage = this.stateLocalStorage.bind(this);

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
    // this.stateLocalStorage();
  }

  // stateLocalStorage() {
  //   const { gravatarEmail, name } = this.props;
  //   const player = {
  //     name,
  //     assertions: 0,
  //     score: 0,
  //     gravatarEmail,
  //   };
  //   localStorage.setItem('state', JSON.stringify({ player }));
  // }

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
    const four = 4;
    if (index === four) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({ index: index + 1, click: !click, second: 30 });
  }

  handleClick({ target: { value } }) {
    const { click } = this.state;
    this.setState({ click: !click });
    if (value === 'green') {
      const scoreValues = {
        hard: 3,
        medium: 2,
        easy: 1,
      };
      const { questionsFromState, score } = this.props;
      const { index, second } = this.state;
      const { difficulty } = questionsFromState[index];
      const ten = 10;
      const earnedPoints = ten + (second * scoreValues[difficulty]);
      const then = JSON.parse(localStorage.getItem('state'));

      console.log(then.player.score);

      const now = {
        player: {
          ...then.player,
          score: then.player.score + earnedPoints,
          assertions: then.player.assertions + 1,
        },
      };

      localStorage.setItem('state', JSON.stringify(now));
      score(earnedPoints);
    }
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
  score: PropTypes.func.isRequired,
  history: PropTypes.isRequired,
  // gravatarEmail: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  questionsToState: () => dispatch(addQuestions()),
  score: (score) => dispatch(addScore(score)),
});

const mapStateToProps = (state) => ({
  questionsFromState: state.main.questions.results,
  gravatarEmail: state.login.email,
  name: state.login.username,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
