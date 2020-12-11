import React from 'react';
import { Router } from '@reach/router';
import { ToastContainer } from 'react-toastify';
import GameContextProvider from './contexts/context';
import Home from './Components/Home/Home';
import Game from './Components/Game/Game';
import GameOver from './Components/GameOver/GameOver';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <Router>
          <Home path="/" />
          <Game path="/game" />
          <GameOver path="/game-over" />
        </Router>
      </GameContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
