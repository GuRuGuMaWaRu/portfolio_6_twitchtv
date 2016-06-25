import React from 'react';

class Stream extends React.Component {

  render() {
    let dummyLogo = "https://dummyimage.com/300/ecf0e7/5c5457.jpg&text=0x3F",
        logo = this.props.logo === undefined ? dummyLogo : this.props.logo,
        status = '';

    if (this.props.game === "Offline" || this.props.game === "Account closed") {
      return (
          <a className="my-stream offline" data-content={this.props.game} href="#">
            <img src={logo} />
          </a>
      );
    } else {
      return (
          <a className="my-stream" data-content={this.props.game} href={this.props.link} target="_blank">
            <img src={logo} />
          </a>
      );
    }
  }
}

export default Stream;
