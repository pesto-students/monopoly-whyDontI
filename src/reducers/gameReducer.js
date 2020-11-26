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
  const newIndex = (state[state.currentPlayerName].currentIndex + dice1 + dice2) % 40
  // Handle the case when player passes the GO card
  const newBalance = (state[state.currentPlayerName].currentIndex > newIndex)
    ? (state[state.currentPlayerName].balance + 200)
    : (state[state.currentPlayerName].balance)

  const newState = {
    ...state,
    dice1,
    dice2,
    diceRolledFlag: !state.diceRolledFlag,
    [state.currentPlayerName]: {
      ...state[state.currentPlayerName],
      currentIndex: newIndex,
      balance: newBalance
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
  propertyDetails
}) => {
  const {
    currentPlayerName
  } = state

  const newState = {
    ...state,
    [currentPlayerName]: {
      ...state[currentPlayerName],
      balance: state[currentPlayerName].balance - propertyPrice,
      cardsPurchased: [...state[currentPlayerName].cardsPurchased, propertyDetails]
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

const payToOtherPlayer = (state, {
  receiverPlayerId,
  amount
}) => {
  const {
    currentPlayerName
  } = state

  const newState = {
    ...state,
    [currentPlayerName]: {
      ...state[currentPlayerName],
      balance: state[currentPlayerName].balance - amount
    },
    [receiverPlayerId]: {
      ...state[receiverPlayerId],
      balance: state[receiverPlayerId].balance + amount
    }
  }

  return newState
}

const payToBank = (state, {
  donorPlayerId,
  amount
}) => {
  const newState = {
    ...state,
    [donorPlayerId]: {
      ...state[donorPlayerId],
      balance: state[donorPlayerId].balance - amount
    }
  }

  return newState
}

const collectFromBank = (state, {
  receiverPlayerId,
  amount
}) => {
  const newState = {
    ...state,
    [receiverPlayerId]: {
      ...state[receiverPlayerId],
      balance: state[receiverPlayerId].balance + amount
    }
  }

  return newState
}

const moveToCard = (state, {
  playerId,
  newPosition,
  shouldCollectGoPrice = true
}) => {
  // Handle the case where the player passes the GO card
  const newBalance = (shouldCollectGoPrice && state[playerId].currentIndex > newPosition)
    ? (state[playerId].balance + 200)
    : state[playerId].balance

  const newState = {
    ...state,
    [playerId]: {
      ...state[playerId],
      currentIndex: newPosition,
      balance: newBalance
    }
  }

  return newState
}

const addGetOutOfJailCard = (state, {
  playerId
}) => {
  const newState = {
    ...state,
    [playerId]: {
      ...state[playerId],
      hasGetOutOfJailCard: true,
    }
  }

  return newState
}

const payToEveryOtherPlayer = (state, {
  donorId,
  amount
}) => {
  let donorCurrentBalance = state[donorId].balance
  const newState = {
    ...state
  }

  if ('player1' !== donorId && state.player1.playing) {
    newState.player1 = {
      ...state.player1,
      balance: state.player1.balance + amount
    }
    donorCurrentBalance -= amount
  }
  if ('player2' !== donorId && state.player2.playing) {
    newState.player2 = {
      ...state.player2,
      balance: state.player2.balance + amount
    }
    donorCurrentBalance -= amount
  }
  if ('player3' !== donorId && state.player3.playing) {
    newState.player3 = {
      ...state.player3,
      balance: state.player3.balance + amount
    }
    donorCurrentBalance -= amount
  }
  if ('player4' !== donorId && state.player4.playing) {
    newState.player4 = {
      ...state.player4,
      balance: state.player4.balance + amount
    }
    donorCurrentBalance -= amount
  }

  newState[donorId] = {
    ...state[donorId],
    balance: donorCurrentBalance
  }

  return newState
}

const collectFromEveryOtherPlayer = (state, {
  collectorId,
  amount
}) => {
  let collectorCurrentBalance = state[collectorId].balance
  const newState = {
    ...state
  }

  if ('player1' !== collectorId && state.player1.playing) {
    newState.player1 = {
      ...state.player1,
      balance: state.player1.balance - amount
    }
    collectorCurrentBalance += amount
  }
  if ('player2' !== collectorId && state.player2.playing) {
    newState.player2 = {
      ...state.player2,
      balance: state.player2.balance - amount
    }
    collectorCurrentBalance += amount
  }
  if ('player3' !== collectorId && state.player3.playing) {
    newState.player3 = {
      ...state.player3,
      balance: state.player3.balance - amount
    }
    collectorCurrentBalance += amount
  }
  if ('player4' !== collectorId && state.player4.playing) {
    newState.player4 = {
      ...state.player4,
      balance: state.player4.balance - amount
    }
    collectorCurrentBalance += amount
  }

  newState[collectorId] = {
    ...state[collectorId],
    balance: collectorCurrentBalance
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
    case 'PAY_TO_OTHER_PLAYER':
      return payToOtherPlayer(state, action.game);
    case 'PAY_TO_EVERY_OTHER_PLAYER':
      return payToEveryOtherPlayer(state, action.game);
    case 'COLLECT_FROM_EVERY_OTHER_PLAYER':
      return collectFromEveryOtherPlayer(state, action.game);
    case 'PAY_TO_BANK':
      return payToBank(state, action.data)
    case 'COLLECT_FROM_BANK':
      return collectFromBank(state, action.data)
    case 'MOVE_TO_CARD':
      return moveToCard(state, action.data)
    case 'NEXT_TURN':
      return nextTurn(state);
    case 'ADD_GET_OUT_OF_JAIL_CARD':
      return addGetOutOfJailCard(state, action.data)
    default:
      return state;
  }
};

export default GameReducer;
