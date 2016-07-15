import React from 'react';
import NavItem from './NavItem';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="nav-header">
          <div className="wrapper">
              <h1>TWITCH</h1>
          </div>
        </div>
        <div className="nav-menu">
          <ul id="nav-menu-buttons" className="wrapper nav-menu-buttons">
            <NavItem label="A-Z" selectionType={this.props.selectionType} clickHandler={this.props.clickButton}/>
            <NavItem label="Z-A" selectionType={this.props.selectionType} clickHandler={this.props.clickButton}/>
            <div className={this.props.selectionType === "A-Z" ? "selection-bar left" : "selection-bar right"}></div>
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
