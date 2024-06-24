import React from 'react';
import './Game.css';

const Board = ({ snake, food }) => {
  const createBoard = () => {
    let board = [];
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        let isSnake = snake.some(segment => segment.x === i && segment.y === j);
        let isFood = food.x === i && food.y === j;
        board.push(
          <div key={`${i}-${j}`} className={`cell ${isSnake ? 'snake-dot' : ''} ${isFood ? 'snake-food' : ''}`}></div>
        );
      }
    }
    return board;
  };

  return <div className="game-area">{createBoard()}</div>;
};

export default Board;