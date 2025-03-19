import {Link} from 'react-router-dom'
import logo from '../../../../assets/images/dnd-logo.png';


function CreateCharHeader()
{


    return(
        <>
        <div className="createHeader-wrapper">
            <header className="createPageHeader">
                <img src={logo} alt="Logo" className="createPage-logo"/>
                <Link to={"/"}>
                <button className="createButton" id="createHeaderButton">Home</button>
                </Link>
                
                <h1 className="createPageH1">Create your character!</h1>
            </header>
        </div>

        </>
    )
}
export default CreateCharHeader;