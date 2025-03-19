import './FrontPage.css';
import FrontPageHeader from './FrontPageComponents/FrontPageHeader';
import CharacterBrowser from './FrontPageComponents/CharacterBrowser';
import MainFront from './FrontPageComponents/MainFront';

function FrontPage({currentCharacter}) {
    console.log("character:" + currentCharacter);
    return (
        <>
            <div id='frontpage-wrapper'>
                <FrontPageHeader />
                <div id='main-section-wrapper'>
                    <CharacterBrowser 
                    character= {currentCharacter} />
                    <MainFront />
                </div>
                <button onClick = {()=>testFunction({currentCharacter})}>TEST BUTTON</button>
            </div>
        </>
    );
}

function testFunction(character)
{
    console.log(character);
}

export default FrontPage;