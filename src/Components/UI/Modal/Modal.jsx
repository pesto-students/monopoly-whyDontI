import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GameContext } from '../../../contexts/context';
import Backdrop from '../Backdrop/Backdrop';
import { toast } from 'react-toastify';
import gameBlocks from '../../../data/gameBlocks.json'
import chanceCards from '../../../data/chanceCards';
import communityCards from '../../../data/communityCards';

import './Modal.css';

const Modal = ({
  show, modalClosed, cardData, type, color, index, cardIcon,
}) => {
  const { gameState, dispatch } = useContext(GameContext);
  const {
    cardsPurchasedBy,
    currentPlayerName,
  } = gameState

  const [modalContent, setModalContent] = useState('')

  useEffect(() => {
    setModalContent(getModalContent())
  }, [])

  const isPropertyAlredyBought = (propertyIndex, propertyData) => {
    const found = propertyData.findIndex((v) => {
      return (v.cardIndex === propertyIndex)
    })

    return (found > -1)
  }

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
      propertyDetails: cardData
    };

    dispatch({
      type: 'BUY',
      game: gameData,
    });
    dispatch({
      type: 'NEXT_TURN',
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
      amount: cardData.rent1
    }

    dispatch({
      type: 'PAY_TO_OTHER_PLAYER',
      game: gameData,
    });
    dispatch({
      type: 'NEXT_TURN',
    });
    toast.success(`${gameState[currentPlayerName].name} Paid $${cardData.rent1} to ${ownerData.name}!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    modalClosed();
  };

  const handlePass = () => {
    dispatch({
      type: 'NEXT_TURN',
    });
    modalClosed();
  };

  const addGetOutOfJailCard = () => {
    dispatch({
      type: 'ADD_GET_OUT_OF_JAIL_CARD',
      data: {
        playerId: gameState.currentPlayerName
      }
    })
    modalClosed();
  }

  const collectFromBank = (amount) => {
    dispatch({
      type: 'COLLECT_FROM_BANK',
      data: {
        receiverPlayerId: gameState.currentPlayerName,
        amount
      }
    })
  }

  const payToBank = (amount) => {
    dispatch({
      type: 'PAY_TO_BANK',
      data: {
        donorPlayerId: gameState.currentPlayerName,
        amount
      }
    })
  }

  const moveToCard = (index) => {
    dispatch({
      type: 'moveToCard',
      data: {
        playerId: gameState.currentPlayerName,
        newPosition: index,
        shouldCollectGoPrice: true
      }
    })
  }

  // Information functions
  const getPropertyOwenerId = () => {
    let cardPurchasedByPlayerId = -1;

    if (cardsPurchasedBy.length > 0) {
      cardPurchasedByPlayerId = cardsPurchasedBy.findIndex(
        (element) => (element.cardIndex === index),
      );
    }

    return cardsPurchasedBy[cardPurchasedByPlayerId].purchasedByPlayer
  }

  const getPropertyOwener = () => {
    return gameState[
      getPropertyOwenerId()
    ];
  }

  const getCurrentPlayer = () => {
    return gameState[currentPlayerName]
  }

  const getChanceCommunityData = () => {
    const randomChanceIndex = Math.floor(Math.random() * 10 + 1);
    const randomCommunityIndex = Math.floor(Math.random() * 15 + 1);
    let data = ''
    if (type.includes('chance')) {
      data = chanceCards[randomChanceIndex];
    } else if (type.includes('community')) {
      data = communityCards[randomCommunityIndex];
    }
    return data;
  };

  // Modal functions
  const chanceCommunityModal = () => {
    const chestCommunityCards = getChanceCommunityData()
    let cardMessage = '';
    switch (chestCommunityCards.type) {
      case 'GET_OUT_OF_JAIL_CARD':
        cardMessage = 'Received GET OUT OF JAIL card'
        addGetOutOfJailCard()
        break;
      case 'COLLECT_FROM_BANK':
        cardMessage = `Collect ${chestCommunityCards.amount} from Bank`
        collectFromBank(chestCommunityCards.amount)
        break;
      case 'PAY_TO_BANK': // Working
        cardMessage = `Pay ${chestCommunityCards.amount} to Bank`
        payToBank(chestCommunityCards.amount)
        break;
      case 'COLLECT_FROM_EVERY_PLAYER':
        cardMessage = `Collect ${chestCommunityCards.amount} from every player`
        break;
      case 'PAY_TO_EVERY_PLAYER':
        cardMessage = `Pay ${chestCommunityCards.amount} to every player`
        break;
      case 'MOVE':
        cardMessage = `Move to ${gameBlocks[chestCommunityCards.index].name}`
        moveToCard(chestCommunityCards.index)
        break;
      default:
        cardMessage = 'Default card'
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
  }

  const feeModal = () => {
    payToBank(cardData.price)
    toast.success(`Paid ${cardData.price} to bank`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return (
      <div className="modalContent" >
        <h1>
          {cardData.name}
          <br />
          $
          {cardData.pricetext}
        </h1>
        <div div className="modalButtons" >
          <button type="button" className="" onClick={handlePass}>
            Ok
          </button>
        </div>
      </div>
    )
  }

  const ownPropertyModal = () => {
    return (
      <div className="modalContent">
        <h1>{'You landed on your own property, Enjoy!'}</h1>
        <div className="modalButtons">
          <button type="button" className="" onClick={handlePass}>
            Ok
          </button>
        </div>
      </div>
    )
  }

  const rentModal = () => {
    return (
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
  }

  const buyPropertyModal = () => {
    return (
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
  }

  const defaultModal = () => {
    return (
      <div className="modalContent">
        <h1>{cardData.name}{'*'}</h1>
        <div className="modalButtons">
          <button type="button" className="" onClick={handlePass}>
            Ok
          </button>
        </div>
      </div>
    )
  }
  const getModalContent = () => {
    let modalContent;
    if (type.includes('chance') || type.includes('community')) {
      modalContent = chanceCommunityModal()
    } else if (type.includes('fee')) {
      modalContent = feeModal()
    } else if (isPropertyAlredyBought(index, cardsPurchasedBy) && (getCurrentPlayer()).name === (getPropertyOwener()).name) {
      modalContent = ownPropertyModal()
    } else if (isPropertyAlredyBought(index, cardsPurchasedBy) && cardData.rent1 !== '') {
      modalContent = rentModal()
    } else if (!isPropertyAlredyBought(index, cardsPurchasedBy) && cardData.price !== 0) {
      modalContent = buyPropertyModal()
    } else {
      modalContent = defaultModal()
    }

    return modalContent;
  }

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
  type: PropTypes.array,
  modalClosed: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  cardIcon: PropTypes.string,
};

export default Modal;
