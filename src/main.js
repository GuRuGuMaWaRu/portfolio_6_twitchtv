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
      streams: []
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
    $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?', data => {
      // console.log(data);
    });
    let channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb",
    "thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel",
    "cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"],
        streams = [],
        streamStatus = '';

    this.customForEach(channels, channel => {
      $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?callback=?', data => {
        if (data.stream === null) {
          streamStatus = 'offline';
        } else if (data.error) {
          streamStatus = 'closed';
        } else {
          streamStatus = 'online';
        }
        $.getJSON('https://api.twitch.tv/kraken/channels/' + channel + '?callback=?', data => {
          streams = this.state.streams;
          streams.push(data);
          this.setState({streams});
        });
      });
    });
  }

  render() {
    let dummyLogo = "https://dummyimage.com/300/ecf0e7/5c5457.jpg&text=0x3F",
        logo = "",
        streams = this.state.streams.map(function(stream, key) {
          logo = stream.logo === null || stream.logo === undefined ? dummyLogo : stream.logo;
          return <Stream key={key} logo={logo} game={stream.game} link={stream.url}/>;
        });


        // streams = this.state.streams.map(function(stream) {
        //   let status = '';
        //   if (stream.channel === null) {
        //     status = "Offline";
        //   } else if (stream.channel === undefined) {
        //     status = "Account closed";
        //   } else {
        //     status = stream.game;
        //   }
        //   return <Stream
        //           key={stream._id}
        //           logo={stream.channel.logo === null ? dummyLogo : stream.channel.logo}
        //           game={status}
        //           link={stream.channel.url} />
        // });


    return (
      <div>
        <NavBar getData={this.getData} />
        <div className="my-feature">
        </div>
        <div className="wrapper">
          <SortButtons />
          <div className="my-stream-list">
            {streams}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
