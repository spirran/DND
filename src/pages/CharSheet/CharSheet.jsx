import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CharSheetFront from './CharSheetFront';
import CharSheetBack from './CharSheetBack';
import { DEFAULT_CHARACTER, loadCharacterFromBrowser } from './utils/CharModel';
import { calculateProficiencyBonus, getAbilityModifier } from './utils/CharUtils';
import { saveCharacter, deleteCharacter } from './utils/CharStorage';

import './styles/CharSheet.css';
import './styles/CharSheetFront.css';
import './styles/CharSheetBack.css';

// NavButton component
function NavButton({ url, text }) {
  return (
    <Link to={url}>
      <button className='nav-button'>{text}</button>
    </Link>
  );
}

function CharSheet() {
  const location = useLocation();
  const characterFromBrowser = location.state?.character;
  const [showFrontside, setShowFrontside] = useState(true);
  const [character, setCharacter] = useState(DEFAULT_CHARACTER);
  const [portraitUrl, setPortraitUrl] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);

  // Load character from browser data
  useEffect(() => {
    if (characterFromBrowser) {
      const updatedCharacter = loadCharacterFromBrowser(characterFromBrowser);
      setCharacter(updatedCharacter);
      setPortraitUrl(characterFromBrowser.img || '');
    }
  }, [characterFromBrowser]);

  // sync portraitUrl state with character state
  useEffect(() => {
    setPortraitUrl(character.portraitUrl);
  }, [character.portraitUrl]);

  // Handle page flip animation
  const flipPage = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowFrontside(!showFrontside);
      setIsFlipping(false);
    }, 300);
  };

  // Enhanced handleInputChange function to handle nested objects
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested properties
    if (name.includes('.')) {
      const parts = name.split('.');
      const [parent, ...nestedProps] = parts;

      setCharacter(prevCharacter => {
        // Create a deep copy of the parent object
        const newParentObject = JSON.parse(JSON.stringify(prevCharacter[parent] || {}));

        // Navigate to the correct nested property
        let currentObj = newParentObject;
        for (let i = 0; i < nestedProps.length - 1; i++) {
          if (!currentObj[nestedProps[i]]) {
            currentObj[nestedProps[i]] = {};
          }
          currentObj = currentObj[nestedProps[i]];
        }

        // Set the value
        const lastProp = nestedProps[nestedProps.length - 1];
        currentObj[lastProp] = type === 'checkbox' ? checked : value;

        // Return the updated state
        return {
          ...prevCharacter,
          [parent]: newParentObject
        };
      });
    } else {
      // Handle non-nested properties as before
      setCharacter(prevCharacter => ({
        ...prevCharacter,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Calculate saving throw bonus
  const getSavingThrowBonus = (ability) => {
    const abilityMod = getAbilityModifier(character[ability]);
    const isProficient = character[`${ability}Save`];

    return isProficient
      ? abilityMod + parseInt(character.proficiencyBonus)
      : abilityMod;
  };

  // Calculate skill bonus
  const getSkillBonus = (skillName, abilityName) => {
    const abilityMod = getAbilityModifier(character[abilityName]);
    const isProficient = character[skillName];

    return isProficient
      ? abilityMod + parseInt(character.proficiencyBonus)
      : abilityMod;
  };

  // Parse class and level from combined input
  const handleClassLevelChange = (e) => {
    const value = e.target.value;

    // extract level from the end of the string
    const match = value.match(/^(.*?)\s+(\d+)$/);

    if (match) {
      // if match, extract class and level
      const className = match[1].trim();
      const levelValue = parseInt(match[2], 10);
      const newProficiencyBonus = calculateProficiencyBonus(levelValue);

      setCharacter({
        ...character,
        class: className,
        level: levelValue,
        proficiencyBonus: newProficiencyBonus
      });
    } else {
      // If no level is found, assume it's all class name
      setCharacter({
        ...character,
        class: value,
      });
    }
  };

  // Handle level up button
  const handleLevelUp = () => {
    // Increases level by 1, up to 20
    const newLevel = Math.min(parseInt(character.level) + 1, 20);

    // Calculate new proficiency bonus
    const newProficiencyBonus = calculateProficiencyBonus(newLevel);

    // Updates with new level and proficiency bonus
    setCharacter({
      ...character,
      level: newLevel,
      proficiencyBonus: newProficiencyBonus
    });

    // level notification
    alert(`${character.name} leveled up to level ${newLevel}!`);
  };

  // Update portrait URL in state
  const handlePortraitUrlChange = (e) => {
    setPortraitUrl(e.target.value);
  };

  // Apply portrait URL to character
  const applyPortraitUrl = () => {
    setCharacter({
      ...character,
      portraitUrl: portraitUrl
    });
  };

  // Handle portrait error
  const handlePortraitError = () => {
    alert('Error loading image. Please paste in a working address.');
    setPortraitUrl('');
    setCharacter({
      ...character,
      portraitUrl: ''
    });
  };

  // Delete character from storage
  const handleDeleteCharacter = () => {
    if (!characterFromBrowser) return;
    
    if (window.confirm(`Are you sure you want to delete ${character.name}?`)) {
      const success = deleteCharacter(characterFromBrowser.name);
      
      if (success) {
        alert(`Character ${characterFromBrowser.name} has been deleted. Use the Home button to return to the character list.`);
      } else {
        alert("There was an error deleting the character. Please try again.");
      }
    }
  };

  // Save character to storage
  const handleSaveCharacter = () => {
    const message = saveCharacter(
      character, 
      portraitUrl, 
      characterFromBrowser?.name || ''
    );
    
    alert(message);
  };

  return (
    <div className="char-sheet-page">
      <div className="nav-buttons">
        <NavButton url="/" text="Home" />
        <NavButton url="/CreateChar" text="Create New Character" />
        <NavButton url="/DiceRoller" text="Dice Roller" />
      </div>

      <div className={`character-sheet-container ${isFlipping ? 'flipping' : ''}`}>
        {showFrontside ? (
          <CharSheetFront 
            character={character}
            portraitUrl={portraitUrl}
            handleInputChange={handleInputChange}
            handleClassLevelChange={handleClassLevelChange}
            handleLevelUp={handleLevelUp}
            handlePortraitUrlChange={handlePortraitUrlChange}
            applyPortraitUrl={applyPortraitUrl}
            handlePortraitError={handlePortraitError}
            getSavingThrowBonus={getSavingThrowBonus}
            getSkillBonus={getSkillBonus}
            flipPage={flipPage}
          />
        ) : (
          <CharSheetBack
            character={character}
            handleInputChange={handleInputChange}
            onFlip={flipPage}
          />
        )}
      </div>

      <div className="action-buttons">
        <NavButton url="/" text="Home" />
        <button className="save-button" onClick={handleSaveCharacter}>Save Character</button>
        <button className="delete-button" onClick={handleDeleteCharacter}>Delete Character</button>
      </div>
    </div>
  );
}

export default CharSheet;