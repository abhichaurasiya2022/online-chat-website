import React from "react";
import Square from "./Square";

function art(squares, onClick, isMe, turn, isLoading){
  if (isLoading) {
    
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

const Board = ({ squares, onClick, isMe, turn , isLoading}) => (

  <div className="board">
    {art(squares, onClick, isMe, turn, isLoading)}
    
  </div>
);

export default Board;
