import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { navigate } from '@reach/router';
import { GameContext } from '../../../contexts/context';
import { TYPES } from '../../../reducers/gameReducer';
import Backdrop from '../Backdrop/Backdrop';
import gameBlocks from '../../../data/gameBlocks.json';
import chanceCards from '../../../data/chanceCards.json';
import communityCards from '../../../data/communityCards.json';

import './Modal.css';

const Modal = ({
  show, modalClosed, cardData, type, color, index, cardIcon,
}) => {
  const { gameState, dispatch } = useContext(GameContext);
  const {
    cardsPurchasedBy,
    currentPlayerName,
    player1,
    player2,
    player3,
    player4,
  } = gameState;

  const [modalContent, setModalContent] = useState('');

  const isPropertyAlredyBought = (propertyIndex, propertyData) => {
    const found = propertyData.findIndex((v) => (v.cardIndex === propertyIndex));

    return (found > -1);
  };

  // Information functions
  const getPropertyOwenerId = () => {
    let cardPurchasedByPlayerId = -1;

    if (cardsPurchasedBy.length > 0) {
      cardPurchasedByPlayerId = cardsPurchasedBy.findIndex(
        (element) => (element.cardIndex === index),
      );
    }

    return cardsPurchasedBy[cardPurchasedByPlayerId].purchasedByPlayer;
  };

  const getPropertyOwener = () => gameState[
    getPropertyOwenerId()
  ];

  const getCurrentPlayer = () => gameState[currentPlayerName];

  const getChanceCommunityData = () => {
    const randomChanceIndex = Math.floor(Math.random() * 9 + 1);
    const randomCommunityIndex = Math.floor(Math.random() * 14 + 1);
    let data = '';
    if (type.includes('chance')) {
      data = chanceCards[randomChanceIndex];
    } else if (type.includes('community')) {
      data = communityCards[randomCommunityIndex];
    }
    return data;
  };

  const isGameOver = () => {
    let numberOfPlayersInGame = 0;
    if (player1.playing && player1.balance > 0) {
      numberOfPlayersInGame += 1;
    }
    if (player2.playing && player2.balance > 0) {
      numberOfPlayersInGame += 1;
    }
    if (player3.playing && player3.balance > 0) {
      numberOfPlayersInGame += 1;
    }
    if (player4.playing && player4.balance > 0) {
      numberOfPlayersInGame += 1;
    }

    return (numberOfPlayersInGame <= 1);
  };

  // Handle state updates functions
  const handleBuy = () => {
    if (isPropertyAlredyBought(index, cardsPurchasedBy)) {
      toast.error('Not for sell', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      modalClosed();
      return;
    }

    const gameData = {
      propertyPrice: cardData.price,
      propertyIndex: index,
      propertyDetails: cardData,
    };

    dispatch({
      type: TYPES.BUY,
      game: gameData,
    });
    dispatch({
      type: TYPES.NEXT_TURN,
    });
    toast.success(`${gameState[currentPlayerName].name} just bought ${cardData.name}!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    modalClosed();
  };

  const payRent = () => {
    const ownerData = getPropertyOwener();

    const gameData = {
      receiverPlayerId: getPropertyOwenerId(),
      amount: cardData.rent1,
    };

    dispatch({
      type: TYPES.PAY_TO_OTHER_PLAYER,
      game: gameData,
    });
    dispatch({
      type: TYPES.NEXT_TURN,
    });
    toast.success(`${gameState[currentPlayerName].name} Paid $${cardData.rent1} to ${ownerData.name}!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    modalClosed();
  };

  const handlePass = () => {
    dispatch({
      type: TYPES.NEXT_TURN,
    });
    modalClosed();
  };

  const addGetOutOfJailCard = () => {
    dispatch({
      type: TYPES.ADD_GET_OUT_OF_JAIL_CARD,
      data: {
        playerId: gameState.currentPlayerName,
      },
    });
    modalClosed();
  };

  const collectFromBank = (amount) => {
    dispatch({
      type: TYPES.COLLECT_FROM_BANK,
      data: {
        receiverPlayerId: gameState.currentPlayerName,
        amount,
      },
    });
  };

  const payToBank = (amount) => {
    dispatch({
      type: TYPES.PAY_TO_BANK,
      data: {
        donorPlayerId: gameState.currentPlayerName,
        amount,
      },
    });
  };

  const moveToCard = (ind) => {
    dispatch({
      type: TYPES.MOVE_TO_CARD,
      data: {
        playerId: gameState.currentPlayerName,
        newPosition: ind,
        shouldCollectGoPrice: true,
      },
    });
  };

  const payToEveryOtherPlayer = (amount) => {
    dispatch({
      type: TYPES.PAY_TO_EVERY_OTHER_PLAYER,
      game: {
        donorId: currentPlayerName,
        amount,
      },
    });
  };

  const collectFromEveryOtherPlayer = (amount) => {
    dispatch({
      type: TYPES.COLLECT_FROM_EVERY_OTHER_PLAYER,
      game: {
        collectorId: currentPlayerName,
        amount,
      },
    });
  };

  // Modal functions
  const chanceCommunityModal = () => {
    const chestCommunityCards = getChanceCommunityData();
    let cardMessage = '';
    switch (chestCommunityCards.type) {
      case 'GET_OUT_OF_JAIL_CARD':
        cardMessage = 'Received GET OUT OF JAIL card';
        addGetOutOfJailCard();
        break;
      case 'COLLECT_FROM_BANK':
        cardMessage = `Collected ${chestCommunityCards.amount} from Bank`;
        collectFromBank(chestCommunityCards.amount);
        break;
      case 'PAY_TO_BANK': // Working
        cardMessage = `Paid ${chestCommunityCards.amount} to Bank`;
        payToBank(chestCommunityCards.amount);
        break;
      case 'COLLECT_FROM_EVERY_PLAYER':
        cardMessage = `Collected ${chestCommunityCards.amount} from every player`;
        collectFromEveryOtherPlayer(chestCommunityCards.amount);
        break;
      case 'PAY_TO_EVERY_PLAYER':
        cardMessage = `Paid ${chestCommunityCards.amount} to every player`;
        payToEveryOtherPlayer(chestCommunityCards.amount);
        break;
      case 'MOVE':
        cardMessage = `Moved to ${gameBlocks[chestCommunityCards.index].name}`;
        moveToCard(chestCommunityCards.index);
        break;
      default:
        cardMessage = 'Error card';
        break;
    }
    toast.success(cardMessage, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return (
      <div className="modalContent">
        {cardMessage}
        <div className="modalButtons">
          <button type="button" className="" onClick={handlePass}>
            Ok
          </button>
        </div>
      </div>
    );
  };

  const feeModal = () => {
    payToBank(cardData.price);
    toast.success(`Paid ${cardData.price} to bank`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return (
      <div className="modalContent">
        <h1>
          {cardData.name}
          <br />
          $
          {cardData.pricetext}
        </h1>
        <div div className="modalButtons">
          <button type="button" className="" onClick={handlePass}>
            Ok
          </button>
        </div>
      </div>
    );
  };

  const ownPropertyModal = () => (
    <div className="modalContent">
      <h1>You landed on your own property, Enjoy!</h1>
      <div className="modalButtons">
        <button type="button" className="" onClick={handlePass}>
          Ok
        </button>
      </div>
    </div>
  );

  const rentModal = () => (
    <div className="modalContent">
      <p>
        {(getCurrentPlayer()).name}
        {' '}
        have to pay
        {' '}
        {cardData.rent1}
        {' '}
        to
        {' '}
        {(getPropertyOwener()).name}
      </p>
      <div className="modalButtons">
        <button type="button" onClick={payRent}>Pay</button>
      </div>
    </div>
  );

  const buyPropertyModal = () => (
    <div className="modalContent">
      {color && (
        <div className={['modalColorHeader', color].join(' ')} />
      )}
      <div className="cardPreview">
        {cardIcon && (
          <i>
            <img src={cardIcon} alt={type[0]} />
          </i>
        )}
      </div>
      <h1>
        {cardData.name}
        <br />
        $
        {cardData.price}
      </h1>
      <div className="modalButtons">
        <button type="button" className="" onClick={handleBuy}>
          Buy
        </button>
        <button type="button" className="" onClick={handlePass}>
          Pass
        </button>
      </div>
    </div>
  );

  const defaultModal = () => (
    <div className="modalContent">
      <h1>
        {cardData.name}
        *
      </h1>
      <div className="modalButtons">
        <button type="button" className="" onClick={handlePass}>
          Ok
        </button>
      </div>
    </div>
  );
  const getModalContent = () => {
    let modal;
    if (isGameOver()) {
      navigate('/game-over');
      return '';
    } if (type.includes('chance') || type.includes('community')) {
      modal = chanceCommunityModal();
    } else if (type.includes('fee')) {
      modal = feeModal();
    } else if (
      isPropertyAlredyBought(index, cardsPurchasedBy)
      && (getCurrentPlayer()).name === (getPropertyOwener()).name
    ) {
      modal = ownPropertyModal();
    } else if (isPropertyAlredyBought(index, cardsPurchasedBy) && cardData.rent1 !== '') {
      modal = rentModal();
    } else if (!isPropertyAlredyBought(index, cardsPurchasedBy) && cardData.price !== 0) {
      modal = buyPropertyModal();
    } else {
      modal = defaultModal();
    }

    return modal;
  };

  useEffect(() => {
    setModalContent(getModalContent());
  }, []);

  return (
    <>
      <Backdrop show={show} />
      <div
        className="modal"
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {modalContent}
      </div>
    </>
  );
};

Modal.defaultProps = {
  color: null,
  cardData: {
    price: 0,
  },
  type: ['property'],
  cardIcon: null,
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  cardData: PropTypes.shape({
    name: PropTypes.string,
    pricetext: PropTypes.string,
    price: PropTypes.number,
    rent1: PropTypes.number,
  }),
  color: PropTypes.string,
  type: PropTypes.arrayOf(PropTypes.string),
  modalClosed: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  cardIcon: PropTypes.string,
};

export default Modal;
