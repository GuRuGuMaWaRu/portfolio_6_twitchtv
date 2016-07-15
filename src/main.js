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
      selectionType: 'A-Z'
    };
    this.sortStreams = this.sortStreams.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  customForEach(items, fn) {
    let i,
        len = items.length;

    for (i = 0; i < len; i++) {
      fn(items[i], i, items);
    }
  }

  sortStreams(label) {
    // 1 - setup
    let sortOrder = label === 'A-Z' ? 1 : -1,
        sortedStreams = this.state.streams,
        onlineStreams = [],
        offlineStreams = [],
        finalStreams = [];
    // 2 - select button: 'A-Z' or 'Z-A'
    this.setState({selectionType: label})
    // 3 - sort streams from A to Z or from Z to A
    sortedStreams.sort(function(a, b) {
      if (a.streamName.toLowerCase() > b.streamName.toLowerCase()) {
        return sortOrder * 1;
      } else if (a.streamName.toLowerCase() < b.streamName.toLowerCase()) {
        return sortOrder * -1;
      } else {
        return 0;
      }
    });
    // 4 - put active streams into one array, and inactive into another
    for (let i = 0, len = sortedStreams.length; i < len; i++) {
      if (sortedStreams[i].streamStatus === "online") {
        onlineStreams.push(sortedStreams[i]);
      } else {
        offlineStreams.push(sortedStreams[i]);
      };
    }
    // 5 - merge active streams array with inactive streams array
    finalStreams = onlineStreams.concat(offlineStreams);
    // 6 - save sorted streams
    this.setState({streams: finalStreams});
  }

  clickButton(event, label) {
    event.preventDefault();
    // 1 - setup
    let posX = event.target.offsetLeft,
        posY = event.target.offsetTop,
        posXMain = document.getElementById('nav-menu-buttons').offsetLeft,
        posYMain = document.getElementById('nav-menu-buttons').offsetTop,
        buttonWidth = event.target.offsetWidth,
        buttonHeight =  event.target.offsetHeight;
    // 2 - remove any old ripple element
    $(".ripple").remove();
    // 3 - add new ripple element
    let newRipple = document.createElement('span');
    newRipple.classList.add('ripple');
    event.target.appendChild(newRipple);
    // 4 - make it round
     if (buttonWidth >= buttonHeight) {
       buttonHeight = buttonWidth;
     } else {
       buttonWidth = buttonHeight;
     }
     // 5 - get the center of the element
    var x = event.clientX - (posX + posXMain) - buttonHeight / 2;
    var y = event.clientY - posYMain - buttonHeight / 2;
     // 6 - add ripples CSS and start animation
     $(".ripple").css({
       width: buttonWidth,
       height: buttonHeight,
       top: y + 'px',
       left: x + 'px'
     }).addClass("rippleEffect");
    // 7 - sort streams
    this.sortStreams(label);
  }

  componentWillMount() {
    // 1 - setup
    let channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb",
          "thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel",
          "cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"],
        itemsProcessed = 0,
        streams = [];
    // 2 - use Twitch API to download stream data
    this.customForEach(channels, channel => {
      let streamStatus = '';
      // 2.1 - get stream status
      $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?callback=?', data => {
        if (data.stream === null) {
          streamStatus = 'offline';
        } else if (data.error) {
          streamStatus = 'no account';
        } else {
          streamStatus = 'online';
        }
      }).done(() => {
        // 2.2 - get stream data
        $.getJSON('https://api.twitch.tv/kraken/channels/' + channel + '?callback=?', data => {
          // 2.3 - add previously received status data and known stream name to the data object
          data.streamStatus = streamStatus;
          data.streamName = channel;
          // 2.4 - add stream data to a temporary stream array
          streams.push(data);
          // 2.5 - use setState only after all stream data is received
          itemsProcessed++;
          if (itemsProcessed === channels.length) {
            this.setState({streams});
            // 3 - sort streams and display them
            this.sortStreams('A-Z');
          }
        });
      });
    });
  }

  componentDidMount() {
    // 1 - logic to fix/unfix navbar on scroll
    $(window).on('scroll', function(e) {
      if ($(this).scrollTop() > 26) {
        if (!$('.nav-menu').hasClass('fixed')) {
          $('.nav-menu').addClass('fixed');
        }
      } else {
        if ($('.nav-menu').hasClass('fixed')) {
          $('.nav-menu').removeClass('fixed');
        }
      }
    });
  }

  render() {
    // 1 - setup
    let dummyLogo = "https://dummyimage.com/300/ecf0e7/5c5457.jpg&text=0x3F",
        logo = "",
        streams = [];
    // 2 - create an array of stream elements
    streams = this.state.streams.map((stream, key) => {
      // 2.1 - if there is no logo, replace it with a generic image
      logo = stream.logo === null || stream.logo === undefined ? dummyLogo : stream.logo;
      // 2.2 - create a stream element and push it into an array
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
      <div>
        <NavBar clickButton={this.clickButton} selectionType={this.state.selectionType} />
        <div className="wrapper">
          <div className="stream-list">
            {streams}
          </div>
        </div>
        <div className="footer">
          <div className="wrapper">
            <p>Created by <a href="https://github.com/GuRuGuMaWaRu" target="_blank">GuRuGuMaWaRu</a>, 2016.</p>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
