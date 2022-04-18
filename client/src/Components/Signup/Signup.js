import React, {useState} from 'react';
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


     console.log(username);

    const signUp = () =>{
      console.log("hey");
      Axios.post('/api/signup',{
        name:name,
        email: email,
        password: password,
      }).then();
    }

    return(

      <div className={Styles.Body}>

      

           <div className={Styles.Title}>Sign Up</div>


         <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} className={Styles.InputField} required></input>

         <input type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} className={Styles.InputField} required></input>

         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className={Styles.InputField} required></input>

         <input type="password" placeholder="Repeat Password" onChange={(e) => setRepeatPass(e.target.value)}  className={Styles.InputField} required></input>
         <Link to="/login" ><button type="button" className={Styles.Button_Login}>Login</button></Link>

         <button

          className={Styles.Button_SignUp}
          onClick={() => {signUp()}}
            >
              Sign Up
         </button>



             </div>
    );
}
export default Signup;
