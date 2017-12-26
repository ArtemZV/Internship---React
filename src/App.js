import React, { Component } from 'react';
import UserForm from './Components/UserForm';
import UsersTable from './Components/UsersTable';
import ReviewForm from './Components/ReviewForm';
import Popup from './Components/Popup'

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
      const index = this.state.users.indexOf(this.state.updateUser);
      this.state.users.splice(index, 1, user);
      this.setState({updateUser: null, users: this.state.users});
      this.state.popups.push(<Popup key={Math.random()} message="User updated"/>);
    }
    else  {
      this.setState({users: this.state.users.concat(user)});
      this.state.popups.push(<Popup key={Math.random()} message="New user create"/>);
    }
    this.setState({popups:this.state.popups});
  }

  handleReviewCreated = (review) => {
    this.setState({reviews: this.state.reviews.concat(review)});
    this.state.popups.push(<Popup key={Math.random()} message="New review create"/>);
    this.setState({popups:this.state.popups});
  }

  handleDeleteUser = (user) => {
    user.reviews.forEach((review) => {this.state.reviews.splice(this.state.reviews.indexOf(review), 1)});
    this.state.users.splice(this.state.users.indexOf(user), 1);
    const updUser = (this.state.updateUser && this.state.updateUser.id === user.id) ? null : this.state.updateUser;
    this.setState({users: this.state.users, reviews: this.state.reviews, updateUser: updUser});
    this.state.popups.push(<Popup key={Math.random()} message="User deleted"/>);
    this.setState({popups:this.state.popups});
  }

  handleDeleteReview = (review) => {
    const index = this.state.reviews.indexOf(review);
    this.state.reviews.splice(index, 1);
    this.setState({reviews: this.state.reviews});
    this.state.popups.push(<Popup key={Math.random()} message="Review deleted"/>);
    this.setState({popups:this.state.popups});
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
        <div id="popupsBlock">
          {this.state.popups}
        </div>
      </div>
    );
  }
}

export default App;
