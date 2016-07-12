import React from 'react';
import NavItem from './NavItem';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="my-navbar" id="test">
        <div className="my-navbar-header">
          <h1>TWITCH</h1>
        </div>
        <ul className="my-navbar-menu">
          <NavItem label="A-Z" selectionType={this.props.selectionType} clickHandler={this.props.sortStreams}/>
          <NavItem label="Z-A" selectionType={this.props.selectionType} clickHandler={this.props.sortStreams}/>
        </ul>
      </div>
    )
  }
}

NavBar.propType = {
  sortStreams: React.PropTypes.func,
  selectionType: React.PropTypes.string
}
