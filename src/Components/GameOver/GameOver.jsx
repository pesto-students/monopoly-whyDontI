import React, { useContext } from 'react'
import { GameContext } from '../../contexts/context';
import { navigate } from '@reach/router';
import styles from './GameOver.module.css'

const GameOver = () => {
  const { gameState } = useContext(GameContext);
  const {
    player1,
    player2,
    player3,
    player4
  } = gameState;

  const getWinnerName = () => {
    if (player1.playing && player1.balance > 0) {
      return player1.name
    } else if (player2.playing && player2.balance > 0) {
      return player2.name
    } else if (player3.playing && player3.balance > 0) {
      return player3.name
    } else if (player4.playing && player4.balance > 0) {
      return player4.name
    }
  }

  const handlePlayAgain = () => {
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Game Over</div>
      <div className={styles.playerName}>Congratulations {getWinnerName()} you won!</div>
      <div className={styles.playAgain} onClick={handlePlayAgain}>
        <button>Play Again</button>
      </div>
    </div>
  )
}

export default GameOver