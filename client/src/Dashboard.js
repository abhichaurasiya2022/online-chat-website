import React, {useEffect, useState} from 'react';
import {useCookies, removeCookie} from 'react-cookie';
import jwt from 'jsonwebtoken';
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

const Dashboard = () => {
    const [cookies, setCookies, removeCookie] = useCookies(['token']);
    const [isAuth, setIsAuth] = useState(false);
    const decoded =jwt.decode(cookies.jwt, process.env.JWT_SECRET);
    const [searchName, setsearchName] = useState("");
    const [searchUserId, setsearchUserId] = useState("");
    const [name, setName] = useState("");
    const [friends, setFriends] = useState(["none","none"]);
    const [searchResults, setSearchResults] = useState({});
    const [testVar, setTestVar] = useState([]);
    const [boobsName, setBoobsName] = useState([]);
    const [boobsId, setBoobsId] = useState([]);
    let testprint = "test";
    let titties={};
    let tittie=[];

    const Logout = () => {
      removeCookie('jwt');
      window.location.href='/login'
    }

    const AddFriend =() => {

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
        <>
        <h4>{name}</h4>
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
          >
            Search
        </button>
        <button
          onClick={() => {Logout()}}
          >
            Log out
        </button>
        </>
      )}

      {!isAuth && (
        <>
        </>
      )}

      {searchResults.name && (
        <>
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
        </>
      )}

      {titties && (
        <>
        <h1>hello</h1>
        {abc()}

          <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>User ID</th>
            </tr>

            {idfriend.map((e, key) => {
              return (
                <>
                  <tr>
                    <td>{namefriend[key]}</td>
                    <td>{idfriend[key]}</td>
                    <button
                      onClick = {()=> {callFriend(namefriend[key], idfriend[key])}}
                      >
                        call
                    </button>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        </>
      )}





  </>
    )
}

export default Dashboard;