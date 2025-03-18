import logo from '../../../assets/images/Dnd_(5).png';

function FrontPageHeader() {
    return(
        <div className="header-wrapper">
            <header className="header-content">
                <img src={logo} alt="Logo" className="front-logo"/>
                <h1>D&D Character Builder</h1>
            </header>
        </div>
    );
}

export default FrontPageHeader;