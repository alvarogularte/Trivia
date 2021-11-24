import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { saveToken } from '../services/token';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.disabled = this.disabled.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.disabled);
  }

  disabled() {
    const { username, email } = this.state;
    if (email.includes('@' && '.com') && username.length > 0) {
      this.setState({
        disabled: false,
      });
    }
  }

  async handleClick() {
    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => saveToken(response.token));
    const { history } = this.props;
    history.push('/main');
  }

  render() {
    const { email, disabled } = this.state;
    return (
      <form>
        <label htmlFor="login">
          Usuário:
          <input
            type="text"
            name="username"
            id="login"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="input-gravatar-email">
          E-mail:
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          name="disabled"
          disabled={ disabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
