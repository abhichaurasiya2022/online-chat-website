import React from 'react';
import { Button, Card } from 'reactstrap';
import Styles from './TermsAndConditions.module.scss'
const TermsAndConditions = () => {

    return (

        <div className={Styles.parentTermsAndConditions}>

        <Card className={Styles.termsAndConditionsCard}>
                <div className={Styles.discriptionTermsAndConditions}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros elit, interdum sed dolor et, tincidunt porttitor purus. Aliquam orci tellus, porta et tortor nec, tempor commodo orci</div>
        </Card>
        </div>

    );
}
export default TermsAndConditions;