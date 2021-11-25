import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, username } = this.props;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          data-testid="header-profile-picture"
          alt="userAvatar"
        />
        <p data-testid="header-player-name">{ username }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  username: state.login.username });

export default connect(mapStateToProps)(Header);
