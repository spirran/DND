import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './CharacterBrowser.css'

/**
 * CharacterBrowser is a component that renders a sidebar on the left side of FrontPage that lists characters.
 * It uses the 'characterList' prop to load characters or loads characters from localStorage as a fallback.
 * It listens for changes to localStorage and updates the list.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.characterList - The list of characters displayed. If not provided it tries to load the characters from localStorage as a fallback.
 * @returns {JSX.Element} The rendered sidebar with character links.
 */
function CharacterBrowser({ characterList }) {
  const [characters, setCharacters] = useState([]);
  //const [refreshKey, setRefreshKey] = useState(0);
  
  // Load characters from localStorage and props
  useEffect(() => {
    // First try to use the prop
    if (characterList && characterList.length > 0) {
      setCharacters(characterList);
    } else {
      // If prop is empty, try to get from localStorage as fallback
      try {
        const savedCharactersJSON = localStorage.getItem('characterList');
        if (savedCharactersJSON) {
          const savedCharacters = JSON.parse(savedCharactersJSON);
          setCharacters(savedCharacters);
        }
      } catch (error) {
        console.error("Error loading characters from localStorage:", error);
      }
    }
  }, [characterList]);
  
  // Listen for storage events to refresh the component
  useEffect(() => {
    const handleStorageChange = (event) => {
      // Check if the change is relevant to our component
      if (event.key === 'characterList' || 
          event.key === 'deleteCharacter' || 
          event.key === 'updatedCharacter') {
        const savedCharactersJSON = localStorage.getItem('characterList');
        if(savedCharactersJSON) {
          const savedCharacters = JSON.parse(savedCharactersJSON);
          setCharacters(savedCharacters)
        }
        // Force re-render when relevant localStorage changes
        //setRefreshKey(prevKey => prevKey + 1);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also set up a periodic refresh to catch any missed updates
    /*const intervalId = setInterval(() => {
      setRefreshKey(prevKey => prevKey + 1);
    }, 2000);*/
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      //clearInterval(intervalId);
    };
  }, []);

  if (characters.length === 0) {
    return (
    <div className="browser-wrapper">
      <p>No characters created yet</p>
    </div>
    )
  }

  return (
      <div className='browser-wrapper'>
        <h2>Characters</h2>
        {characters.map((char, index) => (
          <Link key={`${index}-${char.name}`}
           className="browser-card"
           to={`/CharSheet`}
           state={{ character: char }}
           >
              <img 
                src={char.img} 
                alt={char.name} 
                className="browser-portrait" 
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=No+Image";
                }}
              />
              <div className="hidden-text-wrapper">
                <p className="hidden-text">{char.name}</p>
                <p className="hidden-text">Level {char.level}</p>
                <p className="hidden-text">{char.class}</p>
              </div>
            </Link>
        ))}
      </div>
  );
}

export default CharacterBrowser;