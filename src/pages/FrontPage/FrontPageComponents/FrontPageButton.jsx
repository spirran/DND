import {Link} from 'react-router-dom'
import React from 'react';
import './FrontPageButton.css'

function FrontPageButton({url, text}) {
    return (
        <Link to={url}>
            <button className='front-page-button'><p className='front-button-text'>{text}</p></button>
        </Link>
        );
}

export default FrontPageButton;