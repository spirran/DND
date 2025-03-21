import FrontPageButton from './FrontPageButton';
import backgroundImg from '../../../assets/images/front-background.jpg';
import React from 'react';

function MainFront() {
    return (
        <div className='main-front-wrapper' style={{ backgroundImage: `url(${backgroundImg})` }}>
            
            <FrontPageButton text={"Create New Character"} url={"/CreateChar"} />
            <FrontPageButton text={"Dice Roller"} url={"/DiceRoller"}/>
            
        </div>
    );
}

export default MainFront;