import React, { Component } from 'react';


class Notification extends React.Component {
    render() {
        
      return (
          <div>
              {this.props.message}
          </div>
      );
    }
}
export default Notification;