import React from 'react';

class Popup extends React.Component {
    state = {
        show : true,
        destroy: false
    }

    handleEndAnim = (animProps) => {
        animProps.animationName === "rightAppear" && setTimeout(() => this.setState({show: false}), 1000)
        animProps.animationName === "erase" && this.setState({destroy: true});
    }

    render() {
        const classes = this.state.show ? "popup" : "popup close"
        if (this.state.destroy) return null;
        return (
            <div className={classes} onAnimationEnd={this.handleEndAnim}>
                {this.props.message}
            </div>
        );
    }
}

class PopupsBlock extends React.Component {
    render() {
        const listOfPopups = this.props.popups.map((msg) => <Popup key={Math.random()} message={msg}/>)

        return (
            <div id="popupsBlock">
                {listOfPopups}
            </div>
        );
    }
}
export default PopupsBlock;