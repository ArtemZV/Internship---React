import React, { Component } from 'react';
import './UserForm.css';

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {firstName: '', lastName: ''}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);        
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            name:`${this.state.firstName} ${this.state.lastName}`,
            id: this.state.id ? this.state.id : Math.random()*100,
            reviews: []
        }
        this.props.onUserFormChange(user);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        
      return (
        // <fieldset>
        //     <legend>User input:</legend>
        //     <label>First name:<input  name="firstName" type="text" onChange={this.handleInputChange}/></label><br/>
        //     <label>Last name: <input name="lastName" type="text" onChange={this.handleInputChange}></input></label>
        // </fieldset>
        <form onSubmit={this.handleSubmit}>
            User input:
            <div id="userForm">
                <label>First name: <input value={firstName} name="firstName" type="text" onChange={this.handleInputChange}></input></label><br/>
                <label>Last name: <input value={lastName} name="lastName" type="text" onChange={this.handleInputChange}></input></label>                
            </div>
            <input type="submit" value="add user"/>
        </form>   
      );
             
    }
}

export default UserForm;