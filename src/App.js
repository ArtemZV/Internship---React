import React, { Component } from 'react';
import UserForm from './Components/UserForm';
import UsersTable from './Components/UsersTable';
import ReviewForm from './Components/ReviewForm';
import PopupsBlock from './Components/PopupsBlock'

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
  state = {
    users: usersArr,
    reviews: reviewsArr,
    updateUser: null,
    popups: []
  };

  handleUserFormChange = (user) => {
    const popups = this.state.popups,
          users = this.state.users;
    if (this.state.updateUser){
      const index = users.indexOf(this.state.updateUser);
      users.splice(index, 1, user);
      this.setState({updateUser: null, users: users});
      popups.push("User updated");
    }
    else  {
      this.setState({users: users.concat(user)});
      popups.push("New user create");
    }
    this.setState({popups: popups});
  }

  handleReviewCreated = (review) => {
    const reviews = this.state.reviews;
    this.setState({reviews: reviews.concat(review)});

    const popups = this.state.popups;
    this.setState({popups: popups.push("New review create")});
  }

  handleDeleteUser = (user) => {
    const reviews = this.state.reviews;
    user.reviews.forEach((review) => {reviews.splice(reviews.indexOf(review), 1)});

    const users = this.state.users;
    users.splice(users.indexOf(user), 1);

    const updUser = (this.state.updateUser && this.state.updateUser.id === user.id) ? null : this.state.updateUser;
    this.setState({users: users, reviews: reviews, updateUser: updUser});

    const popups = this.state.popups;
    this.setState({popups: popups.push("User deleted")});
  }

  handleDeleteReview = (review) => {
    const reviews = this.state.reviews,
          index = reviews.indexOf(review),
          popups = this.state.popups;
    reviews.splice(index, 1);
    this.setState({
      reviews: reviews,
      popups:popups.push("Review deleted")
    });
  }

  handleUserUpdate = (user) => {
    this.setState({updateUser: user});
  }

  render() {
    return (
      <div className="App">
        <div className="inlineBlock">
          <UserForm updateUser={this.state.updateUser} onUserFormChange={this.handleUserFormChange} />
        </div>
        <div className="inlineBlock">
          <ReviewForm users={this.state.users} onReviewCreate={this.handleReviewCreated} />
        </div>
        <div className="wideBlock">
          <UsersTable
            users={this.state.users}
            reviews={this.state.reviews}
            onUserDelete={this.handleDeleteUser}
            onReviewDelete={this.handleDeleteReview}
            onUserUpdate={this.handleUserUpdate}
          />
        </div>
        <PopupsBlock popups={this.state.popups}/>
      </div>
    );
  }
}

export default App;
