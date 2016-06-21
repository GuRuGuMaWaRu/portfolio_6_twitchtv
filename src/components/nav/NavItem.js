import React from 'react';

class NavItem extends React.Component {
  render() {
    return (
      <li className="my-navbar-menu-item">
        {this.props.label}
      </li>
    )
  }
}

export default NavItem;
