import React, { useState, useEffect } from "react";
import "./Game.css";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 24;
  let x = Math.floor(Math.random() * (max - min + 1) + min);
  let y = Math.floor(Math.random() * (max - min + 1) + min);
  return { x, y };
};

const Game = () => {
  const [snake, setSnake] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);
  const [food, setFood] = useState(getRandomCoordinates());
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);

  useEffect(() => {
    const onKeyDown = (e) => {
      e = e || window.event;
      switch (e.keyCode) {
        case 37:
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case 38:
          if (direction !== "DOWN") setDirection("UP");
          break;
        case 39:
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case 40:
          if (direction !== "UP") setDirection("DOWN");
          break; 
        default:
          break;
      }
    };

    document.onkeydown = onKeyDown;
    return () => (document.onkeydown = null);
  }, [direction]);

  useEffect(() => {
    const moveSnake = () => {
      let newSnake = [...snake];
      let head = { ...newSnake[newSnake.length - 1] };

      switch (direction) {
        case "RIGHT":
          head = { x: head.x + 1, y: head.y };
          break;
        case "LEFT":
          head = { x: head.x - 1, y: head.y };
          break;
        case "DOWN":
          head = { x: head.x, y: head.y + 1 };
          break;
        case "UP":
          head = { x: head.x, y: head.y - 1 };
          break;
        default:
          break;
      }

      newSnake.push(head);
      newSnake.shift();
      setSnake(newSnake);

      if (head.x === food.x && head.y === food.y) {
        setFood(getRandomCoordinates());
        enlargeSnake();
        increaseSpeed();
      }

      checkIfOutOfBorders(head);
      checkIfCollapsed(newSnake, head);
    };

    const enlargeSnake = () => {
      let newSnake = [...snake];
      newSnake.unshift({});
      setSnake(newSnake);
    };

    const checkIfOutOfBorders = (head) => {
      if (head.x >= 25 || head.x < 0 || head.y >= 25 || head.y < 0) {
        gameOver();
      }
    };

    const checkIfCollapsed = (newSnake, head) => {
      let snakeCopy = [...newSnake];
      snakeCopy.pop();
      snakeCopy.forEach((segment) => {
        if (head.x === segment.x && head.y === segment.y) {
          gameOver();
        }
      });
    };

    const increaseSpeed = () => {
      if (speed > 10) {
        setSpeed(speed - 10);
      }
    };

    const gameOver = () => {
      clearInterval(gameInterval);
      alert(`Game Over. Snake length is ${snake.length}`);
      setSnake([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ]);
      setFood(getRandomCoordinates());
      setDirection("RIGHT");
      setSpeed(200);
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [snake, direction, food, speed]);

  return (
    <div className="App">
      <h1>jeetungaa's saanp</h1>
      <div className="game-area">
        {snake.map((dot, i) => (
          <div
            key={i}
            className="snake-dot"
            style={{ gridColumnStart: dot.x + 1, gridRowStart: dot.y + 1 }}
          ></div>
        ))}
        <div
          className="snake-food"
          style={{ gridColumnStart: food.x + 1, gridRowStart: food.y + 1 }}
        ></div>
      </div>
    </div>
  );
};

export default Game;
