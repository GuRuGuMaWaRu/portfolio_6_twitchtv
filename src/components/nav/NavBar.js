import React from 'react';
import NavItem from './NavItem';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="nav" id="test">
        <div className="nav-header">
          <div className="wrapper">
              <h1>TWITCH</h1>
          </div>
        </div>
        <div className="nav-menu">
          <ul className="wrapper nav-menu-buttons">
            <NavItem label="A-Z" selectionType={this.props.selectionType} clickHandler={this.props.sortStreams}/>
            <NavItem label="Z-A" selectionType={this.props.selectionType} clickHandler={this.props.sortStreams}/>
          </ul>
        </div>
      </div>
    )
  }
}

NavBar.propType = {
  sortStreams: React.PropTypes.func,
  selectionType: React.PropTypes.string
}
