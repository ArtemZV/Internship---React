import React, { Component } from 'react';

const newUserMsg = "New user added to table";
const updUserMsg = "User updated";

class UserForm extends React.Component {
    state = {
        firstName: '', 
        lastName: '',
        errors: {},
        invalid: true
    }

    validateForm = () => {
        if (this.state.firstName.trim() != '' && this.state.lastName.trim() != ''){
            this.setState({invalid: false});
        } 
        else {
            this.setState({invalid: true});
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
        this.setState({firstName: '', lastName: '', errors: {}, invalid: true});        
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
        if (props.updateUser) this.setState({firstName : props.updateUser.firstName, lastName: props.updateUser.lastName, invalid: false, errors: {}})
        else this.setState({firstName : '', lastName: ''})
    };    

    render() {
        const {firstName, lastName, errors, invalid} = this.state
        
      return (
        <form onSubmit={this.handleSubmit} autoComplete="off" id="userForm">
            User input:
            <div>
                <div className={this.state.errors.firstName && 'invalid'}>
                    <input 
                        placeholder="First Name" 
                        value={firstName} 
                        name="firstName" 
                        onChange={this.handleInputChange}
                        onBlur={this.handleBlur}
                    />
                    {errors.firstName && errors.firstName.message}
                </div>
                <div className={this.state.errors.lastName && 'invalid'}>
                    <input 
                        placeholder="Last Name"
                        value={lastName}
                        name="lastName"
                        onChange={this.handleInputChange}
                        onBlur={this.handleBlur}
                    />
                    {errors.lastName && errors.lastName.message}
                </div>                
            </div>
            <button className="simpleButton" type="submit" disabled={invalid}>
                {this.props.updateUser ?'Update user' : 'Add user'}     
            </button>
        </form>
      );             
    }
}

export default UserForm;