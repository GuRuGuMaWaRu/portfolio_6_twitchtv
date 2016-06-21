import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import NavBar from './components/nav/NavBar';
import Stream from './components/streams/Stream';

class Main extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <NavBar />
        <div>
          <Stream picture="Warcraft" name="Warcraft" status="Offline" />
          <Stream picture="Starcraft" name="Starcraft" status="Online" />
          <Stream picture="Total War" name="Total War" status="Pending" />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
