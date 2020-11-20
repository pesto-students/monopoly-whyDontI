const startGame = (state, {
  numberOfPlayers,
  player1,
  player2,
  player3,
  player4
}) => {
  const newState = {
    ...state,
    numberOfPlayers: parseInt(numberOfPlayers, 10),
    player1: {
      ...state.player1,
      name: player1,
      playing: (player1 !== ''),
      turn: true,
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
      currentIndex: 0,
    },
    player2: {
      ...state.player2,
      name: player2,
      playing: (player2 !== ''),
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
      currentIndex: 0,
    },
    player3: {
      ...state.player3,
      name: player3,
      playing: (player3 !== ''),
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
      currentIndex: 0,
    },
    player4: {
      ...state.player4,
      name: player4,
      playing: (player4 !== ''),
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
      currentIndex: 0,
    },
    dice1: 0,
    dice2: 0,
    diceRolledFlag: true,
    currentPlayerNumber: 1,
    currentPlayerName: 'player1',
    cardsPurchasedBy: [],
  };

  return newState;
}

const rollDice = (state) => {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const newState = {
    ...state,
    dice1,
    dice2,
    diceRolledFlag: !state.diceRolledFlag,
    [state.currentPlayerName]: {
      ...state[state.currentPlayerName],
      currentIndex: (state[state.currentPlayerName].currentIndex + dice1 + dice2) % 40,
    },
  };
  return newState;
}

const incrementPlayerNumber = (currentPlayerNumber, maxPlayersAllowed) => {
  if (currentPlayerNumber + 1 > maxPlayersAllowed) {
    return 1;
  }
  return currentPlayerNumber + 1;
}

const buyProperty = (state, {
  propertyPrice,
  propertyIndex,
  propettyDetails
}) => {
  const {
    currentPlayerName
  } = state

  const newState = {
    ...state,
    [currentPlayerName]: {
      ...state[currentPlayerName],
      balance: state[currentPlayerName].balance - propertyPrice,
      cardsPurchased: [...state[currentPlayerName].cardsPurchased, propettyDetails]
    },
    cardsPurchasedBy: [
      ...state.cardsPurchasedBy,
      {
        cardIndex: propertyIndex,
        purchasedByPlayer: currentPlayerName
      }
    ]
  };

  return newState;
}

const nextTurn = (state) => {
  const currentPlayerNumber = incrementPlayerNumber(
    state.currentPlayerNumber,
    state.numberOfPlayers,
  );
  const currentPlayerName = `player${currentPlayerNumber}`;
  const newState = {
    ...state,
    currentPlayerNumber,
    currentPlayerName,
    player1: {
      ...state.player1,
      turn: false
    },
    player2: {
      ...state.player2,
      turn: false
    },
    player3: {
      ...state.player3,
      turn: false
    },
    player4: {
      ...state.player4,
      turn: false
    },
    [currentPlayerName]: {
      ...state[currentPlayerName],
      turn: true
    }
  }

  return newState
}

const payRent = (state, {
  owenerId,
  propertyRent
}) => {
  const {
    currentPlayerName
  } = state

  const newState = {
    ...state,
    [currentPlayerName]: {
      ...state[currentPlayerName],
      balance: state[currentPlayerName].balance - propertyRent
    },
    [owenerId]: {
      ...state[owenerId],
      balance: state[owenerId].balance + propertyRent
    }
  }

  return newState
}

const GameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return startGame(state, action.game);
    case 'ROLL_DICE':
      return rollDice(state);
    case 'BUY':
      return buyProperty(state, action.game);
    case 'PAY_RENT':
      return payRent(state, action.game);
    case 'NEXT_TURN':
      return nextTurn(state);
    default:
      return state;
  }
};

export default GameReducer;
