import React from 'react';

class SortButtons extends React.Component {
  render() {
    return (
      <ul className="my-sort-buttons">
        <li>
          <span className="glyphicon glyphicon-th" aria-hidden="true"></span>
          <span className="sr-only">Table view</span>
        </li>
        <li>
          <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
          <span className="sr-only">List view</span>
        </li>
      </ul>
    );
  }
}

export default SortButtons;
