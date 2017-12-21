import React, { Component } from 'react';
import './ReviewForm.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


class ReviewForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: this.props.users[0].id,
            reviewText: '',
            shwMsg: false
        };        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequestClose =this.handleRequestClose.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }
    
    handleSubmit(event) {
        event.preventDefault();  
        if (this.state.reviewText.trim() == '') return;
        const review = {            
            id: Math.ceil(Math.random()*100),
            reviewText: this.state.reviewText,
            userId: this.state.selectedUser
        }    
        this.setState({reviewText:'',shwMsg: true})
        this.props.onReviewCreate(review);  
    }

    handleRequestClose() {
        this.setState({
            shwMsg: false,
        });
    };

    handleSelectChange(event, index, value) {
        this.setState({
            selectedUser: value
        });
    }

    handleInputChange(event){
        this.setState({
            reviewText: event.target.value
        });
    }

    render(){
        const users = this.props.users;
        const selectItems = users.map((user) => <MenuItem key={user.id} value={user.id} primaryText={user.name} />); 
        return (
            <form onSubmit={this.handleSubmit} autoComplete="off">
                Review input:
                <div id="reviewForm">
                    <SelectField
                        floatingLabelText="Select user"
                        value={this.state.selectedUser}
                        onChange={this.handleSelectChange}
                        style={{textAlign: 'left'}}
                    >
                        {selectItems}
                    </SelectField>
                    <br />
                    <TextField 
                        floatingLabelText="Review text" 
                        name="lastName" 
                        onChange={this.handleInputChange} 
                        multiLine={true}
                        value={this.state.reviewText}
                        style={{textAlign: 'left'}}
                    />
                </div>
                <RaisedButton 
                    primary={true} 
                    label="Add review" 
                    type="submit"
                />
                <Snackbar
                    open={this.state.shwMsg}
                    message="New review added to table"
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
            </form> 
        );
    }
}

export default ReviewForm;
