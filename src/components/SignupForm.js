import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import ErrorMessage from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User';

class SignupForm extends Component {
  state = { username: "", password: "" };

  onSubmit = async (e, signup) => {
    e.preventDefault();
    // run mutation
    await signup();
    this.setState({ username: "", password: "" })
  }

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signup, { error, loading }) => (
          <div className="auth-form-div mt-4">
            <h3 className="text-center">Sign Up Form</h3>
            <form method="post" onSubmit={(e) => this.onSubmit(e, signup)}>
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
  mutation SIGNUP_MUTATION($username: String!, $password: String!) {
    signup(
      username: $username
      password: $password
    ) {
        id
        username
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