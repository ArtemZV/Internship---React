import React, { Component } from 'react';
import './UserForm.css';

export default class UserForm extends React.Component {
    render() {
      return (
        <div>
            User input:
            <div id="userForm">
                <div>First name: <input></input></div>
                <div>Last name: <input></input></div>                
            </div>
        </div>   
      );
             
    }
}