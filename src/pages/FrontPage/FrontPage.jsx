import './FrontPage.css';
import FrontPageHeader from './FrontPageComponents/FrontPageHeader';
import CharacterBrowser from './FrontPageComponents/CharacterBrowser';
import MainFront from './FrontPageComponents/MainFront';
import backgroundImg from '../../assets/images/front-background.jpg';
import { useEffect, useState } from 'react';

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