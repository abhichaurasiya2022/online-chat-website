import React, {useState} from 'react';
import Styles from './Login.module.scss'
import { Link, Navigate } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(['token']);

  const signIn = () =>{
    console.log("hey");
    Axios.post('/api/signin',{
      email: email,
      password: password,
    }).then(response => {
      window.location.href='/'
      setCookies('jwt', response.data, { path: '/'});
      console.log(response.data);
    });
  }

    return(

      <div className={Styles.Body}>

      <div className={Styles.Form}>

      <div className={Styles.Title}>Login</div>



    <input
      type="text"
      placeholder="Enter Email"
      onChange={(e) => setEmail(e.target.value)}
      className={Styles.InputField}
      required
        >
    </input>

    <input
      type="password"
      placeholder="Password"
      className={Styles.InputField}
      onChange={(e) => setPassword(e.target.value)}
      required
        >
    </input>

    <Link to="/forgot" className={Styles.Link} ><p className={Styles.ForgotPassLink}>Forgot Password ?</p></Link>

    <Link to="/signup" ><button type="button" className={Styles.Button_SignUp}>Sign Up</button></Link>

    <button
      className={Styles.Button_Login}
      onClick={() => {signIn()}}
        >
          Login
    </button>



    </div>
        </div>
    );
}
export default Login;
