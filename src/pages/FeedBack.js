import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FeedBackContent from '../components/FeedBackContent';

class FeedBack extends React.Component {
  constructor() {
    super();
    this.playAgain = this.playAgain.bind(this);
    this.ranking = this.ranking.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  ranking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <FeedBackContent />
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgain }
        >
          Jogar novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.ranking }
        >
          Ver Ranking
        </button>
      </div>);
  }
}

FeedBack.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FeedBack;
