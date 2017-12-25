import React, { Component } from 'react';

const style = {    
    deleteBtn: { 
        float: 'right',
        height: '100%',
        display: 'inline-flex',
        alignItems: 'center',
    },
    tableSpan:{
        display: 'inline-flex',
        maxWidth: '350px',
        wordBreak: 'break-word',
        whiteSpace: 'normal',
        alignItems: 'center',
        height: '100%',
        float: 'left',
        marginLeft: '20px'
    }
}

const userDeletedMsg = 'User deleted form table';
const reviewDeletedMsg = 'Review deleted from table';


function ReviewCell(props){    
    return (
        <tr style={!props.review.isAproved ? {backgroundColor: '#bbbbbb'} : {}}>
            <td>
                <span style={style.tableSpan}>{props.review.reviewText}</span>  
                <i className="material-icons" style={style.deleteBtn} onClick={() => props.onReviewDelete(props.review)}>clear</i>
            </td>
        </tr>
    )
}

function TableUserRow(props){
    const reviews = props.reviews;
    const listOfReviews = reviews.length > 0 ? reviews.map((review) => { 
        if (review.userId == props.user.id) 
        return <ReviewCell 
                key={review.id} 
                review={review} 
                onReviewDelete={props.onReviewDelete}
                />
    }) : null;    
    return (
        <tr style={props.user.isAdmin ? {backgroundColor:'#69e06e'} : {}}>
            <td style={{fontSize:'18px'}}>
                <span style={style.tableSpan}onClick={props.user.isAdmin ? () => props.onUserUpdate(props.user) : null}>{props.user.firstName} {props.user.lastName}</span>
                {!props.user.isAdmin &&
                    <i className="material-icons" style={style.deleteBtn} onClick={() => props.onUserDelete(props.user)}>clear</i>               
                } 
            </td>
            <td>
                <table style={{backgroundColor: 'inherit'}}>
                    <tbody>
                        {listOfReviews}
                    </tbody>
                </table>
            </td>
        </tr>
    )
}

class UsersTable extends Component{
    constructor(props) {
        super(props);
        this.state = {shwMsg: false, message: ''};
        this.handleUserDelete = this.handleUserDelete.bind(this);
        this.handleReviewDelete = this.handleReviewDelete.bind(this);
        this.handleUserUpdate = this.handleUserUpdate.bind(this);                
    }
    handleUserDelete(user){
        this.props.onUserDelete(user);
        this.setState({shwMsg: true, message: userDeletedMsg});
    }

    handleReviewDelete(review){
        this.props.onReviewDelete(review);
        this.setState({shwMsg: true, message: reviewDeletedMsg});
    }

    handleUserUpdate(user){
        this.props.onUserUpdate(user);
    }

    render(){
        const users = this.props.users;
        const reviews = this.props.reviews;
      
        reviews.forEach((review) =>
                {
                users.forEach((user) => {
                        if (!user.reviews) user.reviews = [];
                        if (user.id == review.userId && user.reviews.indexOf(review) == -1) user.reviews.push(review);
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