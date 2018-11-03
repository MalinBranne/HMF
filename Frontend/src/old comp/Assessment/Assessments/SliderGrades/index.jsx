import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';


const styles  = {
  root: {
    width: 500,
    marginLeft: '30%',
    flexWrap: 'wrap',
    //backgroundColor: 'red',
  },
  slider: {
    padding: '22px 0px',
  },
};
  
class StepSlider extends Component {
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

    handleChange = (event, value) => {
      this.setState({ value });
    };
    
  
    render() {
      const { classes } = this.props;
      const { disabled, value } = this.state;
  
      return (
        <div className={classes.root} >
          <Slider 
            disabled={disabled}
            style={styles}
            classes={{ container: classes.slider }}
            value={value}
            min={1}
            max={6}
            step={1}
            onChange={this.handleChange}
          />
        </div>
      );
    }

}
  
StepSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(StepSlider);