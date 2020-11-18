import React, { useContext } from 'react';
import { GameContext } from '../../contexts/context';
import styles from './Players.module.css';

const Players = () => {
  const { gameState } = useContext(GameContext);
  const {
    player1,
    player2,
    player3,
    player4,
  } = gameState;

  return (
    <div className={styles.playerDetails}>
      <div className={styles.heading}>
        <h1>Players</h1>
      </div>
      {player1.playing && (

        <div className={`${styles.player} ${player1.turn && styles.playerShadow}`}>
          <div className={`${styles.colorHeader} ${'player1'}`} />
          <h3 className={styles.playerName}>{`${player1.name}`}</h3>
          <p>{`$${player1.balance}`}</p>
        </div>
      )}
      {player2.playing && (
        <div className={`${styles.player} ${player2.turn && styles.playerShadow}`}>
          <div className={`${styles.colorHeader} ${'player2'}`} />
          <h3 className={styles.playerName}>{`${player2.name}`}</h3>
          <p>{`$${player2.balance}`}</p>
        </div>
      )}
      {player3.playing && (
        <div className={`${styles.player} ${player3.turn && styles.playerShadow}`}>
          <div className={`${styles.colorHeader} ${'player3'}`} />
          <h3 className={styles.playerName}>{`${player3.name}`}</h3>
          <p>{`$${player3.balance}`}</p>
        </div>
      )}
      {player4.playing && (
        <div className={`${styles.player} ${player4.turn && styles.playerShadow}`}>
          <div className={`${styles.colorHeader} ${'player4'}`} />
          <h3 className={styles.playerName}>{`${player4.name}`}</h3>
          <p>{`$${player4.balance}`}</p>
        </div>
      )}
    </div>
  );
};

export default Players;
