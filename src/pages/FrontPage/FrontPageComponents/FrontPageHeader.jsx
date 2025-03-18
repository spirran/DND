import logo from '../../../assets/react.svg';

function FrontPageHeader() {
    return(
        <div className="header-wrapper">
            <header>
                <img src={logo} alt="Logo" className="front-logo"/>
                <h1>D&D Character Builder</h1>
            </header>
        </div>
    );
}

export default FrontPageHeader;