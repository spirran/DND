import './FrontPage.css';
import FrontPageHeader from './FrontPageComponents/FrontPageHeader';
import CharacterBrowser from './FrontPageComponents/CharacterBrowser';
import MainFront from './FrontPageComponents/MainFront';
import backgroundImg from '../../assets/images/front-background.jpg';
import { useEffect, useState } from 'react';

/**
 * FrontPage is a component that renders the complete view of the FrontPage.
 * I consists of a header, a character browser and section with navigation buttons.
 * 
 * @param {Object} param0 - The props for the FrontPage component
 * @param {Array} param0.currentCharacterList - The list of characters to display.
 * @returns {JSX.Element} The rendered FrontPage with all sections.
 */

function FrontPage({currentCharacterList}) {
    // Local state to force refresh when character change
    const [characters, setCharacters] = useState(currentCharacterList);
    
    // Update when prop changes
    useEffect(() => {
        setCharacters(currentCharacterList);
    }, [currentCharacterList]);
    
    // Listen for storage events to handle changes
    useEffect(() => {
        const handleStorageChange = () => {
            // force rerender with the latest data
            setCharacters([...currentCharacterList]);
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [currentCharacterList]);

    return (
        <>
            <div id='frontpage-wrapper' >
                <FrontPageHeader />
                <div id='main-section-wrapper' style={{ backgroundImage: `url(${backgroundImg})` }}>
                    <CharacterBrowser characterList={characters} />
                    <MainFront />
                </div>
            </div>
        </>
    );
}
export default FrontPage;