import React, { useContext, useState } from "react";
import ReactDOM from 'react-dom';
import { Button, Card } from 'reactstrap';
import Styles from './UnregisteredCard.module.scss'
import App from '../../unregisteredPage';
import { Link } from "react-router-dom";



const UnregisteredCard = () => {

    return (

        <div className={Styles.parentUnregisteredCard}>
            <Card className={Styles.unregisteredCard}>
                <div className={Styles.discriptionUnregistered}>
                <h3>Unregistered Users</h3>
                <p> Unregistered users can directly start chatting and playing with starngers complete anonymously </p>
                 </div>
                  <Link to="/unregisteredPage">
                <Button className={Styles.buttonTakeMeThere} color='transparent' >
                    Take Me There !
                </Button>
</Link>
            </Card>

        </div>

    );
}
export default UnregisteredCard;
