import React from "react";
import Square from "./Square";

function art(squares, onClick, isMe, turn){
 if (isMe == turn) {
   return (
   <>
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
 </>
   );
 }
 else {
  
  return(
    <>
  {squares.map((square, i) => (
    <Square key={i} value={square} />
  ))}
  </>
  )
 }
}

const Board = ({ squares, onClick, isMe, turn }) => (

  <div className="board">
    {art(squares, onClick, isMe, turn)}
    
  </div>
);

export default Board;
