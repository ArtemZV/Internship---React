import React from 'react';


class ReviewForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: '',
            reviewText: ''
        };        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }
    
    handleSubmit(event) {
        event.preventDefault();        
        const review = {            
            id: Math.ceil(Math.random()*100),
            reviewText: this.state.reviewText,
            userId: this.state.selectedUser,
            isAproved: false
        }    
        this.setState({reviewText:'', selectedUser: ''})
        this.props.onReviewCreate(review);  
    }

    handleSelectChange(event) {
        this.setState({
            selectedUser: event.target.value
        });
    }

    handleInputChange(event){
        this.setState({
            reviewText: event.target.value
        });
    }

    render(){
        const users = this.props.users;
        const selectItems = users.map((user) => {
            if (!user.isAdmin) 
            return <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
        }); 
        
        return (
            <form onSubmit={this.handleSubmit} autoComplete="off" id="reviewForm">
                Review input:
                <div>
                    <select
                        value={this.state.selectedUser}
                        onChange={this.handleSelectChange}
                    >
                        <option value={''} children="Select user" />
                        {selectItems}
                    </select>
                    <br />
                    <textarea
                        placeholder="Review text"
                        onChange={this.handleInputChange}
                        value={this.state.reviewText}
                    />
                </div>
                <button
                    children="Add review"
                    type="submit"
                    className="simpleButton"
                    disabled={this.state.selectedUser === null || this.state.reviewText.trim() === ''}
                />                
            </form> 
        );
    }
}

export default ReviewForm;
