import React from 'react';

class Stream extends React.Component {

  render() {

    if (this.props.game === "Offline" || this.props.game === "Account closed") {
      return (
          <a className="my-stream offline" data-content={this.props.game} href="#">
            <img src={this.props.logo} />
          </a>
      );
    } else {
      return (
          <a className="my-stream" data-content={this.props.game} href={this.props.link} target="_blank">
            <img src={this.props.logo} />
          </a>
      );
    }
  }
}

export default Stream;
