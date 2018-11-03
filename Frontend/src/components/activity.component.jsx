import React from 'react';
import PropTypes from 'prop-types';

export class ActivityComponent extends React.Component {
  static propTypes = {
    key: PropTypes.number,
    item: PropTypes.object,
    id: PropTypes.string.isRequired,
    organisation: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  };

  render() {
    return (

      <div id={this.props.id}>
        <h3 className="">{this.props.title}</h3>
        <h5 className="">{this.props.organisation}</h5>
        <h6>Telefon: {this.props.phone}</h6><span><h6> | Web: {this.props.website}</h6></span>
        <p className="">{this.props.text}</p>
      </div>

    );


  }
}