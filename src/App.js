import React, { Component } from 'react';
import UserForm from './Components/UserForm';
import UsersTable from './Components/UsersTable';
import ReviewForm from './Components/ReviewForm';
import PopupsBlock from './Components/PopupsBlock'

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
    const {popups, users, updateUser} = this.state;
    if (updateUser){
      const index = users.findIndex(user => user.id === updateUser.id);
      users.splice(index, 1, user);
      popups.push({message: "User updated", id: Math.ceil(Math.random()*100)});
    }
    else {
      users.push(user)
      popups.push({message: "New user create", id: Math.ceil(Math.random()*100)});
    }
    this.setState({updateUser: null, popups, users});
  }

  handleReviewCreated = (review) => {
    const {reviews, popups} = this.state;
    reviews.push(review);
    popups.push({message: "New review create", id: Math.ceil(Math.random()*100)});

    this.setState({review, popups});
  }

  handleDeleteUser = (user) => {
    const {reviews, users, popups} = this.state,
          updateUser = (this.state.updateUser && this.state.updateUser.id === user.id) ? null : this.state.updateUser;

    user.reviews.forEach((review) => {reviews.splice(reviews.indexOf(review), 1)});
    const index = users.findIndex(u => user.id === u.id);
    users.splice(index, 1);
    popups.push({message: "User deleted", id: Math.ceil(Math.random()*100)});

    this.setState({popups, users, reviews, updateUser});
  }

  handleDeleteReview = (review) => {
    const {reviews, popups} = this.state,
          index = reviews.findIndex(rev => review.id === rev.id);

    reviews.splice(index, 1);
    popups.push({message: "Review deleted", id: Math.ceil(Math.random()*100)});
    this.setState({reviews, popups});
  }

  handlePopupClose = (id) => {
    const popups = this.state.popups,
          index = popups.findIndex(popup => popup.id === id);
    popups.splice(index, 1);
    this.setState({popups});
  }

  handleUserEdit = (updateUser) => {
    this.setState({updateUser});
  }

  render() {
    const {updateUser, users, reviews, popups} = this.state;
    return (
      <div className="App">
        <div className="inlineBlock">
          <UserForm updateUser={updateUser} onUserFormChange={this.handleUserFormChange} />
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
