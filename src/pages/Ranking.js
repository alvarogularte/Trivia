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
      <div className="ranking-main">
        <div data-testid="ranking-title" className="ranking-title">
          <h1>Ranking</h1>
        </div>
        <div className="ranking-list">
          { sortedRanking.map(({ name, picture, score }, index) => (
            <div key={ index } className="ranking-card">
              <p className={ index + 1 }>
                { index + 1 }
                º
              </p>
              <img src={ picture } alt={ name } />
              <p
                data-testid={ `player-name-${index}` }
                className="ranking-name"
              >
                { name }
              </p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </div>
          )) }
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Voltar ao inicio

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
