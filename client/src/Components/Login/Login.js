import React from 'react';
import Styles from './Login.module.scss'
import { Link } from "react-router-dom";

const Login = () => {

    return(

      <div className={Styles.Body}>

        <form action='#' method='post' className={Styles.Form}>

      <div className={Styles.Title}>Login</div>



    <input type="text" placeholder="Enter Email" name="email" className={Styles.InputField} required></input>

    <input type="password" placeholder="Password" name="psw" className={Styles.InputField} required></input>
    <Link to="/forgot" className={Styles.Link} ><p className={Styles.ForgotPassLink}>Forgot Password ?</p></Link>

    <Link to="/signup" ><button type="button" className={Styles.Button_SignUp}>Sign Up</button></Link>

    <button type="submit" className={Styles.Button_Login}>Login</button>


        </form>

        </div>
    );
}
export default Login;
