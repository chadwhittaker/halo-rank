import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import ErrorMessage from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User';

class LoginForm extends Component {
  state = { username: "", password: "" };

  onSubmit = async (e, login) => {
    e.preventDefault();
    // run mutation
    await login();
    this.setState({ username: "", password: "" })
  }

  render() {
    return (
      <Mutation mutation={LOGIN_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(login, { error, loading }) => (
          <div className="auth-form-div mt-4">
            <h3 className="text-center">Login Form</h3>
            <form method="post" onSubmit={(e) => this.onSubmit(e, login)}>
              <div className="form-group">
                <label htmlFor="username-input">Username:</label>
                <input
                  id="username-input"
                  className="form-control"
                  type="text"
                  disabled={loading}
                  required
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

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
        id
        username
    }
  }
`

export default LoginForm;