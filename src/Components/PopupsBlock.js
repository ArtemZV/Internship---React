import React from 'react';

class Popup extends React.Component {
    state = {
        show : true
    }

    componentDidMount(){
        const {onPopupClose, id} = this.props;
        setTimeout(() => this.setState({show: false}), 1000);
        setTimeout(() => onPopupClose(id), 1800);
    }

    render() {
        const classes = this.state.show ? "popup" : "popup close";
        const {msg} = this.props
        return (
            <div className={classes}>
                {msg}
            </div>
        );
    }
}

class PopupsBlock extends React.Component {
    render() {
        const {onPopupClose, popups} = this.props;
        const listOfPopups = popups.map((msg) =>
            <Popup
                key={msg.id}
                msg={msg.message}
                id={msg.id}
                onPopupClose={onPopupClose}
            />
        );

        return (
            <div id="popupsBlock">
                {listOfPopups}
            </div>
        );
    }
}
export default PopupsBlock;