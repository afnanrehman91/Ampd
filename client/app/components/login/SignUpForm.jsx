import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'babel-polyfill';

class SignUpForm extends Component {

    render() {
        return (
        <div className="FormCenter">
            <form className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">First Name</label>
                <input type="text" id="firstName" className="FormField__Input" placeholder="Enter your first name" name="signUpFirstName" value={this.props.firstName} onChange={this.props.handleSignUp} required />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Last Name</label>
                <input type="text" id="lastName" className="FormField__Input" placeholder="Enter your last name" name="signUpLastName" value={this.props.lastName} onChange={this.props.handleSignUp} required />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="signUpPassword" value={this.props.password} onChange={this.props.handleSignUp} required />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="signUpEmail" value={this.props.email} onChange={this.props.handleSignUp} required />
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                    <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.props.hasAgreed} onChange={this.props.handleSignUp} /> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
                </label>
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20" onClick={this.props.handleSubmit}>Sign Up</button> <Link to="/" className="FormField__Link">I'm already member</Link>
              </div>
            </form>
          </div>
        );
    }
}
export default SignUpForm;
