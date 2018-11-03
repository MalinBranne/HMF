import React from 'react';
import PropTypes from 'prop-types';

export class EntryComponent extends React.Component {
  static propTypes = {
    key: PropTypes.number,
    item: PropTypes.object,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
  };

  render() {
    return (

      <div id={this.props.id}>
        <h3 className="">{this.props.title}</h3>
        <p className="">{this.props.text}</p>
        <p className="">{this.props.created}</p>
      </div>

    );


  }
}