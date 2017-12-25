import React, { Component } from 'react';

const newUserMsg = "New user added to table";
const updUserMsg = "User updated";

class UserForm extends React.Component {
    state = {
        firstName: '', 
        lastName: '',
        errors: {},
        unvalid: true
    }

    validateForm = () => {
        if (this.state.firstName.trim() != '' && this.state.lastName.trim() != ''){
            this.setState({unvalid: false});
        } 
        else {
            this.setState({unvalid: true});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            id: this.props.updateUser ? this.props.updateUser.id : Math.ceil(Math.random()*100),
            isAdmin: this.props.updateUser ? true : false,
            reviews: this.props.updateUser ? this.props.updateUser.reviews : []
        }
        this.props.onUserFormChange(user);
        this.setState({firstName: '', lastName: '', errors: {}, unvalid: true});        
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });       
    }    
    
    handleBlur = (event) => {
        if (event.target.value.trim() === '') {
            this.setState({
                errors: {
                    [event.target.name]: {
                        message: `${event.target.name} is required`
                    }
                }
            })
        }
        else {
            this.setState({
                errors: {}
            })
        }
        this.validateForm();
    }

    componentWillReceiveProps(props){
        if (props.updateUser) this.setState({firstName : props.updateUser.firstName, lastName: props.updateUser.lastName})
        else this.setState({firstName : '', lastName: ''})
    };    

    render() {
        const {firstName, lastName, errors, unvalid} = this.state
        
      return (
        <form onSubmit={this.handleSubmit} autoComplete="off" id="userForm">
            User input:
            <div>
                <input 
                    placeholder="First Name" 
                    value={firstName} 
                    name="firstName" 
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                />
                {errors.firstName && errors.firstName.message}
                <input 
                    placeholder="Last Name"
                    value={lastName}
                    name="lastName"
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                />
                {errors.lastName && errors.lastName.message}
            </div>
            <button className="simpleButton" type="submit" disabled={unvalid}>
                Add user
            </button>
        </form>
      );             
    }
}

export default UserForm;