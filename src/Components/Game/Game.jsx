import React from 'react';
import Card from '../Card/Card';
import Dice from '../Bank/Dice/Dice';
import Players from '../Players/Players';
import './Game.css';
import gameBlocks from '../../data/gameBlocks.json';

const Game = () => {
  const getGameCards = (from, to) => {
    const cardsArray = []

    for (let i = from; i != ((from >= to) ? to - 1 : to + 1); i = ((from >= to) ? i - 1 : i + 1)) {
      const {
        name = '',
        pricetext = '',
        colorName = 'white',
        type = [],
      } = gameBlocks[i]
      cardsArray.push(
        < Card
          name={name}
          index={i}
          pricetext={pricetext}
          color={colorName}
          type={type}
          key={Date.now() + i}
        />
      )
    }
    return cardsArray
  }

  return (
    <div className="table">
      <div className="board">
        <div className="center">
          <div className="playerContainer">
            <Players />
          </div>
          <div className="dice">
            <Dice />
          </div>
        </div>

        {getGameCards(0, 0)}
        <div className="row horizontal-row bottom-row">
          {getGameCards(9, 1)}
        </div>

        {getGameCards(10, 10)}
        <div className="row vertical-row left-row">
          {getGameCards(19, 11)}
        </div>

        {getGameCards(20, 20)}
        <div className="row horizontal-row top-row">
          {getGameCards(21, 29)}
        </div>

        {getGameCards(30, 30)}
        <div className="row vertical-row right-row">
          {getGameCards(31, 39)}
        </div>
      </div>
    </div>
  );
}

export default Game;
