import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const newUserMsg = "New user added to table";
const updUserMsg = "User updated";

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '', 
            lastName: '',
            shwMsg: false,
            message: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);      
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.firstName.trim() == '' || !this.state.firstName.match(/^[A-Za-zА-ЯЁа-яё\s]+$/) 
        || this.state.lastName.trim() == '' || !this.state.lastName.match(/^[A-Za-zА-ЯЁа-яё\s]+$/) ) return;
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            name:`${this.state.firstName} ${this.state.lastName}`,
            id: this.props.updateUser ? this.props.updateUser.id : Math.ceil(Math.random()*100),
            isAdmin: this.props.updateUser ? true : false,
            reviews: this.props.updateUser ? this.props.updateUser.reviews : []
        }
        this.props.updateUser ? this.setState({shwMsg: true, message: updUserMsg}) : this.setState({shwMsg: true, message: newUserMsg});
        this.props.onUserFormChange(user);
        this.setState({firstName: '', lastName: ''});        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleRequestClose() {
        this.setState({
            shwMsg: false,
        });
    };    

    componentWillReceiveProps(props){
        if (props.updateUser) this.setState({firstName : props.updateUser.firstName, lastName: props.updateUser.lastName})
        else this.setState({firstName : '', lastName: ''})
    };    

    render() {        
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        
      return (
        <form onSubmit={this.handleSubmit} autoComplete="off">
            User input:
            <div id="userForm">
                <TextField 
                 floatingLabelText="First name" 
                 value={firstName} 
                 name="firstName" 
                 onChange={this.handleInputChange}/><br/>                
                <TextField 
                 floatingLabelText="Last name" 
                 value={lastName} 
                 name="lastName" 
                 onChange={this.handleInputChange}/>
            </div>
            <RaisedButton primary={true} label="Add user" type="submit"/>
            <Snackbar
                open={this.state.shwMsg}
                message={this.state.message}
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose}
            />
        </form>   
      );
             
    }
}

export default UserForm;