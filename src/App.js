import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Main from './pages/Main';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/main" component={ Main } />
    </Switch>
  );
}
