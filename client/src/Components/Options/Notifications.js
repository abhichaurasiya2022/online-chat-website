import React, { useContext } from "react";


import { SocketContext } from "../SocketContext";
const Notifications = () => {
    const {answerCall, call, callAccepted } = useContext(SocketContext);
    return (
        <>
            {call.isReceivedCall && !callAccepted && (
                <div >
                    <h1>{call.name} is calling: </h1>
                    <button  onClick={() => {answerCall()}}>
                        Answer
                    </button>
                </div>
            )}
        </>
    )
}

export default Notifications
