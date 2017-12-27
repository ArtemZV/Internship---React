import React, { Component } from 'react';
import UserForm from './Components/UserForm';
import UsersTable from './Components/UsersTable';
import ReviewForm from './Components/ReviewForm';
import PopupsBlock from './Components/PopupsBlock'

var popupId = 1;

const usersArr = [
  {firstName: "Test", lastName: "User", id: 1, isAdmin: false},
  {firstName: "Test", lastName: "User 2", id: 2, isAdmin: false},
  {firstName: "Admin", lastName: "User", id: 3, isAdmin: true}
]

const reviewsArr = [
  {reviewText: 'test review 1', id: 1, userId:usersArr[0].id, isAproved: true},
  {reviewText: 'test review 2', id: 2, userId:usersArr[0].id, isAproved: true},
  {reviewText: 'test review 3', id: 3, userId:usersArr[1].id, isAproved: true},
  {reviewText: 'test review 4', id: 4, userId:usersArr[1].id, isAproved: true},
  {reviewText: 'default review', id: 5, userId:usersArr[2].id, isAproved: true}
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
      popups.push({message: "User updated", id: popupId++});
    }
    else {
      users.push(user)
      popups.push({message: "New user created", id: popupId++});
    }
    this.setState({editingUser: null, popups, users});
  }

  handleReviewCreated = (review) => {
    const {reviews, popups} = this.state;
    reviews.push(review);
    popups.push({message: "New review created", id: popupId++});
    this.setState({review, popups});
  }

  handleDeleteUser = (user) => {
    let {reviews, users, popups} = this.state;

    user.reviews.forEach((review) => {reviews = reviews.map((rev) => {if (rev.id !== review.id) return rev})});
    users = users.filter((usr) => usr.id !== user.id);
    popups.push({message: "User deleted", id: popupId++});

    this.setState({popups, users, reviews});
  }

  handleDeleteReview = (review) => {
    let {reviews, popups} = this.state;
    reviews = reviews.filter((rev) => rev.id !== review.id);
    popups.push({message: "Review deleted", id: popupId++});
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
