import React from 'react';

class NavItem extends React.Component {
  render() {
    return (
      <li className="my-navbar-menu-item">
        <a href="#">{this.props.label}</a>
      </li>
    )
  }
}

export default NavItem;
