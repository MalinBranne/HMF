import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { EntryComponent } from '../components/Diary/entry';
import NavBar from '../components/NavBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import '../components/Diary/diary.css';

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
class DiaryScreen extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  constructor() {
    super();
    this.state = {
      entries: [],
      title: '',
      text: ''
    };

    this.onChange = this.onChange.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.backBtn = this.backBtn.bind(this);

  }
  componentDidMount() {
    this.getEntries();

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  backBtn(e) {
    e.preventDefault();
    this.props.history.push('/');
  }


  addEntry(e) {
    e.preventDefault();
    this.props.history.push('/add-entry');
  }

  getEntries() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/diary`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            entries: data,
          });
        },

        (error) => {
          this.setState({
            error
          });
        }
      );

  }

  render() {

    return (
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
          <div className="col-xl-4 col-lg-6">
            <div className="card m-b-20">
              <div className="card-body" id="diary" style={{ display: 'block' }}>
                <MaterialButton variant='contained' color='primary' onClick={this.addEntry}>
                  Skriv inlägg
                </MaterialButton>
                <MaterialButton variant='contained' color='primary' onClick={this.backBtn}>
                  Tillbaka
                </MaterialButton>
                <h2 className="mt-0 header-title mb-3">Min Dagbok</h2>
                <div id="entry">
                  {this.state.entries.map((item, i) => {

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
                          pathname: 'Entry',
                          state: {
                            key: i,
                            index: i,
                            item: item,
                            id: item._id,
                            title: item.title,
                            text: item.text,
                            created: item.created
                          }
                        }}>
                        <EntryComponent index={i} item={item} id={item._id} title={item.title} text={this.trimmedString + dots} created={item.created} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </ScreenProtection>

    );
  }
}

export default withStyles(styles)(DiaryScreen);


