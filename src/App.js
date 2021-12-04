import React, { useState } from 'react';
import './App.css';

import PostDisplay from './components/PostDisplay';
import PostInput from './components/PostInput';

const App = function () {
  const [submitted, setSubmitted] = useState(false);

  const refreshDisplay = function () {
    setSubmitted(true);
    setSubmitted(false);
  };

  return (
    <div>
      <PostInput submitted={submitted} />
      <PostDisplay refreshDisplay={refreshDisplay} />
    </div>
  );
};

/*
const App = function () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
*/
export default App;
