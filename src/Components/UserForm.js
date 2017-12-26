import React from 'react';

class UserForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        errors: {},
        disabled: true
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
        this.setState({firstName: '', lastName: '', disabled: true});
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleBlur = (event) => {
        const errors = this.state.errors;
        if (event.target.value.trim() === '') {
            this.setState({
                errors: {
                    [event.target.name]: {
                        message: "Please fill this field"
                    },
                    ...errors
                }
            })
        }
        else {
            delete errors[event.target.name];
            this.setState({
                errors: errors
            })
        }
        this.validateForm();
    }

    validateForm = () => {
        if (this.state.firstName.trim() !== '' && this.state.lastName.trim() !== '') {
            this.setState({disabled: false})
        }
        else {
            this.setState({disabled: true});
        }
    }

    componentWillReceiveProps(props){
        if (props.updateUser) {
            this.setState({firstName : props.updateUser.firstName, lastName: props.updateUser.lastName, disabled: false, errors: {}})
        }
        else {
            this.setState({firstName : '', lastName: ''})
        }
    };

    render() {
        const {firstName, lastName, errors, disabled} = this.state;

      return (
        <form onSubmit={this.handleSubmit} autoComplete="off" id="userForm">
            User input:
            <div>
                <div className={errors.firstName ? "invalid" : ""}>
                    <input
                        placeholder="First Name"
                        value={firstName}
                        name="firstName"
                        onChange={this.handleInputChange}
                        onBlur={this.handleBlur}
                    />
                    {errors.firstName && errors.firstName.message}
                </div>
                <div className={errors.lastName ? "invalid" : ""}>
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
            <button className="simpleButton" type="submit" disabled={disabled}>
                {this.props.updateUser ? "Update user" : "Add user"}
            </button>
        </form>
      );
    }
}

export default UserForm;