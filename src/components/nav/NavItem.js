import React from 'react';

export default class NavItem extends React.Component {
  render() {
    return (
      <li className="nav-menu-buttons-item">
        <a  className={this.props.selectionType === this.props.label ? "selected nav-link" : "nav-link"}
            href="#"
            onClick={() => this.props.clickHandler(this.props.label)}>
          {this.props.label}
          {/*<span className="new-element"></span>*/}
        </a>
      </li>
    )
  }
}

NavItem.propType = {
  clickHandler: React.PropTypes.func,
  label: React.PropTypes.string,
  selectionType: React.PropTypes.string
}
