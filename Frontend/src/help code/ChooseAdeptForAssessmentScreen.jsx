
import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import ScreenProtection from '../Auth/components/ScreenProtection';

const styles = {
  root: {
    marginLeft: '30%'
  },
  view: {
    height: '200px'
  }
};
class ChooseAdeptForAssessmentScreen extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        type: PropTypes.string.isRequired
      })
    }),
    history: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      type: props.location.state.type,
      who: '',
      slideIndex: 0,
      adepts: null
    };

  }


  componentDidMount() {

    fetch(`${process.env.REACT_APP_SERVER_URL}/users/role/Adept`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            adepts: data,
          });
          console.log(data);}, 
        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  render() {
    console.log('rerender');
    console.log('Chooseadept', this.state.type);
    const { classes } = this.props;
    return (
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
          <div className={classes.root}>
            
            {this.state.adepts && (<Carousel
              slideIndex={this.state.slideIndex}
              afterSlide={slideIndex => {this.setState({ slideIndex });}}
              slidesToShow={3}
              width="80%"
              wrapAround={true}
              cellAlign="center"
              framePadding="5%"
              heightMode='max'
            >
              {this.state.adepts && this.state.adepts.map((item, i) => {
                return (
                  <div key={i}>
      
      
                    <Link to={{
                      pathname: '/start-or-book',
                      state: {
                        who: `${item.firstname}` + ' ' + `${item.lastname}`,
                        type: this.state.type
                      }
                    }}>
                      <ListItem className={classes.view}>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                        <ListItemText primary={item.firstname + ' ' + item.lastname} />
                      </ListItem>
                    </Link>
                    <br />
                    <br />
      
      
                  </div>
                );
              })}
            </Carousel>)}
          </div>
        </div>
      </ScreenProtection>
    );
  }
}

export default withStyles(styles)(ChooseAdeptForAssessmentScreen);