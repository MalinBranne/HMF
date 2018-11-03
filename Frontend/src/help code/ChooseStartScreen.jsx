import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import ScreenProtection from '../Auth/components/ScreenProtection';

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
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class ChooseStartScreen extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        who: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        what: PropTypes.string,
        where: PropTypes.string,
        time: PropTypes.string,
        message: PropTypes.string,
        created: PropTypes.string,
      })
    }),
    history: PropTypes.any.isRequired
  };
  constructor(props) {
    super(props);

    var today = new Date(),
      created = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();

    this.state = {
      type: props.location.state.type,
      who: props.location.state.who,
      what: '',
      where: '',
      time: '',
      message: '',
      created: created

    };
  }

  componentDidMount() {
    console.log(this.state.who); //for testing
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
          <div className={classes.root}>
            <h1>Starta bedömning</h1>
            <h2>{this.state.type}</h2>
            <div>
              <TextField
                id="filled-what"
                label="Vad?"
                className={classes.textField}
                value={this.state.what}
                onChange={this.handleChange('what')}
                margin="normal"
                variant="filled"
              />
            </div>
            <div>
              <TextField
                id="filled-where"
                label="Var?"
                className={classes.textField}
                value={this.state.where}
                onChange={this.handleChange('where')}
                margin="normal"
                variant="filled"
              />
            </div>
            <div>
              <TextField
                id="filled-name"
                label="Tid?"
                className={classes.textField}
                value={this.state.created}
                margin="normal"
                variant="filled"
              />
            </div>
            <TextField
              id="filled-message"
              label="Meddelande"
              multiline
              rows="6"
              className={classes.textField}
              value={this.state.message}
              onChange={this.handleChange('message')}
              margin="normal"
              variant="filled"
            />
            <div>
              <Link to={{
                pathname: '/confirm-booked',
                state: {
                  who: this.state.who,
                  type: this.state.type,
                  what: this.state.what,
                  where: this.state.where,
                  time: this.state.time,
                  message: this.state.message,
                  created: this.state.created,
                  
                }
              }}>
                <MaterialButton variant='contained' color='primary'>
                  Nästa
                </MaterialButton>
              </Link>
            </div>
          </div>
        </div>
      </ScreenProtection>
    );
  }
}
export default withStyles(styles)(ChooseStartScreen);