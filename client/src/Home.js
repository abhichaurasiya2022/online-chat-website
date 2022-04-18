import React, {useEffect, useState} from 'react';
import Styles from "./styles/Home.scss"
import Header from './Components/home/Header';
import RegisteredCard from './Components/home/RegisteredCard';
import UnregisteredCard from './Components/home/UnregisteredCard';
import App from './unregisteredPage';
import jwt from 'jsonwebtoken';
import TermsAndConditions from './Components/home/TermsAndConditions';
import {useCookies} from 'react-cookie';
import dotenv from 'dotenv';
import Dashboard from './Dashboard';

const Index = () => {

  const [cookies, setCookies] = useCookies(['token']);
  const [isAuth, setIsAuth] = useState(false);
  const decoded =jwt.decode(cookies.jwt, process.env.JWT_SECRET);
  useEffect(() => {
    if (decoded) {
      setIsAuth(true);

    }
  },[])
  return (
    <>


    {isAuth && (
      <>

        <Dashboard/>
       
      </>
    )}

    {!isAuth && (
      <>
      <div className={Styles.bodyIndex}>

      <Header/>
      <RegisteredCard/>
      <UnregisteredCard/>

      </div>
      </>
    )}



    </>
  )
}

export default Index;
