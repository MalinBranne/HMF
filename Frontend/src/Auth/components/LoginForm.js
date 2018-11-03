import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialButton from '@material-ui/core/Button';

const styles = theme => ({
  root: {

  },
  view: {
    height: '200px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,

  },
  dense: {
    marginTop: 0,
  },
  menu: {
    width: 200,
  },
});
class LoginForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.shape({})
  }


  renderField = ({
    input,
    label,
    type,
    meta: { touched, error },
    classes
  }) => (<div>
    <label>{label}</label>
    <div>
      <TextField className={classes.textField} {...input} placeholder={label} type={type} />
      {touched &&
        (error && <span>{error}</span>)
      }
    </div>
  </div>);

  render() {
    const { handleSubmit, classes } = this.props;

    return (
      <div className="container">
        <div className="row" id="landing">
          <div className="col-md-6 mt-5 mx-auto" id="land">
            <form onSubmit={handleSubmit}>
              <h1>Please sign in</h1>
              <Field
                name="email"
                type="text"
                component={this.renderField}
                label="Email"
                classes={classes}
              />
              <Field
                name="password"
                type="password"
                component={this.renderField}
                label="Password"
                classes={classes}
              />
              <MaterialButton variant="contained" type="submit" color="primary">
                Sign In
              </MaterialButton>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  reduxForm({
    form: 'loginForm' // a unique identifier for this form
    // validate // <--- validation function given to redux-form
  }),
  withStyles(styles)
)(LoginForm);