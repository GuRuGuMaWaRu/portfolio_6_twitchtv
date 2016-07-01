import React from 'react';

export default class Stream extends React.Component {

  render() {
    let description = '',
        style = {
          backgroundImage: 'url(' + this.props.logo + ')'
        };

    // console.log('rendering stream');

    if (this.props.status !== 'online') {
      description = this.props.status;
    } else {
      description = this.props.game + ': ' + this.props.description;
    }

    return (
      <a className="stream" href={this.props.link} target="_blank">
        <img src={this.props.logo} style={style} />
        <div className="stream-description">
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
