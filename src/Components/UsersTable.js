import React, { Component } from 'react';
import './UsersTable.css';

function ReviewCell(props){
    return (
        <tr>
            <td>
                <span>
                    {props.reviewText}               
                </span>
                <span>x</span>
            </td>
        </tr>
    )
}

function ReviewTable(props){
    const reviews = props.reviews;
    const listReviews = reviews.length > 0 ? reviews.map((review) => <ReviewCell key={review.id} reviewText={review.reviewText}/>) : null;
    return (
        <table>
            <tbody>
                {listReviews}
            </tbody>
        </table>
    );
}

function TableUserRow(props){
    return (
        <tr>
            <td>
                <span>
                    {props.name}
                </span>
                <span>x</span>
            </td>
            <td>
                <ReviewTable reviews={props.reviews}/>
            </td>
        </tr>
    )
}

class UsersTable extends Component{
    constructor(props) {
        super(props);        
    }

    render(){
        const users = this.props.users;
        const listUsers = 
        users.map((user) => <TableUserRow key={user.id} name={user.name} reviews={user.reviews}/>);
        
        return (
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Reviews</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers}
                </tbody>
            </table>
        )        
    }
}

export default UsersTable;