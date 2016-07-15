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
      selectionType: 'A-Z',
      layoutType: 'table'
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
    // 2 - button selection: 'A-Z' or 'Z-A'
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
    // 4 - put active streams in one array, and inactive in another
    for (let i = 0, len = sortedStreams.length; i < len; i++) {
      if (sortedStreams[i].streamStatus === "online") {
        onlineStreams.push(sortedStreams[i]);
      } else {
        offlineStreams.push(sortedStreams[i]);
      };
    }
    // 5 - merge array of active streams with array of inactive streams
    finalStreams = onlineStreams.concat(offlineStreams);
    // 6 - save sorted streams
    this.setState({streams: finalStreams});
  }

  clickButton(event, label) {
    // console.log('mouse click X:',event.pageX);
    console.log('event.clientX:',event.clientX);
    console.log('posX:',event.target.offsetLeft);
    console.log('posXMain:',document.getElementById('nav-menu-buttons').offsetLeft);
    // console.log('mouse click Y:',event.pageY);
    console.log('event.clientY:',event.clientY);
    console.log('posY:',event.target.offsetTop);
    console.log('posYMain:',document.getElementById('nav-menu-buttons').offsetTop);


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
    //  var x = event.pageX - posX - buttonWidth / 2;
    //  var y = event.pageY - posY - buttonHeight / 2;
    var x = event.clientX - (posX + posXMain) - buttonHeight / 2;
    console.log('LEFT:', event.clientX - (posX + posXMain) - buttonHeight / 2);
    var y = event.clientY - posYMain - buttonHeight / 2;
    console.log('TOP:', event.clientY - posYMain - buttonHeight / 2);
     // 6 - add the ripples CSS and start the animation
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
            this.setState({streams});
            this.sortStreams('A-Z');
          }
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
        {/*<SortButtons layoutType={this.state.layoutType} changeLayout={this.changeLayout} />*/}
        <div className="wrapper">
          <div className={this.state.layoutType === "table" ? "stream-list" : "stream-list list"}>
            {streams}
          </div>
        </div>]
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
