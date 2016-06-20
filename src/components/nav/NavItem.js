import React from 'react';

class NavItem extends React.Component {
  render() {
    return (
      <li>
        {this.props.label}
      </li>
    )
  }
}

export default NavItem;
