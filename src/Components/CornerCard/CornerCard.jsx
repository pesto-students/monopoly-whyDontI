import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GameContext } from '../../contexts/context';

const CornerCard = ({
  index, childrens,
}) => {
  const { gameState } = useContext(GameContext);
  const {
    player1, player2, player3, player4,
  } = gameState;

  // const {
  //   name = '',
  //   pricetext,
  // } = gameBlocks[index - 1];
  // const playerOnCard = () => (
  //   (player1.turn && player1.currentIndex === index)
  //   || (player2.turn && player2.currentIndex === index)
  //   || (player3.turn && player3.currentIndex === index)
  //   || (player4.turn && player4.currentIndex === index)
  // );

  // const getCardIcon = (cardType) => {
  //   switch (cardType) {
  //     case 'railroad':
  //       return RailRoadIcon;
  //     case 'utility electric':
  //       return ElectricIcon;
  //     case 'utility waterworks':
  //       return WaterIcon;
  //     case 'chance':
  //       return ChanceIcon;
  //     case 'community':
  //       return CommunityIcon;
  //     default:
  //       return null;
  //   }
  // };

  // const cardIcon = getCardIcon(type);

  return (
    <>
      <div>
        {childrens}
      </div>
      <div className="playerContainer">
        {player1.playing && player1.currentIndex === index && (
          <div className="player1">{player1.name}</div>
        )}
        {player2.playing && player2.currentIndex === index && (
          <div className="player2">{player2.name}</div>
        )}
        {player3.playing && player3.currentIndex === index && (
          <div className="player3">{player3.name}</div>
        )}
        {player4.playing && player4.currentIndex === index && (
          <div className="player4">{player4.name}</div>
        )}
      </div>
    </>
  );
};

CornerCard.defaultProps = {
  childrens: {},
};

CornerCard.propTypes = {
  childrens: PropTypes.element,
  index: PropTypes.number.isRequired,
};

export default CornerCard;
