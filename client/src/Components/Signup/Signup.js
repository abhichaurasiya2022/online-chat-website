import React from 'react';
import Styles from './Signup.module.scss'
import { Link } from "react-router-dom";

const Signup = () => {

    return(

      <div className={Styles.Body}>

             <form action='#' method='post' className={Styles.Form}>

           <div className={Styles.Title}>Sign Up</div>


         <input type="text" placeholder="Enter Name" name="name" className={Styles.InputField} required></input>

         <input type="text" placeholder="Enter Email" name="email" className={Styles.InputField} required></input>

         <input type="password" placeholder="Password" name="psw" className={Styles.InputField} required></input>

         <input type="password" placeholder="Repeat Password" name="psw-repeat" className={Styles.InputField} required></input>
         <Link to="/login" ><button type="button" className={Styles.Button_Login}>Login</button></Link>

         <button type="submit" className={Styles.Button_SignUp}>Sign Up</button>

             </form>

             </div>
    );
}
export default Signup;
