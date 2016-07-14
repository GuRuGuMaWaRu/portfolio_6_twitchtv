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
      // streamsOriginal: [],
      selectionType: 'A-Z',
      layoutType: 'table'
    };
    this.sortStreams = this.sortStreams.bind(this);
    // this.changeLayout = this.changeLayout.bind(this);
  }

  customForEach(items, fn) {
    let i,
        len = items.length;

    for (i = 0; i < len; i++) {
      fn(items[i], i, items);
    }
  }

  sortStreams(label) {
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // console.log(event);
    // let mouseX = event.clientX - (event.target.offsetLeft + document.getElementById('test').offsetLeft),
    //     mouseY = event.clientY - (event.target.offsetTop + document.getElementById('test').offsetTop),
    //     newElement = document.createElement('span');

    // Remove any old elements
    // if (document.querySelector('.new-element')) {
    //   document.querySelector('.new-element').remove();
    // }
    //
    // newElement.classList.add('new-element');
    // newElement.style.top = (mouseY) + 'px';
    // newElement.style.left = (mouseX) + 'px';
    // document.getElementsByClassName('nav-link')[0].appendChild(newElement);
    // window.setTimeout(() => {
    //   document.getElementsByClassName('new-element')[0].classList.add('expanded');
    // }, 300, () => {
    //   document.getElementsByClassName('nav-link')[0].removeChild(document.getElementsByClassName('expanded')[0]);
    // });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        <NavBar sortStreams={this.sortStreams} selectionType={this.state.selectionType} />
        {/*<SortButtons layoutType={this.state.layoutType} changeLayout={this.changeLayout} />*/}
        <div className="wrapper">
          <div className={this.state.layoutType === "table" ? "stream-list" : "stream-list list"}>
            {streams}
          </div>
        </div>]
        <div className="footer">
          <div className="wrapper">
            <p>Created by <a href="https://github.com/GuRuGuMaWaRu" target="_blank">GuRuGuMaWaRu</a>, 2016</p>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
