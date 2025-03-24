import {Link} from 'react-router-dom'
import React from 'react';
import './FrontPageButton.css'

/**
 * FrontPageButton is a component that renders a navigation button.
 * When clicked it sends you to a specified URL.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.url - The URL to navigate to when button is clicked.
 * @param {string} props.text - The text displayed on the button.
 * @returns {JSX.Element} The rendered navigation button.
 */
function FrontPageButton({url, text}) {
    return (
        <Link to={url}>
            <button className='front-page-button'><p className='front-button-text'>{text}</p></button>
        </Link>
        );
}

export default FrontPageButton;