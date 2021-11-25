import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveToken } from '../services/token';
import { addEmail } from '../actions';

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
    this.goToConf = this.goToConf.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.disabled);
  }

  goToConf() {
    const { history } = this.props;
    history.push('/conf');
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
    const { history, saveUser } = this.props;

    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => saveToken(response.token));

    saveUser(this.state);
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
        <button
          type="button"
          name="config"
          data-testid="btn-settings"
          onClick={ this.goToConf }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveUser: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (state) => dispatch(addEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
