import React from 'react';

class Popup extends React.Component {
    state = {
        show : true
    }

    componentDidMount(){
        setTimeout(() => this.setState({show: false}), 1000);
        setTimeout(() => this.props.onPopupClose(this.props.id), 1800);
    }

    render() {
        const classes = this.state.show ? "popup" : "popup close",
                {msg, id} = this.props
        return (
            <div className={classes} datapopupid={id}>
                {msg}
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