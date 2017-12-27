import React, { Component } from 'react';
import UserForm from './Components/UserForm';
import UsersTable from './Components/UsersTable';
import ReviewForm from './Components/ReviewForm';
import PopupsBlock from './Components/PopupsBlock'

const max = 200, min = 0;

function generateId(){
  return Math.floor(Math.random() * (max - min) + min);
}

const usersArr = [
  {firstName: "Test", lastName: "User", id: generateId(), isAdmin: false},
  {firstName: "Test", lastName: "User 2", id: generateId(), isAdmin: false},
  {firstName: "Admin", lastName: "User", id: generateId(), isAdmin: true}
]

const reviewsArr = [
  {reviewText: 'test review 1', id: generateId(), userId:usersArr[0].id, isAproved: true},
  {reviewText: 'test review 2', id: generateId(), userId:usersArr[0].id, isAproved: true},
  {reviewText: 'test review 3', id: generateId(), userId:usersArr[1].id, isAproved: true},
  {reviewText: 'test review 4', id: generateId(), userId:usersArr[1].id, isAproved: true},
  {reviewText: 'default review', id: generateId(), userId:usersArr[2].id, isAproved: true}
]

class App extends Component {
  state = {
    users: usersArr,
    reviews: reviewsArr,
    editingUser: null,
    popups: []
  };

  handleUserFormSubmit = (user) => {
    let {popups, users, editingUser} = this.state;
    if (editingUser){
      users = users.map((usr) => {
        if (usr.id === user.id){
          return user;
        }
        return usr;
      });
      popups.push({message: "User updated", id: generateId()});
    }
    else {
      users.push(user)
      popups.push({message: "New user create", id: generateId()});
    }
    this.setState({editingUser: null, popups, users});
  }

  handleReviewCreated = (review) => {
    const {reviews, popups} = this.state;
    reviews.push(review);
    popups.push({message: "New review create", id: generateId()});
    this.setState({review, popups});
  }

  handleDeleteUser = (user) => {
    let {reviews, users, popups} = this.state;

    user.reviews.forEach((review) => {reviews.splice(reviews.indexOf(review), 1)});
    users = users.filter((usr) => usr.id !== user.id);
    popups.push({message: "User deleted", id: generateId()});

    this.setState({popups, users, reviews});
  }

  handleDeleteReview = (review) => {
    let {reviews, popups} = this.state;
    reviews = reviews.filter((rev) => rev.id !== review.id);
    popups.push({message: "Review deleted", id: generateId()});
    this.setState({reviews, popups});
  }

  handlePopupClose = (id) => {
    let {popups} = this.state;
    popups = popups.filter((popup) => popup.id !== id);
    this.setState({popups});
  }

  handleUserEdit = (editingUser) => {
    this.setState({editingUser});
  }

  render() {
    const {editingUser, users, reviews, popups} = this.state;
    return (
      <div className="App">
        <div className="inlineBlock">
          <UserForm editingUser={editingUser} onUserFormSubmit={this.handleUserFormSubmit} />
        </div>
        <div className="inlineBlock">
          <ReviewForm users={users} onReviewCreate={this.handleReviewCreated} />
        </div>
        <div className="wideBlock">
          <UsersTable
            users={users}
            reviews={reviews}
            onUserDelete={this.handleDeleteUser}
            onReviewDelete={this.handleDeleteReview}
            onUserEdit={this.handleUserEdit}
          />
        </div>
        <PopupsBlock popups={popups} onPopupClose={this.handlePopupClose}/>
      </div>
    );
  }
}

export default App;
