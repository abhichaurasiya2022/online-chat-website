import React from 'react';
import { Button, Card, CardHeader } from 'reactstrap';
import Styles from './Header.module.scss'
const Header = () => {

    return(

        <div className={Styles.parentHeader}>
        <Card className={Styles.headerCard}>
            <CardHeader className={Styles.header}>
                <img src="/logo.png"width={60} height={50} className={Styles.logoHeader}/>
                    <div className={Styles.titleHeader}>Online-Chat-Website</div>

            </CardHeader>
        </Card>
        </div>

    );
}
export default Header;
