import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'babel-polyfill';

class SignInForm extends Component {

    render() {
        return (
        <div className="FormCenter">
            <form className="FormFields">
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="signInEmail" value={this.props.email} onChange={this.props.handleSignIn} required />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="signInPassword" value={this.props.password} onChange={this.props.handleSignIn} required />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20" onClick={this.props.handleSubmit} >Sign In</button> <Link to="/sign-up" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;
