import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../UI/Modal/Modal';
import { GameContext } from '../../contexts/context';
import RailRoadIcon from '../../assets/train_icon.png';
import ElectricIcon from '../../assets/electric_icon.png';
import WaterIcon from '../../assets/water_icon.png';
import ChanceIcon from '../../assets/chance_icon.png';
import CommunityIcon from '../../assets/community_chest_icon.png';

import gameBlocks from '../../data/gameBlocks.json';

const Card = ({
  name, pricetext, color, type, index,
}) => {
  const { gameState } = useContext(GameContext);
  const {
    player1, player2, player3, player4, diceRolledFlag, cardsPurchasedBy,
  } = gameState;

  const [showModal, setShowModal] = useState(false);

  const playerTokens = () => {
    const players = [];
    const tokens = [];
    if (player1.playing && player1.currentIndex === index) {
      players.push({
        player: player1,
      });
      tokens.push((<div className="player1 cardPlayerHighlight">{player1.name}</div>));
    }
    if (player2.playing && player2.currentIndex === index) {
      players.push({
        player: player2,
      });
      tokens.push((<div className="player2 cardPlayerHighlight">{player2.name}</div>));
    }
    if (player3.playing && player3.currentIndex === index) {
      players.push({
        player: player3,
      });
      tokens.push((<div className="player3 cardPlayerHighlight">{player3.name}</div>));
    }
    if (player4.playing && player4.currentIndex === index) {
      players.push({
        player: player4,
      });
      tokens.push((<div className="player4 cardPlayerHighlight">{player4.name}</div>));
    }
    return {
      players,
      tokens,
    };
  };

  const isPlayerOnCard = () => ((player1.turn && player1.currentIndex === index)
    || (player2.turn && player2.currentIndex === index)
    || (player3.turn && player3.currentIndex === index)
    || (player4.turn && player4.currentIndex === index));

  const handleModalClosed = () => {
    setShowModal(false);
  };

  const getCardIcon = (cardType) => {
    if (cardType.includes('railroad')) {
      return RailRoadIcon;
    }
    if (cardType.includes('utility electric')) {
      return ElectricIcon;
    }
    if (cardType.includes('utility waterworks')) {
      return WaterIcon;
    }
    if (cardType.includes('community')) {
      return CommunityIcon;
    }
    if (cardType.includes('chance')) {
      return ChanceIcon;
    }
    return null;
  };

  const getOwenersToken = () => cardsPurchasedBy.map((v) => {
    if (index === v.cardIndex) {
      return (
        <div key={v.purchasedByPlayer} className={`${v.purchasedByPlayer} token`} />
      );
    }
    return (<div />);
  });

  useEffect(() => {
    if (isPlayerOnCard() && (!type.includes('corner') || type.includes('chance') || type.includes('community'))) {
      setShowModal(true);
    }

    return () => {
      setShowModal(false);
    };
  }, [diceRolledFlag]);

  const cardIcon = getCardIcon(type);

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          modalClosed={handleModalClosed}
          cardData={gameBlocks[index]}
          color={color}
          type={type}
          index={index}
          cardIcon={cardIcon}
        />
      )}
      <div className={['space', ...type].join(' ')}>
        <div className="container">
          {color !== '' && (
            <div className={['color-bar', color].join(' ')} />
          )}
          <div className="name">{name}</div>
          {cardIcon && (
            <i>
              <img src={cardIcon} alt={type} />
            </i>
          )}
          <div className="tokenContainer">
            {getOwenersToken()}
          </div>
          {pricetext !== '' && <div className="price">{pricetext}</div>}
          <div className="playerContainer">
            {playerTokens().tokens}
          </div>
        </div>
      </div>
    </>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  pricetext: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
