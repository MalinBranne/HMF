
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RedirectIfAuthenticated from '../Auth/components/RedirectIfAuthenticated';
import { register } from '../Auth/actions';
import { RegisterForm } from '../Auth';

class RegisterScreen extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    signUp: PropTypes.func.isRequired
  }

  handleSubmit(values) {
    const { signUp, history } = this.props;
    const user = {
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
      role: values.role
    };
    signUp(user, history);
  }

  render() {
    return (
      <RedirectIfAuthenticated>
        <RegisterForm onSubmit={(values) => this.handleSubmit(values)} />
        <Link to="/login">Log in</Link>
      </RedirectIfAuthenticated>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (user, history) => dispatch(register(user, history)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterScreen);