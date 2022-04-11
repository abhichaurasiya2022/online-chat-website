import Styles from "./styles/Login.scss"
import Login from './Components/Login/Login';

export default function login() {

  return (
    <div className={Styles.bodyLogin}>
    <Login/>
    </div>
  )
}
