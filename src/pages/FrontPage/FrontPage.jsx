import './FrontPage.css';
import FrontPageHeader from './FrontPageComponents/FrontPageHeader';
import CharacterBrowser from './FrontPageComponents/CharacterBrowser';
import MainFront from './FrontPageComponents/MainFront';

function FrontPage({currentCharacterList}) {
    return (
        <>
            <div id='frontpage-wrapper'>
                <FrontPageHeader />
                <div id='main-section-wrapper'>
                    <CharacterBrowser 
                    characterList= {currentCharacterList} />
                    <MainFront />
                </div>
            </div>
        </>
    );
}
export default FrontPage;