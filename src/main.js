import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import NavBar from './components/nav/NavBar';
import Stream from './components/streams/Stream';
import SortButtons from './components/elements/SortButtons';

class Main extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="my-feature">
          <div className="wrapper">
            <Stream picture="FCC" name="FreeCodeCamp" status="Online" />
          </div>
        </div>
        <div className="wrapper">
          <SortButtons />
          <Stream picture="Warcraft" name="Warcraft" status="Offline" />
          <Stream picture="Starcraft" name="Starcraft" status="Online" />
          <Stream picture="Total War" name="Total War" status="Pending" />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
