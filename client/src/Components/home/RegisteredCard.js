import React from 'react';
import { Button, Card } from 'reactstrap';
import Styles from './RegisteredCard.module.scss';
import { Link } from "react-router-dom";
const RegisteredCard = () => {

    return (

            <div className={Styles.parentRegisteredCard}>
            <Card className={Styles.registeredCard}>
                <div className={Styles.discriptionRegistered}>
                <h3>Registered Users</h3>
                <p> Already registered users can sign in and start connecting with friends or connect with starngers anonymously.   </p>
                </div>
                    <Link to="/login">
                <Button className={Styles.buttonLogin} color='transparent'>
                    Login
                </Button>
                </Link>
                      <Link to="/signup">
                <Button className={Styles.buttonSignup} color='transparent'>
                    Sign Up
                </Button>
                </Link>
            </Card>

        </div>

    );
}
export default RegisteredCard;
