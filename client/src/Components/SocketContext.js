import React, {createContext, useState, useRef, useEffect} from "react";
import { io} from 'socket.io-client';
import peer from 'simple-peer';
import Peer from "simple-peer";
import Axios from "axios";
import {useCookies, removeCookie} from 'react-cookie';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const SocketContext = createContext();

const socket = io.connect('/userType2');

const Contextprovider = ({children}) => {
  const [cookies, setCookies, removeCookie] = useCookies(['token']);
  const decoded =jwt.decode(cookies.jwt, process.env.JWT_SECRET);

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [callerName, setCallerName] = useState('');
    const [myEmail, setMyEmail] = useState('');
    const [onlyChat, setOnlyChat] = useState(false);
    const [myStatus, setMyStatus] = useState(false);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    function getSilence() {
      let ctx = new AudioContext(),
        oscillator = ctx.createOscillator();
      let dst = oscillator.connect(ctx.createMediaStreamDestination());
      oscillator.start();
      return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
    }

    function getBlack() {
      let width = 580;
      let height = 400;
      let canvas = Object.assign(document.createElement("canvas"), {
        width,
        height,
      });
      let ctx = canvas.getContext("2d");
      ctx.fillRect(0, 0, width, height);
      let stream = canvas.captureStream();
      return Object.assign(stream.getVideoTracks()[0], { enabled: false });
    }

    function initVideo() {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
        (newStream) => {
          setStream(newStream);
          if (myVideo.current) {
            myVideo.current.srcObject = newStream;
          }
        },
        () => {
          setOnlyChat(true);

          navigator.mediaDevices.getUserMedia({ video: true }).then(
            (newStream) => {
              let silenceStream = new MediaStream([
                getSilence(),
                ...newStream.getVideoTracks(),
              ]);

              setStream(silenceStream);
              if (myVideo.current) {
                myVideo.current.srcObject = silenceStream;
              }
            },
            () => {
              navigator.mediaDevices.getUserMedia({ audio: true }).then(
                (newStream) => {
                  let blackStream = new MediaStream([
                    getBlack(),
                    ...newStream.getAudioTracks(),
                  ]);

                  setStream(blackStream);
                  if (myVideo.current) {
                    myVideo.current.srcObject = blackStream;
                  }
                },
                () => {
                  let dummyStream = new MediaStream([getSilence(), getBlack()]);

                  setStream(dummyStream);
                  if (myVideo.current) {
                    myVideo.current.srcObject = dummyStream;
                  }
                }
              );
            }
          );
        }
      );
    }


    const sendId = (iidd) => {
      console.log(iidd + "from fun");
      setMe(iidd);
     Axios.post('/api/addId', {
       myId:iidd,
       myEmail: decoded.emailid,
     }).then(response => {
       setMyStatus(response.data);
       console.log(response.data);
       console.log(me);
     })

    }

    useEffect(() => {
      /*
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });
*/



        initVideo();
        socket.on('meReg', (id) =>{

           if (decoded) {
               setMyEmail(decoded.emailid);
               console.log(decoded.emailid + " heyyyyyy");
               sendId(id);

           }

         });
         console.log("hello");
        socket.on('calluserReg', ({ from, callerName: callerName, signal }) => {
          console.log("tities");
            setCall({ isReceivedCall: true, from, callerName: callerName, signal })
        });
    }, []);



    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answercallReg', { signal: data, to: call.from});
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('calluserReg', { userToCall: id, signalData: data, from: me, callerName });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callacceptedReg', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;

    }

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();
        setCallAccepted(false);
        setCallEnded(false);

    }

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            callerName,
            setMyEmail,
            setCallerName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export {Contextprovider, SocketContext};
