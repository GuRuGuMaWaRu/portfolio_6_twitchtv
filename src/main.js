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
      ftStream: []
    };
  }

  componentWillMount() {
    $.getJSON('https://api.twitch.tv/kraken/streams?callback=?', data => {
      this.setState({streams: data.streams});
    });
    $.getJSON('https://api.twitch.tv/kraken/channels/freecodecamp?callback=?', data => {
      console.log(data);
      this.setState({ftStream: data});
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
            <FeaturedStream name={this.state.ftStream.display_name}
                            logo={this.state.ftStream.logo}
                            status={this.state.ftStream.status}
                            url={this.state.ftStream.url}/>
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
