import React from 'react';
import NavItem from './NavItem';

export default class NavBar extends React.Component {

    render() {
      return (
        <div className="wrapper my-navbar">
          <h1>TWITCH TV</h1>
          <ul className="my-navbar-menu">
            <NavItem label="All" clickHandler={this.props.sortStreams}/>
            <NavItem label="Online" clickHandler={this.props.sortStreams}/>
            <NavItem label="Offline" clickHandler={this.props.sortStreams}/>
          </ul>
        </div>
      )
    }
}

NavBar.propType = {
  sortStreams: React.PropTypes.func
}
