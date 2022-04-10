import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import './Game.scss';
const Game = ({ children }) => {
  /*
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(children.history[stepNumber]);
  const xO = xIsNext ? "X" : "O";
  children.var11("Worked");
  const handleClick = (i) => {
    const historyPoint = children.history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    children.setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };*/

  const [finalWinner, setFinalWinner]= useState("");

  return (
    <>
    <h3>{"You :" + children.yourID}!</h3>
    
    <h3>{children.winner ?  children.winner : "Next Player: " + children.xO}</h3>
    
      <Board squares={children.history[children.stepNumber]} onClick={children.handleClick} isMe = {children.yourID} turn = {children.xO} isLoading = {children.isLoading}/>
      <div className="info-wrapper">

      </div>
    </>
  );
};

export default Game;
