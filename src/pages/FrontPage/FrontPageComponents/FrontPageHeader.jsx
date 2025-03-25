import dndLogo from '../../../assets/images/dnd-logo2.png';
import './FrontPageHeader.css'

/**
 * FrontPageHeader is a component that renders the header for the FrontPage.
 * It displays a logo and a title.
 * 
 * @component
 * @returns {JSX.Element} The rendered header with a logo and a title.
 */
function FrontPageHeader() {
    return(
        <div className="header-wrapper">
            <header className="header-content">
                <img src={dndLogo} alt="D&D Logo" className="dnd-logo-front" />
                <h1 className='front-header-text'>Character Builder</h1>
            </header>
        </div>
    );
}

export default FrontPageHeader;