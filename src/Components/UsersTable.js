import React, { Component } from 'react';

function ReviewCell(props){
    const {review} = props;
    return (
        <tr>
            <td className={!review.isAproved ? "isNotAproved" : ""}>
                <span className="tableSpan">{review.reviewText}</span>
                <i className="material-icons deleteBtn" onClick={() => props.onReviewDelete(review)}>clear</i>
            </td>
        </tr>
    )
}

function TableUserRow(props){
    const {reviews, user} = props;
    const listOfReviews = reviews.length > 0 ? reviews.map((review) => {
        if (review.userId === user.id){
            return <ReviewCell
                        key={review.id}
                        review={review}
                        onReviewDelete={props.onReviewDelete}
                    />
        }
    }) : null;
    return (
        <tr className={user.isAdmin ? "isAdmin" : ""}>
            <td>
                <span className="tableSpan" onClick={user.isAdmin ? () => props.onUserUpdate(user) : null}>{user.firstName} {user.lastName}</span>
                {!user.isAdmin &&
                    <i className="material-icons deleteBtn" onClick={() => props.onUserDelete(user)}>clear</i>
                }
            </td>
            <td>
                <table>
                    <tbody>
                        {listOfReviews}
                    </tbody>
                </table>
            </td>
        </tr>
    )
}

class UsersTable extends Component{
    handleUserDelete = (user) => {
        this.props.onUserDelete(user);
    }

    handleReviewDelete = (review) => {
        this.props.onReviewDelete(review);
    }

    handleUserUpdate = (user) => {
        this.props.onUserUpdate(user);
    }

    render(){
        const {users, reviews} = this.props;

        reviews.forEach((review) =>
                {
                    users.forEach((user) => {
                        if (!user.reviews) user.reviews = [];
                        if (user.id === review.userId && user.reviews.indexOf(review) === -1) user.reviews.push(review);
                    })
                }
        );

        const listOfUsers = users.map((user) =>
            <TableUserRow
                key={user.id}
                user={user}
                reviews={reviews}
                onUserDelete={this.handleUserDelete}
                onReviewDelete={this.handleReviewDelete}
                onUserUpdate={this.handleUserUpdate}
            />
        );

        return (
            <div>
                <table id="usersTable">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfUsers}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UsersTable;