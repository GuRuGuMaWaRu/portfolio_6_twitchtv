import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import './style.scss';
import NavBar from './components/nav/NavBar';
import Stream from './components/streams/Stream';
import FeaturedStream from './components/streams/FeaturedStream';
import SortButtons from './components/elements/SortButtons';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      streamStatus: ''
    };
  }

  customForEach(items, fn) {
    let i,
        len = items.length;

    for (i = 0; i < len; i++) {
      fn(items[i], i, items);
    }
  }

  componentWillMount() {
    let channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb",
    "thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel",
    "cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"],
        streams = [];

    this.customForEach(channels, channel => {
      let streamStatus = '';
      $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?callback=?', data => {
        if (data.stream === null) {
          streamStatus = 'offline';
          console.log('offline')
        } else if (data.error) {
          streamStatus = 'no account';
          console.log('no account')
        } else {
          streamStatus = 'online';
          console.log('online')
        }
      }).done(() => {
        $.getJSON('https://api.twitch.tv/kraken/channels/' + channel + '?callback=?', data => {
          streams = this.state.streams;
          data.streamStatus = streamStatus;
          data.streamName = channel;
          streams.push(data);
          this.setState({streams});
          console.log(this.state.streams);
        });
      });
    });
  }

  render() {
    let dummyLogo = "https://dummyimage.com/300/ecf0e7/5c5457.jpg&text=0x3F",
        logo = "",
        streams = [];


    streams = this.state.streams.map(function(stream, key) {
      logo = stream.logo === null || stream.logo === undefined ? dummyLogo : stream.logo;

      return <Stream key={key}
                    logo={logo}
                    name={stream.streamName}
                    game={stream.game}
                    description={stream.status}
                    status={stream.streamStatus}
                    link={stream.url} />;
    });


    return (
      <div>
        <NavBar getData={this.getData} />
        <div className="wrapper">
          <SortButtons />
          <div className="stream-list">
            {streams}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
