import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.decrease = this.decrease.bind(this);
  }

  componentDidMount() {
    const thousand = 1000;
    setInterval(this.decrease, thousand);
  }

  decrease() {
    const { decreaseTime, second } = this.props;
    decreaseTime(second);
  }

  render() {
    const { second } = this.props;
    return (
      <div>
        { second }
      </div>
    );
  }
}

Stopwatch.propTypes = {
  decreaseTime: PropTypes.func.isRequired,
  second: PropTypes.number.isRequired,
};

export default Stopwatch;
