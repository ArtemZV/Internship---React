import React, { Component } from 'react';
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
    deleteBtn: { 
        float: 'right',
        height: '100%'
    },
    tableSpan:{
        display: 'inline-flex',
        maxWidth: '350px',
        wordBreak: 'break-word',
        whiteSpace: 'normal',
        alignItems: 'center',
        height: '100%'
    }
}

const userDeletedMsg = 'User deleted form table';
const reviewDeletedMsg = 'Review deleted from table';


function ReviewCell(props){    
    return (
        <TableRow displayBorder={false} style={!props.review.isAproved ? {backgroundColor: '#bbbbbb'} : {}}>
            <TableRowColumn>
                <span style={style.tableSpan}>{props.review.reviewText}</span>    
                <IconButton style={style.deleteBtn} onClick={() => props.onReviewDelete(props.review)}>
                    <FontIcon className="material-icons">clear</FontIcon>               
                </IconButton>
            </TableRowColumn>
        </TableRow>
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
        <TableRow style={props.user.isAdmin ? {backgroundColor:'#69e06e'} : {}}>
            <TableRowColumn style={{fontSize:'18px'}}>
                <span style={style.tableSpan}onClick={props.user.isAdmin ? () => props.onUserUpdate(props.user) : null}>{props.user.name}</span>
                {!props.user.isAdmin &&
                    <IconButton style={style.deleteBtn} onClick={() => props.onUserDelete(props.user)}>
                        <FontIcon className="material-icons">clear</FontIcon>               
                    </IconButton>
                } 
            </TableRowColumn>
            <TableRowColumn>
                <Table style={{backgroundColor: 'inherit'}}>
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
    
    handleRequestClose() {
        this.setState({
            shwMsg: false,
        });
    }

    render(){
        const users = this.props.users;
        const reviews = this.props.reviews;
        
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