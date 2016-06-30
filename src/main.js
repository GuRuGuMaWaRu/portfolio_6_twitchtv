import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import './style.scss';
import NavBar from './components/nav/NavBar';
import TableItem from './components/streams/TableItem';
import SortButtons from './components/elements/SortButtons';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      streamsOriginal: [],
      layoutType: 'table'
    };
    this.sortStreams = this.sortStreams.bind(this);
    this.changeLayout = this.changeLayout.bind(this);
  }

  customForEach(items, fn) {
    let i,
        len = items.length;

    for (i = 0; i < len; i++) {
      fn(items[i], i, items);
    }
  }

  sortStreams(label) {
    let updStreams = this.state.streams;

    updStreams = this.state.streamsOriginal.filter(stream => {
      switch(label) {
        case 'Online':
          return stream.streamStatus === 'online';
          break;
        case 'Offline':
          return stream.streamStatus !== 'online';
          break;
        case 'All':
          return stream;
          break;
      }
    });

    this.setState({streams: updStreams});
  }

  changeLayout(event, layoutType) {
    event.preventDefault();
    this.setState({layoutType});
  }

  componentWillMount() {
    let channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb",
          "thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel",
          "cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"],
        itemsProcessed = 0,
        streams = [];

    this.customForEach(channels, channel => {
      let streamStatus = '';
      $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?callback=?', data => {
        if (data.stream === null) {
          streamStatus = 'offline';
        } else if (data.error) {
          streamStatus = 'no account';
        } else {
          streamStatus = 'online';
        }
      }).done(() => {
        $.getJSON('https://api.twitch.tv/kraken/channels/' + channel + '?callback=?', data => {
          data.streamStatus = streamStatus;
          data.streamName = channel;
          streams.push(data);
          itemsProcessed++;
          if (itemsProcessed === channels.length) {
            this.setState({streamsOriginal: streams, streams});
            // console.log(this.state.streams);
          }
          // console.log(this.state.streams);
        });
      });
    });
  }

  render() {
    let dummyLogo = "https://dummyimage.com/300/ecf0e7/5c5457.jpg&text=0x3F",
        channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb",
          "thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel",
          "cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"],
        logo = "",
        streams = [];


    streams = this.state.streams.map((stream, key) => {
      logo = stream.logo === null || stream.logo === undefined ? dummyLogo : stream.logo;

      return <TableItem key={key}
                    logo={logo}
                    name={stream.streamName}
                    game={stream.game}
                    description={stream.status}
                    status={stream.streamStatus}
                    link={stream.url}
                    invalid={stream.streamStatus !== 'online' ? true : false} />;
    });

    return (
      <div>
        <NavBar sortStreams={this.sortStreams} />
        <div className="wrapper">
          <SortButtons changeLayout={this.changeLayout} />
          <div className={this.state.layoutType === "table" ? "stream-list" : "stream-list list"}>
            {streams}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
