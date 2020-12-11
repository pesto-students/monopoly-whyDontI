import React, { useContext } from 'react';
import { navigate } from '@reach/router';
import { GameContext } from '../../contexts/context';
import styles from './GameOver.module.css';

const GameOver = () => {
  const { gameState } = useContext(GameContext);
  const {
    player1,
    player2,
    player3,
    player4,
  } = gameState;

  const getWinnerName = () => {
    if (player1.playing && player1.balance > 0) {
      return player1.name;
    } if (player2.playing && player2.balance > 0) {
      return player2.name;
    } if (player3.playing && player3.balance > 0) {
      return player3.name;
    } if (player4.playing && player4.balance > 0) {
      return player4.name;
    }
    return '';
  };

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Game Over</div>
      <div className={styles.playerName}>
        Congratulations
        {' '}
        {getWinnerName()}
        {' '}
        you won!
      </div>
      <button
        type="button"
        className={styles.playAgain}
        onClick={handlePlayAgain}
        onKeyPress={handlePlayAgain}
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
