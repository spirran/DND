import './FrontPage.css';
import Header from './FrontPageComponents/FrontPageHeader';
import CharacterBrowser from './FrontPageComponents/CharacterBrowser';
import MainFront from './FrontPageComponents/MainFront';


function FrontPage() {
    return (
        <>
            <Header />
            <div id='main-section-wrapper'>
                <CharacterBrowser />
                <MainFront />
            </div>
        </>
    );
}

export default FrontPage;