import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialButton from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
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
  image: {
    marginLeft: '48.5%'
  }
});

class ConfirmBookedScreen extends Component {
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
        makingBooking: PropTypes.string
      })
    }),
    history: PropTypes.any.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      type: props.location.state.type,
      who: props.location.state.who,
      what: props.location.state.what,
      where: props.location.state.where,
      time: props.location.state.created,
      message: props.location.state.message,
      makingBooking: props.location.state.makingBooking

    };
  }

  componentDidMount() {
    console.log(this.state); //for testing
    console.log(this.state.makingBooking);
  }

  renderStartBtn = () =>{
    if(this.state.makingBooking != 'yes') {
      console.log(this.state.what);
      return ( 
        <Link to={{
          pathname: this.state.type,
          state: {
            type: this.state.type,
            who: this.state.who,
            what: this.state.what,
            where: this.state.where,
            message: this.state.message,
            time: this.state.time
          }
        }}>
        
          <MaterialButton variant='contained' color='primary'>
                  Starta nu
          </MaterialButton>
        </Link>);
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
          <div className={classes.root}>
            <h1>{this.state.type} Bokad</h1>
            <Avatar className={classes.image}>
              <ImageIcon />
            </Avatar>
            <h2>{this.state.who}</h2>
            <div>
              <TextField
                id="filled-what"
                label="Vad?"
                className={classes.textField}
                value={this.state.what}
                margin="normal"
                variant="filled"
                onKeyPress="return false;"
              />
            </div>
            <div>
              <TextField
                id="filled-where"
                label="Var?"
                className={classes.textField}
                value={this.state.where}
                margin="normal"
                variant="filled"
                onKeyPress="return false;"
              />
            </div>
            <div>
              <TextField
                id="filled-name"
                label="När?"
                className={classes.textField}
                value={this.state.time}
                margin="normal"
                variant="filled"
                onKeyPress="return false;"
              />
            </div>
            <div>
              <Link to={{
                pathname: '/',
              }}>
                <MaterialButton variant='contained' color='primary'>
                  Huvudmeny
                </MaterialButton>
              </Link>

              { this.renderStartBtn() }
           
            </div>

          </div>
        </div>
      </ScreenProtection>
    );
  }
}
export default withStyles(styles)(ConfirmBookedScreen);