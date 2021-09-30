import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Redirect from './pages/Redirect';
import Search from './pages/Search';

const App = () => {
  const [expiryTime, setExpiryTime] = useState(0);
  const isValidSession = () => Date.now() < expiryTime;
  // const isValidSession = () => {
  //   console.log('date now: ', Date.now());
  //   console.log('expiry time: ', expiryTime);
  //   console.log('so is it a valid session', Date.now() < expiryTime);
  //   return Date.now() < expiryTime;
  // };
  const handleExpiryChanged = (time) => setExpiryTime(time);
  // const handleExpiryChanged = (time) => {
  //   console.log('new expiry time: ', time, new Date(time));
  //   setExpiryTime(time);
  // };
  useEffect(() => {
    setExpiryTime(localStorage.getItem('expiry_time'));
  }, []);
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/callback'>
            <Redirect handleExpiryChanged={handleExpiryChanged} />
          </Route>
          <Route path='/search'>
            <Search isValidSession={isValidSession} />
          </Route>
          <Route path='/'>
            <Login isValidSession={isValidSession} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
