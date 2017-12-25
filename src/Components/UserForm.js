import React, { Component } from 'react';
import Notification from './Notification';

const newUserMsg = "New user added to table";
const updUserMsg = "User updated";

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '', 
            lastName: '',
            shwMsg: false,
            message: '',
            unvalid: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);      
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    validationForm(){
        if (this.state.firstName.trim() == '' 
            || this.state.lastName.trim() == ''
            || !this.state.firstName.match(/^[A-Za-zА-ЯЁа-яё\s]+$/) 
            || !this.state.lastName.match(/^[A-Za-zА-ЯЁа-яё\s]+$/)){
            this.setState({unvalid: true});
        } 
        else {
            this.setState({unvalid: false});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
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
        this.validationForm();        
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
                <input 
                 placeholder="First Name" 
                 value={firstName} 
                 name="firstName" 
                 onChange={this.handleInputChange}/><br/>                
                <input 
                 placeholder="Last Name" 
                 value={lastName} 
                 name="lastName" 
                 onChange={this.handleInputChange}/>
            </div>
            <button type="submit" disabled={this.state.unvalid}>
                Add user
            </button>
            <Notification
                open={this.state.shwMsg}
                message={this.state.message}
                onRequestClose={this.handleRequestClose}
            />
        </form>   
      );
             
    }
}

export default UserForm;