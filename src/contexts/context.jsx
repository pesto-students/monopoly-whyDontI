import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import GameReducer from '../reducers/gameReducer';

export const GameContext = createContext();

const GameContextProvider = (props) => {
  const [gameState, dispatch] = useReducer(GameReducer, {
    player1: {
      playing: true,
      name: '',
      balance: 1500,
      turn: true,
      propertyCounts: {
        red: 0,
        yellow: 0,
        orange: 0,
        pink: 0,
        'light-blue': 0,
        'dark-blue': 0,
        railroads: 0,
        utilities: 0,
      },
      cardsPurchased: [],
      currentIndex: 1,
    },
    player2: {
      playing: true,
      name: '',
      balance: 1500,
      turn: false,
      propertyCounts: {
        red: 0,
        yellow: 0,
        orange: 0,
        pink: 0,
        lightBlue: 0,
        darkBlue: 0,
        railRoads: 0,
        utilities: 0,
      },
      cardsPurchased: [],
      currentIndex: 1,
    },
    player3: {
      playing: false,
      name: '',
      balance: 1500,
      turn: false,
      propertyCounts: {
        red: 0,
        yellow: 0,
        orange: 0,
        pink: 0,
        lightBlue: 0,
        darkBlue: 0,
        railRoads: 0,
        utilities: 0,
      },
      cardsPurchased: [],
      currentIndex: 1,
    },
    player4: {
      playing: false,
      name: '',
      turn: false,
      balance: 1500,
      propertyCounts: {
        red: 0,
        yellow: 0,
        orange: 0,
        pink: 0,
        lightBlue: 0,
        darkBlue: 0,
        railRoads: 0,
        utilities: 0,
      },
      cardsPurchased: [],
      currentIndex: 1,
    },
    dice1: 0,
    dice2: 0,
    diceRolledFlag: true,
    currentPlayerNumber: 1,
    currentPlayerName: 'player1',
    numberOfPlayers: 2,
    cardsPurchasedBy: [],
  });

  const { children } = props;

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

GameContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GameContextProvider;
