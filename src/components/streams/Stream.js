import React from 'react';

class Stream extends React.Component {

  render() {
    let dummyLogo = "https://dummyimage.com/300/ecf0e7/5c5457.jpg&text=0x3F",
        logo = this.props.logo === undefined ? dummyLogo : this.props.logo,
        style = {
          backgroundImage: 'url(' + logo + ')'
        },
        tempStyle = {
          marginTop: 20 + "px"
        };
    console.log(style);

    return (
      <div className="my-stream darken" style={style}>
        {/*<a href={this.props.link} target="_blank">
          <img src={this.props.logo} />
        </a>*/}
      </div>
    );
  }
}

export default Stream;

{/*<p>{this.props.game}</p>*/}
