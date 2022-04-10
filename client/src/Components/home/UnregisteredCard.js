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
                <div className={Styles.discriptionUnregistered}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros elit, interdum sed dolor et, tincidunt porttitor purus. Aliquam orci tellus, porta et tortor nec, tempor commodo orci. Etiam est orci, euismod et sapien cursus, volutpat vestibulum mauris. Aliquam ante ex, dictum sit amet arcu ut, vestibulum consequat mauris. Maecenas ornare, risus et blandit dictum, nibh odio fringilla arcu, eu tempor augue tellus vitae enim. Morbi laoreet eu ex eu fringilla. Praesent gravida rhoncus ante et sollicitudin. In tristique ipsum urna, ac </div>
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
