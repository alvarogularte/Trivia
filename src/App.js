import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Main from './pages/Main';
import FeedBack from './pages/FeedBack';
import './App.css';
import Conf from './pages/Conf';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/main" component={ Main } />
      <Route exact path="/conf" component={ Conf } />
      <Route exact path="/feedback" component={ FeedBack } />
    </Switch>
  );
}
