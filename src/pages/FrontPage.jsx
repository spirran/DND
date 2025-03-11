import './FrontPage.css';

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
            
        </div>
    );
}

function FrontPage() {
    return (
        <>
            <Header />
            <CharacterBrowser />
        </>
    );
}

export default FrontPage;