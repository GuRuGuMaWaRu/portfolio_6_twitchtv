import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import './style.scss';
import NavBar from './components/nav/NavBar';
import Stream from './components/streams/Stream';
import SortButtons from './components/elements/SortButtons';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: []
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    fetch('https://api.twitch.tv/kraken/streams?callback=?')
      .then(response => response.json())
      .then(data => this.setState({streams: data}));
  }

  getData() {
    $.getJSON('https://api.twitch.tv/kraken/streams?callback=?', data => {
      console.log(data.streams);
    });
    console.log(this.state.streams);
  }

  render() {
    // let streams = this.state.streams.map(function(stream) {
    //   return <Stream picture="Warcraft" name={stream.game} status="Offline" />
    //
    // })
    return (
      <div>
        <NavBar getData={this.getData} />
        <div className="my-feature">
          <div className="wrapper">
            <Stream picture="FCC" name="FreeCodeCamp" status="Online" />
          </div>
        </div>
        <div className="wrapper">
          <SortButtons />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
