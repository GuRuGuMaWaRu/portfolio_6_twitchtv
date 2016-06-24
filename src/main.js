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
      streams: [],
      streamsList: ''
    };
  }

  componentWillMount() {
    $.getJSON('https://api.twitch.tv/kraken/streams?callback=?', data => {
      // console.log(data.streams[0]);
      this.setState({streams: data.streams});
    });
  }

  render() {
    // console.log(this.state.streams)
    let dummyLogo = "https://dummyimage.com/300/ecf0e7/5c5457.jpg&text=0x3F",
        streams = this.state.streams.map(function(stream) {
          // console.log(stream.channel.logo);
          return <Stream
                  key={stream._id}
                  logo={stream.channel.logo === null ? dummyLogo : stream.channel.logo}
                  preview={stream.preview.medium}
                  game={stream.game}
                  link={stream.channel.url} />
        });

    return (
      <div>
        <NavBar getData={this.getData} />
        <div className="my-feature">
          <div className="wrapper">
            <Stream logo="FCC" name="FreeCodeCamp" status="Online" />
          </div>
        </div>
        <div className="wrapper">
          <SortButtons />
          <div className="my-stream-list">
            {streams}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
