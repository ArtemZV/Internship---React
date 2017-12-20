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
  import IconButton from 'material-ui/IconButton';

function ReviewCell(props){
    return (
        <TableRow>
            <TableRowColumn>
                <span>
                    {props.reviewText}               
                </span>
                <span>x</span>
            </TableRowColumn>
        </TableRow>
    )
}

function ReviewTable(props){
    const reviews = props.reviews;
    const listReviews = reviews.length > 0 ? reviews.map((review) => <ReviewCell key={review.id} reviewText={review.reviewText}/>) : null;
    return (
        <Table>
            <TableBody>
                {listReviews}
            </TableBody>
        </Table>
    );
}

function TableUserRow(props){
    return (
        <TableRow>
            <TableRowColumn>
                <span>
                    {props.name}
                </span>
                <IconButton iconClassName="material-ui-icons-github"/>
            </TableRowColumn>
            <TableRowColumn>
                <ReviewTable reviews={props.reviews}/>
            </TableRowColumn>
        </TableRow>
    )
}

class UsersTable extends Component{
    constructor(props) {
        super(props);        
    }

    render(){
        const users = this.props.users;
        const listUsers = users.map((user) => <TableUserRow key={user.id} name={user.name} reviews={user.reviews}/>);
        
        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>User</TableHeaderColumn>
                        <TableHeaderColumn>Reviews</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={true}>
                    {listUsers}
                </TableBody>
            </Table>
        )        
    }
}

export default UsersTable;