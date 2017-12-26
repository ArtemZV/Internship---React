import React from 'react';


class ReviewForm extends React.Component{
    state = {
        selectedUser: '',
        reviewText: '',
        errors: {},
        disabled: true
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const   {reviewText, selectedUser} = this.state,
                review = {
                    id: Math.ceil(Math.random()*100),
                    reviewText,
                    userId: parseInt(selectedUser, 10),
                    isAproved: false
                };
        this.setState({reviewText: '', selectedUser: '', disabled: true})
        this.props.onReviewCreate(review);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleBlur = (event) => {
        const {errors} = this.state,
                target = event.target;
        if (target.value.trim() === '') {
            this.setState({
                errors: {
                    [target.name]: {
                        message: `${target.name} is required`
                    },
                    ...errors
                }
            })
        }
        else {
            delete errors[target.name];
            this.setState({
                errors: errors
            })
        }
        this.validateForm();
    }

    validateForm = () => {
        if (this.state.selectedUser !== '' && this.state.reviewText.trim() !== ''){
            this.setState({disabled: false})
        }
        else {
            this.setState({disabled: true});
        }
    }

    render(){
        const {selectedUser, reviewText, errors, disabled} = this.state
        const {users} = this.props;
        const selectItems = users.map((user) => {
            if (!user.isAdmin) {
                return <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
            }
        });

        return (
            <form onSubmit={this.handleSubmit} autoComplete="off" id="reviewForm">
                Review input:
                <div>
                    <div className={errors.selectedUser ? "invalid" : ""}>
                        <select
                            value={selectedUser}
                            onChange={this.handleChange}
                            name="selectedUser"
                            onBlur={this.handleBlur}
                        >
                            <option value={''} children="Select user" />
                            {selectItems}
                        </select>
                        {errors.selectedUser && errors.selectedUser.message}
                    </div>
                    <div className={errors.reviewText ? "invalid" : ""}>
                        <textarea
                            value={reviewText}
                            onChange={this.handleChange}
                            placeholder="Review text"
                            name="reviewText"
                            onBlur={this.handleBlur}
                        />
                        {errors.reviewText && errors.reviewText.message}
                    </div>
                </div>
                <button
                    children="Add review"
                    type="submit"
                    className="simpleButton"
                    disabled={disabled}
                />
            </form>
        );
    }
}

export default ReviewForm;
