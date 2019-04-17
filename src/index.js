import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//local imports
import Header from './components/Header';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import DesignListGhana from './components/DesignListGhana'
import NewDesignGhana from './components/NewDesignGhana';


const client = new ApolloClient({
  uri: "http://localhost:4000/",
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
      <BrowserRouter>
        <div className="container">
          <Header />
          <div className="main-body">
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/ghana/designs" exact component={DesignListGhana}></Route>
              <Route path="/ghana/designs/new" exact component={NewDesignGhana}></Route>
              <Route path="/login" exact component={LoginForm}></Route>
              <Route path="/signup" exact component={SignupForm}></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));










// // old attempt

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