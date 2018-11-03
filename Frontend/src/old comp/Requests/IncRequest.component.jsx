import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Carousel from 'nuka-carousel';

const styles = {
  root: {
    marginLeft: '20%'
  },
  view: {
    height: '100px'
  }
};
class RequestComponent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      requests: null
    };

 
  }
  componentDidMount() {
    

    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    // console.log(decoded); // for testing

    fetch(`${process.env.REACT_APP_SERVER_URL}/users/${decoded.userId}/requests`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            requests: data,
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


  handleclick = () => {
    this.setState = { clicked: '' };
  }

  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Inkomna förfrågningar</h1>

        <div className={classes.root}>
          
          {this.state.requests && (<Carousel

            slideIndex={this.state.slideIndex}
            afterSlide={slideIndex => this.setState({ slideIndex })}
            slidesToShow={3}
            width="80%"
            wrapAround={true}
            cellAlign="center"
            framePadding="5%"
            heightMode='max'

          >
            { this.state.requests && this.state.requests.map((item, i) => {
              return (
                <div key={i}>
                  
                  
                  <Link to={{
                    pathname: '/show-request',
                    state: {
                      id: `${item._id}`,
                      name: `${item.sender}`,
                      type: `${item.type}`,
                      date: `${item.date}`,
                      time: `${item.time}`,
                      place: `${item.where}`,
                      what: `${item.what}`,
                    }
                  }}>
                    <ListItem className={classes.view}>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                      <ListItemText primary={item.sender} secondary={item.type} />
                    </ListItem>
                  </Link>
                  <br />
                  <br />
                  
                  
                </div>
              );

            })}
          </Carousel>
          )}
        </div>

      </div>

    );
  }

}

export default withStyles(styles)(RequestComponent);