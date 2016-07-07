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
      streamsOriginal: [],
      selectionType: 'all',
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

  sortStreams(event, label) {
    let updStreams = this.state.streams;

    // console.log(event);
    let mouseX = event.clientX - (event.target.offsetLeft + document.getElementById('test').offsetLeft),
        mouseY = event.clientY - (event.target.offsetTop + document.getElementById('test').offsetTop);

    // event.target.style('background-position', mouseX + 'px ' + mouseY + 'px');
    console.log('Clicked position', mouseX, mouseY);
    console.log(mouseX + 'px ' + mouseY + 'px');
    console.log($(this));
    $(this).css({
      'background-position': 'left'
    })
    // console.log(document.getElementById('test').offsetLeft);


    updStreams = this.state.streamsOriginal.filter(stream => {
      switch(label) {
        case 'online':
          this.setState({selectionType: 'online'});
          return stream.streamStatus === 'online';
          break;
        case 'offline':
          this.setState({selectionType: 'offline'});
          return stream.streamStatus !== 'online';
          break;
        case 'all':
          this.setState({selectionType: 'all'});
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
          }

          // console.log(data);
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

    $(window).on('scroll', function(e) {
      console.log($(this).scrollTop());
      if ($(this).scrollTop() > 26) {
        if (!$('.my-navbar-menu').hasClass('fixed')) {
          console.log('add class');
          $('.my-navbar-menu').addClass('fixed');
        }
      } else {
        if ($('.my-navbar-menu').hasClass('fixed')) {
          console.log('remove class');
          $('.my-navbar-menu').removeClass('fixed');
        }
      }
    });

    window.addEventListener('scroll', function() {
      // console.log(document.getElementsByClassName('my-navbar-menu');
      // console.log(document.getElementsByTagName('body').scrollTop());
      if (document.getElementById('my-sort-buttons').scrollTop > 100) {
        document.getElementById('my-sort-buttons').classList.add('fixed');
      } else {
        document.getElementById('my-sort-buttons').classList.remove('fixed');
      }
    })

      return <Stream key={key}
                    logo={logo}
                    name={stream.streamName}
                    game={stream.game}
                    description={stream.status}
                    status={stream.streamStatus}
                    link={stream.url}
                    invalid={stream.streamStatus !== 'online' ? true : false} />;
    });

    return (
      <div className="wrapper">
        <NavBar sortStreams={this.sortStreams} selectionType={this.state.selectionType} />
        <SortButtons layoutType={this.state.layoutType} changeLayout={this.changeLayout} />
        <div className={this.state.layoutType === "table" ? "stream-list" : "stream-list list"}>
          {streams}
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
