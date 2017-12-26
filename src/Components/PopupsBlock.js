import React from 'react';

class Popup extends React.Component {
    state = {
        show : true
    }

    handleEndAnim = (animProps) => {
        animProps.animationName === "rightAppear" && setTimeout(() => this.setState({show: false}), 1000)
        if (animProps.animationName === "erase") {
            this.props.onPopupClose(animProps.target.getAttribute("datapopupid"));
        };
    }

    render() {
        const classes = this.state.show ? "popup" : "popup close"
        return (
            <div className={classes} onAnimationEnd={this.handleEndAnim} datapopupid={this.props.id}>
                {this.props.msg}
            </div>
        );
    }
}

class PopupsBlock extends React.Component {
    render() {
        const listOfPopups = this.props.popups.map((msg) =>
            <Popup
                key={msg.id}
                msg={msg.message}
                id={msg.id}
                onPopupClose={this.props.onPopupClose}
            />);

        return (
            <div id="popupsBlock">
                {listOfPopups}
            </div>
        );
    }
}
export default PopupsBlock;