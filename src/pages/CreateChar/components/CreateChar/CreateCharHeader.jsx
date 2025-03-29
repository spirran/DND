import { Link } from 'react-router-dom'
import logo from '../../../../assets/images/dnd-logo2.png';

/**
 * CreateCharHeader React Component
 * 
 * This component renders the header for the character creation page. Including a logo, title, and a button to navigate back to the home page.
 * @component
 * @returns {JSX.Element} The CreateCharHeader component.
 */
function CreateCharHeader() {


    return (
        <>
            <div className="createHeader-wrapper">
                <header className="createPageHeader">
                    <img src={logo} alt="Logo" className="createPage-logo" />
                    <h1 className="createPageH1">CREATE YOUR CHARACTER!</h1>
                    <Link to={"/"}>
                        <button className="createButton" id="createHeaderButton">Home</button>
                    </Link>
                </header>
            </div>

        </>
    )
}
export default CreateCharHeader;