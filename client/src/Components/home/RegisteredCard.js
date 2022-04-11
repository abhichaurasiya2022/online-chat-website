import React from 'react';
import { Button, Card } from 'reactstrap';
import Styles from './RegisteredCard.module.scss';
import { Link } from "react-router-dom";

const RegisteredCard = () => {

    return (

            <div className={Styles.parentRegisteredCard}>
            <Card className={Styles.registeredCard}>
                <div className={Styles.discriptionRegistered}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros elit, interdum sed dolor et, tincidunt porttitor purus. Aliquam orci tellus, porta et tortor nec, tempor commodo orci. Etiam est orci, euismod et sapien cursus, volutpat vestibulum mauris. Aliquam ante ex, dictum sit amet arcu ut, vestibulum consequat mauris. Maecenas ornare, risus et blandit dictum, nibh odio fringilla arcu, eu tempor augue tellus vitae enim. Morbi laoreet eu ex eu fringilla. Praesent gravida rhoncus ante et sollicitudin. In tristique ipsum urna, ac </div>
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
