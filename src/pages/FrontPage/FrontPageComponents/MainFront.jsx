import FrontPageButton from './FrontPageButton';
import React from 'react';

function MainFront() {
    return (
        <div className='main-front-wrapper' >
            
            <FrontPageButton text={"Create New Character"} url={"/CreateChar"} />
            <FrontPageButton text={"Dice Roller"} url={"/DiceRoller"}/>
            
        </div>
    );
}

export default MainFront;