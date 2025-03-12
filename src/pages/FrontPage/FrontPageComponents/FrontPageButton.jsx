import {Link} from 'react-router-dom'

function FrontPageButton({url, text}) {
    return (
        <Link to={url}>
            <button className='front-page-button'>{text}</button>
        </Link>
        );
}

export default FrontPageButton;