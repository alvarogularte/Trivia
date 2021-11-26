import React from 'react';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div data-testid="ranking-title">
        Olá
      </div>
    );
  }
}

export default Ranking;
