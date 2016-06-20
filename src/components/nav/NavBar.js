import React from 'react';
import NavItem from './NavItem';

class NavBar extends React.Component {
    render() {
      return (
        <div>
          <h1>LOGO</h1>
          <ul>
            <NavItem label="All"/>
            <NavItem label="Online"/>
            <NavItem label="Offline"/>
          </ul>
        </div>
      )
    }
}

export default NavBar;
