import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
//local imports
import Header from './components/Header';
import Home from './components/Home';
import NewDesignGhana from './components/NewDesignGhana';

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  dataIdFromObject: o => o.id,
  connectToDevTools: true
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch> 
            <Route path="/" exact component={Home}></Route>
            <Route path="/newdesignghana" exact component={NewDesignGhana}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));