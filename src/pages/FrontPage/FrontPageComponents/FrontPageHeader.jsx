import logo from '../../../assets/images/dnd-logo.png';

function FrontPageHeader() {
    return(
        <div className="header-wrapper">
            <header className="header-content">
                <img src={logo} alt="Logo" className="front-logo"/>
                <h1>Dungeons & Dragons - Character Builder</h1>
            </header>
        </div>
    );
}

export default FrontPageHeader;