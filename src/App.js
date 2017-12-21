import React, { Component } from 'react';
import logo from './logo.svg';
import UserForm from './Components/UserForm';
import UsersTable from './Components/UsersTable';
import ReviewForm from './Components/ReviewForm';

import './App.css';

const usersArr = [
    {firstName: "Test", lastName: "User", id: Math.ceil(Math.random()*100)},
    {firstName: "Test", lastName: "User 2", id: Math.ceil(Math.random()*100)},    
]

const reviewsArr = [
  {reviewText:'test review 1', id: Math.ceil(Math.random()*100), userId:usersArr[0].id}, 
  {reviewText: 'test review 2', id: Math.ceil(Math.random()*100), userId:usersArr[0].id},
  {reviewText:'test review 3', id: Math.ceil(Math.random()*100), userId:usersArr[1].id},
  {reviewText: 'test review 4', id: Math.ceil(Math.random()*100), userId:usersArr[1].id}
]

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUserFormChange = this.handleUserFormChange.bind(this);
    this.handleReviewCreated = this.handleReviewCreated.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleDeleteReview = this.handleDeleteReview.bind(this);    
    usersArr.forEach((user) => {
      user.name = `${user.firstName} ${user.lastName}`    
    });

    this.state = {users: usersArr, reviews: reviewsArr};
  }

  handleUserFormChange(user) {
    this.setState((prevState) => ({users: prevState.users.concat(user)}));
  }

  handleReviewCreated(review){
    this.setState((prevState) => ({reviews: prevState.reviews.concat(review)}));
  }

  handleDeleteUser(user){
    const index = this.state.users.indexOf(user);
    this.setState((prevState) => {
      prevState.users.splice(index, 1);
      return {users: prevState.users};
    });
  }

  handleDeleteReview(review){
    const index = this.state.reviews.indexOf(review);
    this.setState((prevState) => {
      prevState.reviews.splice(index, 1);
      return {reviews: prevState.reviews};
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div style={{display: 'inline-block', width: '50%', marginTop: '10px'}}>
          <UserForm name="Test" onUserFormChange={this.handleUserFormChange} />
        </div>
        <div style={{display: 'inline-block', width: '50%', marginTop: '10px'}}>
          <ReviewForm users={this.state.users} onReviewCreate={this.handleReviewCreated} />
        </div>
        <div style={{width: '80%', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto'}}>                    
          <UsersTable users={this.state.users} reviews={this.state.reviews} onUserDelete={this.handleDeleteUser} onReviewDelete={this.handleDeleteReview}/>
        </div>
      </div>
    );
  }
}

export default App;
