import React, { Component } from 'react';


class Notification extends React.Component {
    state = {
        show : true,
        destroy: false
    }
    componentDidMount(){
        setTimeout(() => this.setState({show: false}), 1000);
        setTimeout(() => this.setState({destroy: true}), 1800);
    }
    render() {
        const classes = this.state.show ? "popup" : "popup close"
        if (this.state.destroy) return null;
        return (
            <div className={classes}>
                {this.props.message}
            </div>
        );
    }
}
export default Notification;