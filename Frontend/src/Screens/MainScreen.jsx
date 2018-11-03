import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ActivityComponent } from '../components/activity.component';
import NavBar from '../components/NavBar.jsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import '../css/styles.css';


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
class MainScreen extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  constructor() {
    super();
    this.state = {
      activities: [],
      title: '',
      text: ''
    };


  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/hmf/users/activities/all`)
      .then(res => res.json())
      .then(
        (data) => {

          data.forEach(obj => {

            console.log(obj.activities);
            this.state.activities.push(obj.activities);
            var merged = [].concat.apply([], this.state.activities);
            this.setState({ activities: merged });
            console.log(this.state.activities);


          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );

    console.log(this.state);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  backBtn = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  render() {

    return (
      <div>
        <NavBar history={this.props.history} />
        <div className="col-xl-4 col-lg-6">
          <div className="card m-b-20">
            <div className="card-body" id="diary" style={{ display: 'block' }}>
              <MaterialButton variant='contained' color='primary' onClick={this.backBtn}>
                Tillbaka
              </MaterialButton>
              <h2 className="mt-0 header-title mb-3">Mina aktiviteter</h2>
              <div id="entry">
                {this.state.activities.map((item, i) => {

                  console.log(item.title);
                  var yourString = item.text + '...';
                  var maxLength = 50; // maximum number of characters to extract

                  //trim the string to the maximum length
                  var trimmedString = yourString.substr(0, maxLength);
                  //re-trim if we are in the middle of a word
                  this.trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
                  var dots = '...';

                  return (
                    <Link
                      key={i}
                      to={{
                        pathname: 'Activity',
                        state: {
                          key: i,
                          index: i,
                          item: item,
                          id: item._id,
                          title: item.title,
                          text: item.text
                        }
                      }}>
                      <ActivityComponent index={i} item={item} id={item._id} title={item.title} text={this.trimmedString + dots} phone={item.phone} website={item.website} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default withStyles(styles)(MainScreen);


