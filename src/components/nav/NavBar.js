import React from 'react';
import NavItem from './NavItem';

class NavBar extends React.Component {
    render() {
      return (
        <div className="wrapper my-navbar">
          <h1>TWITCH TV</h1>
          <input className="my-navbar-input" type="text"></input>
          <ul className="my-navbar-menu">
            <NavItem label="All"/>
            <NavItem label="Online"/>
            <NavItem label="Offline"/>
          </ul>
        </div>
      )
    }
}

export default NavBar;
