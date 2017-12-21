import React, { Component } from 'react';
import './UsersTable.css';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  import Paper from 'material-ui/Paper'
  import IconButton from 'material-ui/IconButton';
  import FontIcon from 'material-ui/FontIcon';
  import Snackbar from 'material-ui/Snackbar';

const style = {    
    clear: { 
        float: 'right',
        padding: 0,
        height: '24px'
    }
}

const userDeletedMsg = 'User deleted form table';
const reviewDeletedMsg = 'Review deleted from table';


function ReviewCell(props){    
    return (
        <TableRow displayBorder={false}>
            <TableRowColumn>
                <span>{props.reviewText}</span>    
                <IconButton style={style.clear} onClick={() => props.onReviewDelete(props.review)}>
                    <FontIcon className="material-icons">clear</FontIcon>               
                </IconButton>
            </TableRowColumn>
        </TableRow>
    )
}

function TableUserRow(props){
    const reviews = props.reviews;
    const listOfReviews = reviews.length > 0 ? reviews.map((review) => <ReviewCell key={review.id} review={review} reviewText={review.reviewText} onReviewDelete={props.onReviewDelete}/>) : null;    
    return (
        <TableRow>
            <TableRowColumn style={{fontSize:'18px'}}>
                <span>{props.name}</span>
                <IconButton style={style.clear} onClick={() => props.onUserDelete(props.user)}>
                    <FontIcon className="material-icons">clear</FontIcon>               
                </IconButton> 
            </TableRowColumn>
            <TableRowColumn>
                <Table>
                    <TableBody>
                        {listOfReviews}
                    </TableBody>
                </Table>
            </TableRowColumn>
        </TableRow>
    )
}

class UsersTable extends Component{
    constructor(props) {
        super(props);
        this.state = {shwMsg: false, message: ''};
        this.handleUserDelete = this.handleUserDelete.bind(this);
        this.handleReviewDelete = this.handleReviewDelete.bind(this)
        this.handleRequestClose = this.handleRequestClose.bind(this);        
    }
    handleUserDelete(user){
        this.props.onUserDelete(user);
        this.setState({shwMsg: true, message: userDeletedMsg});
    }

    handleReviewDelete(review){
        this.props.onReviewDelete(review);
        this.setState({shwMsg: true, message: reviewDeletedMsg});
    }
    
    handleRequestClose() {
        this.setState({
            shwMsg: false,
        });
    }
    render(){
        const users = this.props.users;
        this.props.reviews.forEach((review) =>
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
            name={user.name} 
            reviews={user.reviews} 
            onUserDelete={this.handleUserDelete} 
            onReviewDelete={this.handleReviewDelete}/>);
        
        return (
            <Paper zDepth={1}>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>User</TableHeaderColumn>
                            <TableHeaderColumn>Reviews</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true}>
                        {listOfUsers}
                    </TableBody>
                </Table>
                <Snackbar
                    open={this.state.shwMsg}
                    message={this.state.message}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
            </Paper>            
        )        
    }
}

export default UsersTable;