import dndLogo from '../../../assets/images/dnd-logo2.png';
import './FrontPageHeader.css'

function FrontPageHeader() {
    return(
        <div className="header-wrapper">
            <header className="header-content">
                <img src={dndLogo} alt="D&D Logo" className="dnd-logo-front" />
                <h1 className='front-header-text'>Dungeons & Dragons - Character Builder</h1>
            </header>
        </div>
    );
}

export default FrontPageHeader;