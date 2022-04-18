import React, { useContext, useState } from "react";


import { SocketContext } from "../SocketContext";


const Options = ( { children}) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
      <>
        <h2> heelo </h2>
      </>


    )
}

export default Options
