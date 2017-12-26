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
        const {firstName, lastName} = this.state;
        const {editingUser, onUserFormSubmit} = this.props;

        const user = {
            firstName,
            lastName,
            id: editingUser ? editingUser.id : Math.ceil(Math.random()*100),
            isAdmin: editingUser ? editingUser.isAdmin : false,
            reviews: editingUser ? editingUser.reviews : []
        }
        onUserFormSubmit(user);
        this.setState({firstName: '', lastName: '', disabled: true});
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleBlur = (event) => {
        let {errors} = this.state;
        if (event.target.value.trim() === '') {
            errors = {
                [event.target.name]: {
                    message: "Please fill this field"
                },
                ...errors
            }
        }
        else {
            delete errors[event.target.name];
        }

        if (Object.keys(errors).length === 0) {
            this.setState({disabled: false, errors})
        }
        else {
            this.setState({disabled: true, errors});
        }
    }

    componentWillReceiveProps(props){
        const {editingUser} = props;
        if (editingUser) {
            this.setState({firstName : editingUser.firstName, lastName: editingUser.lastName, disabled: false, errors: {}})
        }
    };

    render() {
        const {firstName, lastName, errors, disabled} = this.state;
        const {editingUser} = this.props;

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
                        <span>{errors.firstName && errors.firstName.message}</span>
                    </div>
                    <div className={errors.lastName ? "invalid" : ""}>
                        <input
                            placeholder="Last Name"
                            value={lastName}
                            name="lastName"
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                        />
                        <span>{errors.lastName && errors.lastName.message}</span>
                    </div>
                </div>
                <button className="simpleButton" type="submit" disabled={disabled}>
                    {editingUser ? "Update user" : "Add user"}
                </button>
            </form>
        );
    }
}

export default UserForm;