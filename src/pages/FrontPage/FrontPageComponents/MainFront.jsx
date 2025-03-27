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
        <div className='main-front-wrapper'>
            <div className='mainfront-text-wrapper'>
                <p>Build your own character and start your adventure!<br />
                    Click on a character portrait and get transported directly to a character sheet.<br />
                    Forgot your dice? We got you covered with our Dice Roller.
                </p>
            </div>
            <div className='main-front-button-wrapper' >
                <FrontPageButton text={"Create New Character"} url={"/CreateChar"} />
                <FrontPageButton text={"Dice Roller"} url={"/DiceRoller"}/>              
            </div>
        </div>
    );
}

export default MainFront;