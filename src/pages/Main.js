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

    this.state = {
      index: 0,
      click: false,
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
    const chato = 0.5;
    const chatoo = -1;
    const randomizedArrays = questionsFromState.map((element) => (
      [...element.incorrect_answers, element.correct_answer].sort(() => (
        (Math.random() > chato) ? 1 : chatoo))
    ));
    this.setState({ randomizedArrays });
  }

  nextQuestion() {
    const { index, click } = this.state;
    this.setState({ index: index + 1, click: !click });
  }

  handleClick() {
    const { click } = this.state;
    this.setState({ click: !click });
  }

  render() {
    const { index, click, randomizedArrays } = this.state;
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
        /> : null }
        <button onClick={ this.nextQuestion } type="button">Próxima</button>
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
