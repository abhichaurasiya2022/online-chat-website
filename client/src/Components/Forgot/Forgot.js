import Styles from './Forgot.module.scss'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
const ForgotPassPage = () => {


const [style, setStyle] = useState("Styles.otpFieldDisabled");
const sendOtp = () =>{
  console.log("otp button chnaged");
  setStyle("Styles.otpFieldEnabled");

    };

 let otpclass = style;

    return (

        <div className={Styles.Body}>

        <form action='#' method='post' className={Styles.Form}>

      <div className={Styles.Title}>Reset Password</div>


    <div className={Styles.EmailButtonContainer}>
    <input type="text" placeholder="Enter Email" name="email" className={Styles.EmailInputField} required></input>
    <button type="button" onClick={sendOtp} className={Styles.Button_SendOTP}>Variefy</button>
    </div>
    <input type="text" placeholder="Enter OTP" name="number" id={Styles.otpField} className={Styles.otpclass} required></input>

    <input type="password" placeholder="Password" name="psw" className={Styles.InputField} required></input>
    <input type="password" placeholder="Repeat Password" name="psw" className={Styles.InputField} required></input>


    <Link to="/login" ><button type="button" className={Styles.Button_SignUp}>Login</button></Link>

    <button type="submit" className={Styles.Button_Changepsw}>Change Password</button>


        </form>

        </div>
    )
}
export default ForgotPassPage;
