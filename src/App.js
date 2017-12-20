import React, { Component } from 'react';
import logo from './logo.svg';
import UserForm from './Components/UserForm';
import UsersTable from './Components/UsersTable';
import ReviewForm from './Components/ReviewForm';

import './App.css';

const usersArr = [
    {name: "Test User", id: Math.random()*100, reviews: [{reviewText:'test review 1', id: Math.random()*100}, {reviewText: 'test review 2', id: Math.random()*100}]},
    {name: "Test User 2", id: Math.random()*100, reviews: [{reviewText:'test review 3', id: Math.random()*100}, {reviewText: 'test review 4', id: Math.random()*100}]},    
]

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUserFormChange = this.handleUserFormChange.bind(this);
    this.state = {urs: usersArr};
  }

  handleUserFormChange(user) {
    this.setState((prevState) => ({urs: prevState.urs.concat(user)}));
    console.log(user);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <UserForm name="Test" onUserFormChange={this.handleUserFormChange} /><br/>
        <UsersTable users={this.state.urs}/>      
      </div>
    );
  }
}

export default App;
