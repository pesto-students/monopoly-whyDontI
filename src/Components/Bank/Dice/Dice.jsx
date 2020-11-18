import React, { useContext } from 'react';
import { GameContext } from '../../../contexts/context';

import diceNumber1 from '../../../assets/Die_1.png';
import diceNumber2 from '../../../assets/Die_2.png';
import diceNumber3 from '../../../assets/Die_3.png';
import diceNumber4 from '../../../assets/Die_4.png';
import diceNumber5 from '../../../assets/Die_5.png';
import diceNumber6 from '../../../assets/Die_6.png';
import styles from './Dice.module.css';

const Dice = () => {
  const { dispatch, gameState } = useContext(GameContext);

  const randomDice = (value) => {
    let result;
    switch (value) {
      case (1):
        result = (<img src={diceNumber1} alt="" />);
        break;

      case (2):
        result = (<img src={diceNumber2} alt="" />);
        break;

      case (3):
        result = (<img src={diceNumber3} alt="" />);
        break;

      case (4):
        result = (<img src={diceNumber4} alt="" />);
        break;

      case (5):
        result = (<img src={diceNumber5} alt="" />);
        break;

      case (6):
        result = (<img src={diceNumber6} alt="" />);
        break;

      default:
        result = '';
        break;
    }
    return result;
  };

  function handleRandomDice() {
    dispatch({
      type: 'ROLL_DICE',
    });
  }

  function showDice() {
    const { dice1 } = gameState;
    const { dice2 } = gameState;

    return (
      <div className={styles.dice}>
        {randomDice(dice1)}
        {randomDice(dice2)}
      </div>
    );
  }

  return (
    <div className={styles.diceContainer}>
      {showDice()}
      <button onClick={handleRandomDice} type="button">Roll Dice</button>
    </div>
  );
};

export default Dice;
