import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { GameReducer } from '../reducers/gameReducer';

export const GameContext = createContext();

const PLAYER_DATA = {
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
    railroads: 0,
    utilities: 0,
  },
  cardsPurchased: [],
  currentIndex: 0,
  hasGetOutOfJailCard: false,
};

const GameContextProvider = (props) => {
  const [gameState, dispatch] = useReducer(GameReducer, {
    player1: {
      ...PLAYER_DATA,
    },
    player2: {
      ...PLAYER_DATA,
    },
    player3: {
      ...PLAYER_DATA,
    },
    player4: {
      ...PLAYER_DATA,
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
