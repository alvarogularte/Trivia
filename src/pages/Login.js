import React, { Component } from 'react';

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

  // handleClick() {
  //   const { history } = this.props;
  //   history.push('/')
  // }

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
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
