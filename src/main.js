import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  render() {
    return (
      <div>
        <p>test page</p>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
