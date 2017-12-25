import React, { Component } from 'react';
import UserForm from './Components/UserForm';
import UsersTable from './Components/UsersTable';
import ReviewForm from './Components/ReviewForm';
import Notification from './Components/Notification'

import './App.css';

const usersArr = [
    {firstName: "Test", lastName: "User", id: Math.ceil(Math.random()*100), isAdmin: false},
    {firstName: "Test", lastName: "User 2", id: Math.ceil(Math.random()*100), isAdmin: false},
    {firstName: "Default", lastName: "User", id: Math.ceil(Math.random()*100), isAdmin: true}    
]

const reviewsArr = [
  {reviewText:'test review 1', id: Math.ceil(Math.random()*100), userId:usersArr[0].id, isAproved: true}, 
  {reviewText: 'test review 2', id: Math.ceil(Math.random()*100), userId:usersArr[0].id, isAproved: true},
  {reviewText:'test review 3', id: Math.ceil(Math.random()*100), userId:usersArr[1].id, isAproved: true},
  {reviewText: 'test review 4', id: Math.ceil(Math.random()*100), userId:usersArr[1].id, isAproved: true},
  {reviewText: 'default review', id: Math.ceil(Math.random()*100), userId:usersArr[2].id, isAproved: true}
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: usersArr,
      reviews: reviewsArr,
      updateUser: null,
      popups: []
    };
  }

  handleUserFormChange = (user) => {
    if (this.state.updateUser){
      this.setState((prevState) => {
        const index = this.state.users.indexOf(prevState.updateUser);
        prevState.users.splice(index, 1, user);
        return {updateUser: null, users: prevState.users};
      });
    }
    else  this.setState((prevState) => ({users: prevState.users.concat(user)}));
    this.state.popups.push(<Notification key={Math.random()} message="New user create"/>);
    this.setState((prevState) => {popups:prevState.popups});
  }

  handleReviewCreated = (review) => {
    this.setState((prevState) => ({reviews: prevState.reviews.concat(review)}));
    this.state.popups.push(<Notification key={Math.random()} message="New review create"/>);
    this.setState((prevState) => {popups:prevState.popups});
  }

  handleDeleteUser = (user) => {
    user.reviews.forEach((review) => {this.state.reviews.splice(this.state.reviews.indexOf(review), 1)});
    const index = this.state.users.indexOf(user);
    this.state.users.splice(index, 1);
    this.setState((prevState) => ({users: prevState.users, reviews: prevState.reviews, updateUser: (prevState.updateUser && prevState.updateUser.id == user.id) ? null : prevState.updateUser}));
  }

  handleDeleteReview = (review) => {
    const index = this.state.reviews.indexOf(review);
    this.state.reviews.splice(index, 1);    
    this.setState((prevState) => {reviews: prevState.reviews});
  }

  handleUserUpdate = (user) => {
    this.setState({updateUser: user});
  }

  render() {
    return (
      <div className="App">        
        <div className='inlineBlock'>
          <UserForm updateUser={this.state.updateUser} onUserFormChange={this.handleUserFormChange} />
        </div>
        <div className='inlineBlock'>
          <ReviewForm users={this.state.users} onReviewCreate={this.handleReviewCreated} />
        </div>
        <div className='wideBlock'>                    
          <UsersTable 
            users={this.state.users} 
            reviews={this.state.reviews} 
            onUserDelete={this.handleDeleteUser} 
            onReviewDelete={this.handleDeleteReview}
            onUserUpdate={this.handleUserUpdate}
          />
        </div>
        <div id="popupsBlock">
          {this.state.popups}
        </div>
      </div>
    );
  }
}

export default App;
