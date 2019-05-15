import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

//local imports
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import { endpoint, prodEndpoint } from './config';

console.log("NODE_ENV =",process.env.NODE_ENV)

const client = new ApolloClient({
  // uri: prodEndpoint,
  // uri: endpoint,
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
  // dataIdFromObject: o => o.id,
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      }
    });
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" exact component={LoginForm}></Route>
          <Route path="/signup" exact component={SignupForm}></Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));










// // old attemptt

// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/',
//   credentials: 'same-origin'
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });