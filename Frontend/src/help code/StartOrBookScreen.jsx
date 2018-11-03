import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { withStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import ScreenProtection from '../Auth/components/ScreenProtection';


const styles = {
  root: {
    marginLeft: '48.5%'
  },
  view: {
    height: '200px'
  }
};

class StartOrBookScreen extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        who: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      })
    }),
    history: PropTypes.any.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      type: props.location.state.type,
      who: props.location.state.who,
    };

  }

  componentDidMount(){
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    return (
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
          <div>
            <p>{this.state.type}</p>
            <Avatar className={classes.root}>
              <ImageIcon />
            </Avatar>
            <p>{this.state.who}</p>
            <Link to={{
              pathname: '/choose-start',
              state: {
                who: this.state.who,
                type: this.state.type
              }
            }}>
              <MaterialButton variant='contained' color='primary'>
                Starta Bedömning
              </MaterialButton>
            </Link>
            <br /><br />
            <Link to={{
              pathname: '/book-request',
              state: {
                who: this.state.who,
                type: this.state.type
              }
            }}>
              <MaterialButton variant='contained' color='secondary'>
                Boka tid
              </MaterialButton>
            </Link>
          </div>
        </div>
      </ScreenProtection>
    );
  }
}

export default withStyles(styles)(StartOrBookScreen);