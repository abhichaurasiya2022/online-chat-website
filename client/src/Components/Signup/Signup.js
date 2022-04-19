import React, {useState, useEffect} from 'react';
import Styles from './Signup.module.scss'
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookies from 'js-cookie';




const Signup = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [isEmailWrong, setIsEmailWrong] = useState(false);
    const [isNameWrong, setIsNameWrong] = useState(false);
    const [isPassWrong, setIsPassWrong] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [alertMsgName, setAlertMsgName] = useState('');
    const [alertMsgPass, setAlertMsgPass] = useState('');
    const [emailTerm, setEmailTerm] = useState('');
    const [nameTerm, setNameTerm] = useState('');
    const [passTerm, setPassTerm] = useState('');
    const [repeatPassTerm, setRepeatPassTerm] = useState('');

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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {

      let namer = nameTerm.toLowerCase();
      if (namer.length<1) {
        setIsNameWrong(false);
      }
      else {
        if (validateName(namer)){
          setName(namer);
          setIsNameWrong(false);
        }
        else {
          setAlertMsgName("Enter Valid Name [no space, no special character]");
          setIsNameWrong(true);
        }
      }

      // Send Axios request here
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [nameTerm])



      const validateName = (namer) => {
         var re = /^[a-zA-Z0-9_.]*$/;
        return re.test(namer);
      };



     const validateEmail = (mailer) => {
        var re = /\S+@\S+\.\S+/;
       return re.test(mailer);
     };


     const checkMail = (mailID) =>{
       let mailer = mailID.toLowerCase();

       if (validateEmail(mailer)){
         setEmail(mailer);
         setIsEmailWrong(false);
       }
       else {
         setAlertMsg("Enter Valid Email Id");
         setIsEmailWrong(true);
       }
     }

     const checkPass = () =>{
       if (name.length<1) {
         setAlertMsgName("Enter Name");
         setIsNameWrong(true);
       }
       if (email.length<1) {
         setAlertMsg("Enter Email");
         setIsEmailWrong(true);
       }
       if (passTerm.length<1) {
         setAlertMsgPass("Enter Password");
         setIsPassWrong(true);
       }
       else {
         if (passTerm == repeatPassTerm) {
           setPassword(repeatPassTerm);
           setIsPassWrong(false);
           signUp();
         }
         else {
           setAlertMsgPass("Password Didn't Match!");
           setIsPassWrong(true);
         }
       }

     }

    const signUp = () =>{

      Axios.post('/api/signup',{
        name:name,
        email: email,
        password: password,
      }).then(response=> {

        if (response.data == "401") {
          setAlertMsg("Email Already In Use");
          setIsEmailWrong(true);
        }
        if (response.data == "200") {
          window.location.href='/login';
        }
        if (response.data<1) {
          setAlertMsg("Internal Server Error");
          setIsEmailWrong(true);
        }

      });
    }

    return(

      <div className={Styles.Body}>

            <div className={Styles.Form}>

           <div className={Styles.Title}>Sign Up</div>


         <input type="text" placeholder="Enter Name" onChange={(e) => setNameTerm(e.target.value)} className={Styles.InputField} required></input>

            {isNameWrong && (<><p>{alertMsgName}</p></>)}

         <input type="text" placeholder="Enter Email" onChange={(e) => setEmailTerm(e.target.value)} className={Styles.InputField} required></input>

            {isEmailWrong && (<><p>{alertMsg}</p></>)}

         <input type="password" placeholder="Password" onChange={(e) => setPassTerm(e.target.value)} className={Styles.InputField} required></input>

         <input type="password" placeholder="Repeat Password" onChange={(e) => setRepeatPassTerm(e.target.value)}  className={Styles.InputField} required></input>

            {isPassWrong && (<><p>{alertMsgPass}</p></>)}

         <Link to="/login" ><button type="button" className={Styles.Button_Login}>Login</button></Link>

         <button

          className={Styles.Button_SignUp}
          onClick={() => {checkPass()}}
            >
              Sign Up
         </button>

</div>

             </div>
    );
}
export default Signup;
