import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import ScreenProtection from '../Auth/components/ScreenProtection';
import jwt_decode from 'jwt-decode';

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

class BookRequestScreen extends Component {
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

    this.state = {
      type: props.location.state.type,
      who: props.location.state.who,
      what: '',
      where: '',
      time: '',
      message: '',
      created: '',

    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    console.log('THIS HAPPENS');
    e.preventDefault();

    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);

    let fullName = decoded.firstname + ' ' + decoded.lastname;
    console.log(fullName);

    fetch(`${process.env.REACT_APP_SERVER_URL}/users/${decoded.userId}/requests`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: decoded.userId,
          receiver: fullName,  //TODO: JUST NU SKICKAR VI REQUESTS TILL OSS SJÄLVA. VI VILL ÄNDRA DET SEN SÅ VI SKICKAR TILL EN ANNAN ANVÄNDARE
          type: this.state.type,
          what: this.state.what,
          where: this.state.where,
          time: this.state.time,
          message: this.state.message
        })
      })
      .then((res) => res.json())
      .then(() => {
        console.log('Request har booking till bookings array');
      })
      .catch((err) => console.log(err));


    this.props.history.push({
      pathname: '/confirm-booked',
      state: {
        who: this.state.who,
        type: this.state.type,
        what: this.state.what,
        where: this.state.where,
        time: this.state.time,
        message: this.state.message,
        makingBooking: 'yes'
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
          <div className={classes.root}>
            <h1>Boka tid</h1>
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
                value={this.state.time}
                onChange={this.handleChange('time')}
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
              <MaterialButton variant='contained' color='primary' onClick={(e) => this.handleSubmit(e)}>
                Skicka
              </MaterialButton>
            </div>
          </div>
        </div>
      </ScreenProtection>
    );

  }
}

export default withStyles(styles)(BookRequestScreen);