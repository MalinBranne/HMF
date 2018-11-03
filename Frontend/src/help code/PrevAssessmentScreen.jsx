import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ScreenProtection from '../Auth/components/ScreenProtection';
import jwt_decode from 'jwt-decode';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  root: {
    marginLeft: '30%'
  },
  view: {
    height: '200px'
  }
};
class PrevAssessmentScreen extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      assessments: []
    };
  }
  componentDidMount() {

    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    // console.log(decoded); // for testing

    this.getAssessments(decoded);


  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getAssessments(user) {

    fetch(`${process.env.REACT_APP_SERVER_URL}/users/${user.userId}/assessments`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            assessments: data,
          });
          console.log(data);
          
        }, 
        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  render() {
    const { classes } = this.props;
    return (
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
          <h1>Tidigare bedömningar</h1>
          
          <div className={classes.root}>

            {this.state.assessments.map((item, i) => {
              return (

                <div key={i}>
                  <Link to={{
                    pathname: '/prev-ass-history',
                    state: {
                      name: `${item.Who}`,
                      type: `${item.Type}`,
                      Date: `${item.TheDate}`
                    }
                  }}>
                    <ListItem className={classes.view}>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                      <ListItemText primary={item.Who} secondary={item.TheDate} />
                    </ListItem>
                  </Link>
                  <br />
                  <br />
                </div>
              );

            })}

          </div>
        </div>
      </ScreenProtection>
    );
  }
}

export default withStyles(styles)(PrevAssessmentScreen);