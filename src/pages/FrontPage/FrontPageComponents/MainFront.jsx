import FrontPageButton from './FrontPageButton';
import React from 'react';
import './MainFront.css'

/**
 * MainFront is a component that renders the main section of FrontPage.
 * Renders two navigation buttons that link to two different sections of the app.
 * 
 * @component
 * @returns {JSX.Element} The rendered main section with navigation buttons.
 */
function MainFront() {
    return (
        <div className='main-front-wrapper' >
            
            <FrontPageButton text={"Create New Character"} url={"/CreateChar"} />
            <FrontPageButton text={"Dice Roller"} url={"/DiceRoller"}/>
            
        </div>
    );
}

export default MainFront;