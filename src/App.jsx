import React from 'react';
import { Router } from '@reach/router';
import GameContextProvider from './contexts/context';
import Home from './Components/Home/Home';
import Game from './Components/Game/Game';

import './App.css';

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <Router>
          <Home path="/" />
          <Game path="/game" />
        </Router>
      </GameContextProvider>
    </div>
  );
}

export default App;
