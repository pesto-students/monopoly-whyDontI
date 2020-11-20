import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GameContext } from '../../../contexts/context';
import Backdrop from '../Backdrop/Backdrop';
import { toast } from 'react-toastify';
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

  const isPropertyAlredyBought = (propertyIndex, propertyData) => {
    const found = propertyData.findIndex((v) => {
      return (v.cardIndex === propertyIndex)
    })

    return (found > -1)
  }

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
      propettyDetails: cardData
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
      owenerId: getPropertyOwenerId(),
      propertyRent: cardData.rent1
    }

    dispatch({
      type: 'PAY_RENT',
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
    const randomChanceIndex = Math.floor(Math.random() * 16 + 1);
    const randomCommunityIndex = Math.floor(Math.random() * 16 + 1);

    if (type.includes('chance')) {
      return chanceCards[randomChanceIndex - 1];
    } else if (type.includes('community')) {
      return communityCards[randomCommunityIndex - 1];
    }
    return '';
  };

  const getModalContent = () => {
    if (type.includes('chance') || type.includes('community')) {
      return (
        <div className="modalContent">
          {getChanceCommunityData()}
          <div className="modalButtons">
            <button type="button" className="" onClick={handlePass}>
              Ok
            </button>
          </div>
        </div>
      );
    } else if (type.includes('fee')) {
      // TODO: handle this type of cards
      return (
        <div className="modalContent" >
          { cardData.pricetext}
          <div div className="modalButtons" >
            <button type="button" className="" onClick={handlePass}>
              Ok
            </button>
          </div>
        </div>
      )
    } else if (isPropertyAlredyBought(index, cardsPurchasedBy) && (getCurrentPlayer()).name === (getPropertyOwener()).name) {
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
    } else if (isPropertyAlredyBought(index, cardsPurchasedBy) && cardData.rent1 !== '') {
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
    } else {
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
        {getModalContent()}
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
