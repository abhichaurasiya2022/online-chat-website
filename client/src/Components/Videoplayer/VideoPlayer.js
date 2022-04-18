import React, { useContext, useEffect } from "react";
import {useCookies, removeCookie} from 'react-cookie';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { SocketContext } from "../SocketContext";


const VideoPlayer = () => {
    const { name, callAccepted, myVideo, setMyEmail, userVideo, callEnded, stream, call} = useContext(SocketContext);
    const [cookies, setCookies, removeCookie] = useCookies(['token']);
    const decoded =jwt.decode(cookies.jwt, process.env.JWT_SECRET);
    useEffect(() => {
      console.log(decoded);
      if (decoded) {
        console.log(decoded.emailid);
        setMyEmail(decoded.emailid);

      }
      else {
        window.location.href='/login'
      }

    }, []);
    return (
        <div>
            {/* Our own Video */}
            {stream && (
                    <div>
                        <div >
                             <h3 >{name || 'Name'}</h3>
                             <video
                               playsInline
                               muted
                               ref={myVideo}
                               autoPlay
                             />
                         </div>
                     </div>
              )  }

            {/*user video */}
            {callAccepted && !callEnded && (
                    <div>
                        <div >
                             <h3 >{ call.name || 'Name'}</h3>
                             <video playsInline  ref={userVideo} autoPlay  />
                        </div>
                    </div>

            )  }

        </div>
    );
}

export default VideoPlayer
