import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Radio from '@material-ui/core/Radio';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import './radioStyles.css';
class RadioButtons extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    topGrade: PropTypes.number  }
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      value: 0,
      grades: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

    UNSAFE_componentWillUpdate = (props) => {
      if (this.state.disabled !== props.disabled) {
        this.setState({
          disabled: props.disabled
        });
      }
    }

    handleChange = (event) => {
      const newValue = +event.target.value;
      this.setState({ grades: newValue });
    }

    render() {
      const { topGrade } = this.props;
      const { disabled, grades, } = this.state;

      return (
        <div id="radioContainer">
          { Array.apply(null, Array(topGrade)).map(function (x, i) { return i+1; }).map((item, i) =>{
            return ( 
              <div key={i}>
                <label>
                  <input
                    disabled={disabled}
                    type="radio"
                    value={i}
                    checked={!disabled && grades === i}
                    onChange={this.handleChange}
                  />
                  {i + 1}
                </label>
              </div>
            );})
          }
        </div>
      );
    }
}
export default RadioButtons;

//HASSES SAFETY-KOD TILL RENDERGRADES():

// for (let i = 1; i <= topGrade; i++) {
//   radioList.push(
//     <label>
//       <input
//         key={i.toString()}
//         disabled={disabled}
//         type="radio"
//         value={i}
//         checked={!disabled && grades === i}
//         onChange={this.handleChange}
//       />

//       {i}
//     </label>
//   );
// }