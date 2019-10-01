import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Post from './components/Post';

import './App.css';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path = "/:id" component={Post} />
    </div>
  );
}

export default App;
