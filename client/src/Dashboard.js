import React, {useContext, useEffect, useState} from 'react';
import {useCookies, removeCookie} from 'react-cookie';
import VideoPlayer from "./Components/Videoplayer/VideoPlayer";
import Styles from './dashboard.module.scss';
import jwt from 'jsonwebtoken';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import { SocketContext } from "./Components/SocketContext";
import {useBeforeunload} from "react-beforeunload";
import dotenv from 'dotenv';
import Axios from 'axios';
import Login from './login';

import {
  FaPhotoVideo,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhone,
  FaExpandArrowsAlt,
  FaCompressArrowsAlt,
  FaLaptop,
} from "react-icons/fa";
import { VscCallIncoming, } from "react-icons/vsc";
import { ImPhoneHangUp, ImPhone } from "react-icons/im";
const Dashboard = () => {

    useBeforeunload((event) => {
      event.preventDefault();
    });



    const [cookies, setCookies, removeCookie] = useCookies(['token']);
    const [isAuth, setIsAuth] = useState(false);
    const decoded =jwt.decode(cookies.jwt, process.env.JWT_SECRET);
    const [searchName, setsearchName] = useState("");
    const [searchUserId, setsearchUserId] = useState("");
    const [name, setName] = useState("");
    const [myUid, setMyUid] = useState("");
    const [friends, setFriends] = useState(["none","none"]);
    const [searchResults, setSearchResults] = useState({});
    const [testVar, setTestVar] = useState([]);
    const [isFriendAdded, setIsFriendAdded] = useState(false);
    const [boobsName, setBoobsName] = useState([]);
    const {  me, callAccepted, callerName, setCallerName, callEnded, leaveCall, callUser, answerCall, call } = useContext(SocketContext);
    const [boobsId, setBoobsId] = useState([]);
    let testprint = "test";
    let titties={};
    let tittie=[];

    const [modal, setModal] = React.useState(false);

     // Toggle for Modal
     const toggle = () => setModal(!modal);

    const Logout = () => {
      removeCookie('jwt');
      window.location.href='/login'
    }

    const AddFriend =() => {
      Axios.post('/api/addfriend', {
        myName: name,
        myId: myUid,
        youName: searchResults.name,
        youId: searchResults.user_id,
      }).then(response => {
        console.log(response.data);
        setIsFriendAdded(true);
      });
    }

    const SearchUser = () => {
      Axios.post('/api/search', {
        searchName: searchName,
        searchUserId: searchUserId
      }).then(response => {

        setSearchResults(response.data);
      })
    }
    const getApi = () =>{

      Axios.post('/api/dashboard', {
        emailid:decoded.emailid,
      }).then(response => {
       console.log(response.data.name);
       setName(response.data.name);
       setMyUid(response.data.myUid);
       setCallerName(response.data.name);
       titties = response.data.friends;
       console.log(response.data.friends);

        for ( const x in titties){
          tittie.push(titties[x].friendName);
          tittie.push(titties[x].friendId);
        }
        setTestVar(tittie);
        console.log(tittie);
      })
    }

    const callFriend = (callname, callid) =>{
      console.log(callname + " " + callid);
      Axios.post('/api/getId', {
        callname: callname,
        callid: callid,
      }).then(response => {
        console.log(response.data);
        callUser(response.data)
      });
    }

    useEffect(() => {

      console.log(decoded);
      if (decoded) {
        console.log(decoded.emailid);
        setIsAuth(true);
        getApi();
      }
      else {
        window.location.href='/login'
      }

    }, []);

    let namefriend = [];
    let idfriend = [];
        const abc = () => {
          for (let i = 0; i < testVar.length; i++) {
            namefriend.push(testVar[i]);

            for (let j = i + 1; j < i + 2; j++) {
              idfriend.push(testVar[j]);
            }

            i += 1;
          }
        };

    return (
    <>
      {isAuth && (
        <div className={Styles.videoPlayer}>
        <VideoPlayer />
        </div>
      )}

      {!isAuth && (
        <>
        </>
      )}



      {titties && (
          <div className={Styles.friendList}>
          <div className={Styles.userName}>{name}</div>

          <button className={Styles.buttonLogout}
            onClick={() => {Logout()}}
            >
              Log out
          </button>

        {abc()}
              {isAuth && (
                <>
        <input
          type="text"
          placeholder="Search Name"
          onChange={(e) => setsearchName(e.target.value)}
          required
            >
        </input>
        <input
          type="text"
          placeholder="User Id"
          onChange={(e) => setsearchUserId(e.target.value)}
          required
            >
        </input>
        <button
          onClick={() => {SearchUser()}}
          className={Styles.searchButton}
          >
            Search
        </button>
        </>
  )}
        {searchResults.name && (
          <>
          <div className={Styles.searchResult}>
          <table>
            <tr>
              <td>{searchResults.name}</td>
              <td>{searchResults.user_id}</td>
              <td>
              <button
                onClick={() => {AddFriend()}}
                >
                  Add Friend
              </button>
              </td>
            </tr>
          </table>
          </div>
          </>
        )}
          <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>User ID</th>
                  <th>Call</th>
            </tr>

            {idfriend.map((e, key) => {
              return (
                <>
                  <tr>
                    <td>{namefriend[key]}</td>
                    <td>{idfriend[key]}</td>
                   <td> <button
                      onClick = {()=> {callFriend(namefriend[key], idfriend[key])}}
                      >
                        call
                    </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        </div>
      )}

      {callAccepted && (
                <div className='Styles.hangUp'>
                                      <button
                                      onClick={leaveCall}

                                      >
                                          Hang Up
                                      </button>
</div>
) }

          {1 && !callAccepted && (
                <div className={Styles.notification}>
                    <h1>{call.callerName}Abhishek is calling: </h1>
                 { /*  <button
                     onClick={answerCall}
                      >
                        Answer
                    </button>*/}
            <span className={Styles.iconContainerDecline} onClick={() => answerCall()}>
              <ImPhoneHangUp className={Styles.iconDecline} alt="Decline call" />
            </span>
            <span className={Styles.iconContainerAccept} onClick={() => answerCall()}>
              <ImPhone className={Styles.iconAccept} alt="Accept call" />
            </span>
                </div>
            )}



  </>
    )
}

export default Dashboard;
