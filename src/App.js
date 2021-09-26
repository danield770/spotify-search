import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Redirect from './pages/Redirect';
import Search from './pages/Search';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/spotify-search/callback'>
            <Redirect />
          </Route>
          <Route path='/spotify-search/search'>
            <Search />
          </Route>
          <Route path='/spotify-search/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
