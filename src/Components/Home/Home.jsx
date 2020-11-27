import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';
import { GameContext } from '../../contexts/context';
import { toast } from 'react-toastify';
const POSTER_LINK = 'https://i.pinimg.com/originals/cc/6d/2f/cc6d2f46dcd424900b0458126d45d042.jpg'

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
    let error = false
    if (game.numberOfPlayers > 0 && game.player1 === '') {
      error = true
    }
    if (game.numberOfPlayers > 1 && game.player2 === '') {
      error = true
    }
    if (game.numberOfPlayers > 2 && game.player3 === '') {
      error = true
    }
    if (game.numberOfPlayers > 3 && game.player4 === '') {
      error = true
    }

    if (error) {
      toast.error('Plese fill player names', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    dispatch({
      type: 'START_GAME',
      game,
    });
    navigate('/game');
  };

  return (
    <div className={styles.homeContainer}>
      <div>
        <img className={styles.poster} src={POSTER_LINK} alt="Monopoly" />
      </div>
      <div className={styles.playerForm}>
        <div className={styles.dropDownContainer}>
          <div className={styles.lable}>Select number of players:</div>
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
              value={game.numberOfPlayers}
            >
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
        <div>
          {game.numberOfPlayers > 0 && <div className={styles.playerInfo}>
            <input
              type="text"
              placeholder="Enter player 1 name"
              onChange={(e) => {
                e.preventDefault();
                setGame({
                  ...game,
                  player1: e.target.value,
                });
              }}
              value={game.player1}
            />
          </div>}
        </div>
        <div>
          {game.numberOfPlayers > 1 && <div className={styles.playerInfo}>
            <input
              type="text"
              placeHolder="Enter player 2 name"
              onChange={(e) => {
                e.preventDefault();
                setGame({
                  ...game,
                  player2: e.target.value,
                });
              }}
              value={game.player2}
            />
          </div>}
        </div>
        <div>
          {game.numberOfPlayers > 2 && <div className={styles.playerInfo}>
            <input
              type="text"
              placeholder="Enter player 3 name"
              onChange={(e) => {
                e.preventDefault();
                setGame({
                  ...game,
                  player3: e.target.value,
                });
              }}
              value={game.player3}
            />
          </div>}
        </div>
        <div>
          {game.numberOfPlayers > 3 && <div className={styles.playerInfo}>
            <input
              type="text"
              placeholder="Enter player 4 name"
              onChange={(e) => {
                e.preventDefault();
                setGame({
                  ...game,
                  player4: e.target.value,
                });
              }}
              value={game.player4}
            />
          </div>}
        </div>
      </div>

      <div className={styles.submit}>
        <button onClick={handleStartGame} type="button">Submit</button>
      </div>
    </div>
  );
};

export default Home;
