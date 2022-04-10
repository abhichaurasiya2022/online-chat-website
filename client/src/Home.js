import Styles from "./styles/Home.scss"
import Header from './Components/home/Header';
import RegisteredCard from './Components/home/RegisteredCard';
import UnregisteredCard from './Components/home/UnregisteredCard';
import App from './unregisteredPage';
import TermsAndConditions from './Components/home/TermsAndConditions';


export default function index() {

  return (
    <div className={Styles.bodyIndex}>
    <Header/>
    <RegisteredCard/>
    <UnregisteredCard/>

    </div>
  )
}
