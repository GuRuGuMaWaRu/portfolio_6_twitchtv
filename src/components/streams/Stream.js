import React from 'react';

export default class Stream extends React.Component {
  render() {
    // 1 - setup
    let description = '',
        style = {
          backgroundImage: 'url(' + this.props.logo + ')'
        };
    // 2 - show description for online streams or status for others
    if (this.props.status !== 'online') {
      description = this.props.status;
    } else {
      description = this.props.game + ': ' + this.props.description;
    }

    return (
      <a className="stream" href={this.props.link ? this.props.link : "https://www.twitch.tv/"} target="_blank">
        <div className="image">
          <img src={this.props.logo} style={style} />
          <div className={this.props.invalid ? "invalid" : ""}></div>
        </div>
        <div>
          <h4>{this.props.name}</h4>
          <p className={this.props.invalid ? "offline" : ""}>{description}</p>
        </div>
      </a>
    )
  }
}

Stream.propType = {
  logo: React.PropTypes.string,
  name: React.PropTypes.string,
  game: React.PropTypes.string,
  description: React.PropTypes.string,
  status: React.PropTypes.string,
  link: React.PropTypes.string,
  invalid: React.PropTypes.boolean
};
Stream.defaultProps = {
  logo: '',
  name: 'no name',
  game: '',
  description: '',
  status: '',
  link: '',
  invalid: true
}
