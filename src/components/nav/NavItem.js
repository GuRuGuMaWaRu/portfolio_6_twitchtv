import React from 'react';

export default class NavItem extends React.Component {

  render() {
    return (
      <li className="my-navbar-menu-item">
        <a href="#" onClick={event => this.props.clickHandler(this.props.label)}>{this.props.label}</a>
      </li>
    )
  }
}

NavItem.propType = {
  clickHandler: React.PropTypes.func,
  label: React.PropTypes.string
}
