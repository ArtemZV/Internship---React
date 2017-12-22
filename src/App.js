import React, { Component } from 'react';
import logo from './logo.svg';
import UserForm from './Components/UserForm';
import UsersTable from './Components/UsersTable';
import ReviewForm from './Components/ReviewForm';

import './App.css';

const usersArr = [
    {firstName: "Test", lastName: "User", id: Math.ceil(Math.random()*100), isAdmin: false},
    {firstName: "Test", lastName: "User 2", id: Math.ceil(Math.random()*100), isAdmin: false},
    {firstName: "Default", lastName: "User", id: Math.ceil(Math.random()*100), isAdmin: true}    
]

const reviewsArr = [
  {reviewText:'test review 1', id: Math.ceil(Math.random()*100), userId:usersArr[0].id}, 
  {reviewText: 'test review 2', id: Math.ceil(Math.random()*100), userId:usersArr[0].id},
  {reviewText:'test review 3', id: Math.ceil(Math.random()*100), userId:usersArr[1].id},
  {reviewText: 'test review 4', id: Math.ceil(Math.random()*100), userId:usersArr[1].id},
  {reviewText: 'default review', id: Math.ceil(Math.random()*100), userId:usersArr[2].id}
]

const style = {
  inlineBlock: {display: 'inline-block', width: '50%', marginTop: '10px'},
  wideBlock: {width: '80%', marginTop: '15px', marginLeft: 'auto', marginRight: 'auto'}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUserFormChange = this.handleUserFormChange.bind(this);
    this.handleReviewCreated = this.handleReviewCreated.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleDeleteReview = this.handleDeleteReview.bind(this); 
    this.handleUserUpdate = this.handleUserUpdate.bind(this);   
    usersArr.forEach((user) => {
      user.name = `${user.firstName} ${user.lastName}`    
    });

    reviewsArr.forEach((review) =>
            {
                usersArr.forEach((user) => {
                    if (!user.reviews) user.reviews = [];
                    if (user.id == review.userId && user.reviews.indexOf(review) == -1) user.reviews.push(review);
                })
            }
    );

    this.state = {users: usersArr, reviews: reviewsArr, updateUser: null};
  }

  handleUserFormChange(user) {
    if (this.state.updateUser){
      this.setState((prevState) => {
        const index = this.state.users.indexOf(prevState.updateUser);
        prevState.users.splice(index, 1, user);
        return {updateUser: null, users: prevState.users};
      });
    }
    else  this.setState((prevState) => ({users: prevState.users.concat(user)}));
  }

  handleReviewCreated(review){
    this.setState((prevState) => ({reviews: prevState.reviews.concat(review)}));
  }

  handleDeleteUser(user){
    const index = this.state.users.indexOf(user);
    this.setState((prevState) => {
      prevState.users.splice(index, 1);
      user.reviews.forEach((review) => {prevState.reviews.splice(prevState.reviews.indexOf(review), 1)});
      return {users: prevState.users, reviews: prevState.reviews, updateUser: prevState.updateUser.id == user.id ? null : prevState.updateUser};
    });
  }

  handleDeleteReview(review){
    const index = this.state.reviews.indexOf(review);
    this.setState((prevState) => {
      prevState.reviews.splice(index, 1);
      return {reviews: prevState.reviews};
    });
  }

  handleUserUpdate(user){
    this.setState({updateUser: user});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div style={style.inlineBlock}>
          <UserForm name="Test" updateUser={this.state.updateUser} onUserFormChange={this.handleUserFormChange} />
        </div>
        <div style={style.inlineBlock}>
          <ReviewForm users={this.state.users} onReviewCreate={this.handleReviewCreated} />
        </div>
        <div style={style.wideBlock}>                    
          <UsersTable 
            users={this.state.users} 
            reviews={this.state.reviews} 
            onUserDelete={this.handleDeleteUser} 
            onReviewDelete={this.handleDeleteReview}
            onUserUpdate={this.handleUserUpdate}
          />
        </div>
      </div>
    );
  }
}

export default App;
