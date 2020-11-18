import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';
import { GameContext } from '../../contexts/context';
import styles from './Home.module.css';

const Home = () => {
  const { dispatch } = useContext(GameContext);
  const [game, setGame] = useState({
    numberOfPlayers: 2,
    player1: '',
    player2: '',
    player3: '',
    player4: '',
  });
  const handleStartGame = () => {
    dispatch({
      type: 'START_GAME',
      game,
    });
    navigate('/game');
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.dropDownContainer}>
        <div>Select number of players:</div>
        <div className={styles.playerCountDropDown}>
          <select
            name=""
            id=""
            onChange={(e) => {
              e.preventDefault();
              setGame({
                ...game,
                numberOfPlayers: e.target.value,
              });
            }}
            value={2}
          >
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
      </div>
      <div className={styles.playerForm}>
        <div className={styles.playerInfo}>
          Player1:
          {' '}
          <input
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setGame({
                ...game,
                player1: e.target.value,
              });
            }}
          />
        </div>
        <div className={styles.playerInfo}>
          Player2:
          {' '}
          <input
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setGame({
                ...game,
                player2: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <div className={styles.submit}>
        <button onClick={handleStartGame} type="button">Submit</button>
      </div>
    </div>
  );
};

export default Home;
