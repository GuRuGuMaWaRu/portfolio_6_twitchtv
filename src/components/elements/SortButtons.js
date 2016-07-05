import React from 'react';

export default class SortButtons extends React.Component {
  render() {
    return (
      <ul id="my-sort-buttons">
        <li className={this.props.layoutType === "table" ? "selected" : ""} onClick={event => this.props.changeLayout(event, 'table')}>
          <span className="glyphicon glyphicon-th" aria-hidden="true"></span>
          <span className="sr-only">Table view</span>
        </li>
        <li className={this.props.layoutType === "list" ? "selected" : ""} onClick={event => this.props.changeLayout(event, 'list')}>
          <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
          <span className="sr-only">List view</span>
        </li>
      </ul>
    );
  }
}

SortButtons.propType = {
  changeLayout: React.PropTypes.func
}

SortButtons.defaultProps = {
  changeLayout: 'table'
}
