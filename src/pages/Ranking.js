import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { clearStore } from '../actions';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    const { history, clearScore } = this.props;
    clearScore();
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = [...ranking].sort((a, b) => {
      const menosUm = -1;
      if (a.score < b.score) {
        return 1;
      } if (a.score > b.score) {
        return menosUm;
      } return 0;
    });
    return (
      <div>
        <div data-testid="ranking-title">
          Ranking:
        </div>
        <div>
          { sortedRanking.map(({ name, picture, score }, index) => (
            <div key={ index }>
              <img src={ picture } alt={ name } />
              <p data-testid={ `player-name-${index}` }>{ name }</p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </div>
          )) }
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Retornar

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  clearScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearScore: () => dispatch(clearStore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
