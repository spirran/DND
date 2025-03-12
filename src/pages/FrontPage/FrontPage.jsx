import './FrontPage.css';
import {Link} from 'react-router-dom'

function Header() {
    return(
    <>
        <div className="header-wrapper">
            <header>
                <h1>D&D Character Builder</h1>
            </header>
        </div>
    </>
    );
}

function CharacterBrowser() {
    return (
        <>
            <div className='browser-wrapper'>

            </div>
        </>
    );
}

function MainFront() {
    return (
        <div className='main-front-wrapper'>
            
                <FrontPageButton text={"Character Builder"} url={"/CreateChar"} />
                <FrontPageButton text={"Dice Roller"} url={"/DiceRoller"}/>
            
        </div>
    );
}

function FrontPageButton({url, text}) {
    return (
        <Link to={url}>
            <button className='front-page-button'>{text}</button>
        </Link>
        );
}

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