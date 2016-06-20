import React from 'react';

class Stream extends React.Component {
  render() {
    return (
      <div>
        <p>Picture of {this.props.picture}</p>
        <p>{this.props.name}</p>
        <p>{this.props.status}</p>
      </div>
    );
  }
}

export default Stream;
