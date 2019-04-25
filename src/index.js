import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

//local imports
import Header from './pages/Header';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import DesignGhanaListPage from './pages/DesignGhanaListPage';
import DesignGhanaShowPage from './pages/DesignGhanaShowPage';
import DesignGhanaNewPage from './pages/DesignGhanaNewPage';
import DesignGhanaEditPage from './pages/DesignGhanaEditPage'
import PermissionsPage from './pages/PermissionsPage';


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
      <Router history={history}>
        <div id="mainContainer" className="container">
          <Header />
          <div className="main-body">
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/ghana/designs" exact component={DesignGhanaListPage}></Route>
              <Route path="/ghana/designs/new" exact component={DesignGhanaNewPage}></Route>
              <Route path="/ghana/designs/:id" exact component={DesignGhanaShowPage}></Route>"
              <Route path="/ghana/designs/edit/:id" exact component={DesignGhanaEditPage}></Route>"
              <Route path="/login" exact component={LoginForm}></Route>
              <Route path="/signup" exact component={SignupForm}></Route>
              <Route path="/permissions" exact component={PermissionsPage}></Route>
            </Switch>
          </div>
        </div>
      </Router>
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