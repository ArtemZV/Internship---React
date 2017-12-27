import React from 'react';

var reviewId = 6;

class ReviewForm extends React.Component{
    state = {
        selectedUser: '',
        reviewText: '',
        errors: {},
        disabled: true
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {reviewText, selectedUser} = this.state;
        const {onReviewCreate} = this.props;
        const review = {
                    id: reviewId++,
                    reviewText,
                    userId: parseInt(selectedUser, 10),
                    isAproved: false
                };
        this.setState({reviewText: '', selectedUser: '', disabled: true})
        onReviewCreate(review);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleBlur = (event) => {
        let {errors, selectedUser, reviewText} = this.state;
        const target = event.target;
        if (target.value.trim() === '') {
            errors = {
                [target.name]: {
                    message: `${target.name} is required`
                },
                ...errors
            }
        }
        else {
            delete errors[target.name];
        }

        if (Object.keys(errors).length === 0 && selectedUser.trim() !== '' && reviewText.trim() !== '') {
            this.setState({disabled: false, errors})
        }
        else {
            this.setState({disabled: true, errors});
        }
    }

    render(){
        const {selectedUser, reviewText, errors, disabled} = this.state;
        const {users} = this.props;
        const selectItems = users.map((user) => {
            if (!user.isAdmin) {
                return <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
            }
        });

        return (
            <form onSubmit={this.handleSubmit} autoComplete="off" id="reviewForm">
                <span>Review input:</span>
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
                        <span>{errors.selectedUser && errors.selectedUser.message}</span>
                    </div>
                    <div className={errors.reviewText ? "invalid" : ""}>
                        <textarea
                            value={reviewText}
                            onChange={this.handleChange}
                            placeholder="Review text"
                            name="reviewText"
                            onBlur={this.handleBlur}
                        />
                        <span>{errors.reviewText && errors.reviewText.message}</span>
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
