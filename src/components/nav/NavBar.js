import React from 'react';
import NavItem from './NavItem';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="my-navbar">
        <div className="my-navbar-header">
          <h1>TWITCH</h1>
        </div>
        <ul className="my-navbar-menu">
          <NavItem label="all" selectionType={this.props.selectionType} clickHandler={this.props.sortStreams}/>
          <NavItem label="online" selectionType={this.props.selectionType} clickHandler={this.props.sortStreams}/>
          <NavItem label="offline" selectionType={this.props.selectionType} clickHandler={this.props.sortStreams}/>
        </ul>
      </div>
    )
  }
}

NavBar.propType = {
  sortStreams: React.PropTypes.func,
  selectionType: React.PropTypes.string
}
