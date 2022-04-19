import React, {useState, useEffect} from 'react';
import Styles from './Login.module.scss'
import { Link } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';
const Login = () => {

  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(['token']);
  const [isEmailWrong, setIsEmailWrong] = useState(false);
  const [isPassWrong, setIsPassWrong] = useState(false);
//  const [isMsg, setIsMsg] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertMsgPass, setAlertMsgPass] = useState('');
//  const [resMsg, setResMsg] = useState('');
  const [emailTerm, setEmailTerm] = useState('');
  const [passTerm, setPassTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {

      let mailer = emailTerm.toLowerCase();
      if (mailer.length<1) {
        setIsEmailWrong(false);
      }
      else {
        if (validateEmail(mailer)){
          setEmail(mailer);
          setIsEmailWrong(false);
        }
        else {
          setAlertMsg("Enter Valid Email Id");
          setIsEmailWrong(true);
        }
      }

      // Send Axios request here
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [emailTerm])

  const validateEmail = (mailer) => {
     var re = /\S+@\S+\.\S+/;
    return re.test(mailer);
  };

  const checkPass = () =>{
    if (!isEmailWrong) {
      if (email.length<1) {
        setAlertMsg("Enter Email");
        setIsEmailWrong(true);
      }
      if (passTerm.length<1) {
        setAlertMsgPass("Enter Password");
        setIsPassWrong(true);
      }
      else {
        signIn();
      }
    }


  }

  const signIn = () =>{

    Axios.post('/api/signin',{
      email: email,
      password: passTerm,
    }).then(response => {
      console.log(response.data);
      if (response.data == "401") {
        setAlertMsgPass("Wrong Email or Password");
        setIsPassWrong(true);
      }
      if (response.data == "400") {
        setAlertMsgPass("Enter Email And Password Correct");
        setIsPassWrong(true);
      }
      if (response.data.status == "200") {
        window.location.href='/'
        setCookies('jwt', response.data.token, { path: '/'});

      }

    });
  }

    return(

      <div className={Styles.Body}>

      <div className={Styles.Form}>

      <div className={Styles.Title}>Login</div>



    <input
      type="text"
      placeholder="Enter Email"
      onChange={(e) => setEmailTerm(e.target.value)}
      className={Styles.InputField}
      required
        >
    </input>

    {isEmailWrong && (<><p>{alertMsg}</p></>)}

    <input
      type="password"
      placeholder="Password"
      className={Styles.InputField}
      onChange={(e) => setPassTerm(e.target.value)}
      required
        >
    </input>

    {isPassWrong && (<><p>{alertMsgPass}</p></>)}


    <Link to="/forgot" className={Styles.Link} ><p className={Styles.ForgotPassLink}>Forgot Password ?</p></Link>

    <Link to="/signup" ><button type="button" className={Styles.Button_SignUp}>Sign Up</button></Link>

    <button
      className={Styles.Button_Login}
      onClick={() => {checkPass()}}
        >
          Login
    </button>



    </div>
        </div>
    );
}
export default Login;
