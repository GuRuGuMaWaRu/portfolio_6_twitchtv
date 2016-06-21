import React from 'react';
import NavItem from './NavItem';

class NavBar extends React.Component {
    render() {
      return (
        <div className="wrapper my-navbar">
          <h1>TWITCH TV</h1>
          <div className="my-navbar-controls">
            <input className="my-navbar-controls-input" type="text"></input>
            <ul className="my-navbar-controls-menu">
              <NavItem label="All"/>
              <NavItem label="Online"/>
              <NavItem label="Offline"/>
            </ul>
          </div>
        </div>
      )
    }
}

export default NavBar;
