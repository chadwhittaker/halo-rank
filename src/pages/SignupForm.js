import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import history from '../history';

import ErrorMessage from '../components/ErrorMessage'
import { CURRENT_USER_QUERY } from '../components/User';

class SignupForm extends Component {
  state = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  onSubmit = async (e, signup) => {
    e.preventDefault();
    // run mutation
    await signup();
    this.setState({ username: "", password: "", firstName: "", lastName: "" })
    history.push('/')
  }

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signup, { error, loading }) => (
          <div className="auth-form-div mt-4">
            <h3 className="text-center">Sign Up Form</h3>
            <form method="post" onSubmit={(e) => this.onSubmit(e, signup)}>
              <div className="form-group">
                <label htmlFor="firstname-input">First Name:</label>
                <input
                  id="firstname-input"
                  className="form-control"
                  type="text"
                  disabled={loading}
                  required
                  minLength="1"
                  maxLength="30"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname-input">Last Name:</label>
                <input
                  id="lastname-input"
                  className="form-control"
                  type="text"
                  disabled={loading}
                  minLength="1"
                  maxLength="20"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username-input">Username:</label>
                <input
                  id="username-input"
                  className="form-control"
                  type="text"
                  disabled={loading}
                  required
                  minLength="4"
                  maxLength="20"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password-input">Password:</label>
                <input
                  id="password-input"
                  className="form-control"
                  type="password"
                  disabled={loading}
                  required
                  minLength="2"
                  maxLength="20"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <ErrorMessage error={error} />
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($username: String!, $password: String!, $firstName: String!, $lastName: String) {
    signup(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
        id
        username
        firstName
        lastName
    }
  }
`

export default SignupForm;


// // old method
// render() {
//   return (
//     <div className="auth-form">
//       <h3 className="text-center">Sign Up Form</h3>
//       <AuthForm onSubmit={this.onSubmit} loading={this.state.loading}/>
//     </div>
//   );
// }