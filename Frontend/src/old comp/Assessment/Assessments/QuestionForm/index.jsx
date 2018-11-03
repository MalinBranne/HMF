import React, { Component } from 'react';
import RadioGrades from '../RadioGrades';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import SliderGrades from '../SliderGrades';
import PropTypes from 'prop-types';
// import { Field } from 'redux-form';

const styles = theme => ({
  container: {
    display: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 6,
  },
  menu: {
    width: 200,
  },
});


class QuestionForm extends Component {
  static propTypes = {
    classes: PropTypes.any,
    data: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
      notobserved: false
    };
  }

    handlenotobserved = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({ notobserved: value });
    }

    render = () => {
      const { classes } = this.props;

      const { data: { id, type } } = this.props;

      if (!id || !type) return (<h1>Error</h1>);


      return (
        <div>
          <label>
                    Fråga {id}: {type} (
            <Checkbox color="default" value="checkedG"
              onChange={this.handlenotobserved} />

                    Inte observerat)
          </label>
          <RadioGrades  disabled={this.state.notobserved} topGrade={6} />
          <SliderGrades disabled={this.state.notobserved} />
          <TextField
            id="outlined-bare"
            className={classes.textField}
            defaultValue=""
            placeholder="Kommentar:"
            margin="normal"
            variant="outlined"
          />
        </div>
      );
    }
}
export default withStyles(styles)(QuestionForm);