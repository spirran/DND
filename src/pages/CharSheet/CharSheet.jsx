import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CharSheetFront from './CharSheetFront';
import CharSheetBack from './CharSheetBack';
import FireworksEffects from './components/FireworksEffects';
import { DEFAULT_CHARACTER, loadCharacterFromBrowser } from './utils/CharModel';
import { calculateProficiencyBonus, getAbilityModifier } from './utils/CharUtils';
import { saveCharacter, deleteCharacter } from './utils/CharStorage';

import levelUpSound from '../../assets/sounds/level-up.mp3';
import flipSheetSound from '../../assets/sounds/sheet-flip.mp3';

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
  const [showFireworks, setShowFireworks] = useState(false);
  const [buttonAnimating, setButtonAnimating] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const levelSoundRef = useRef(new Audio(levelUpSound));
  const flipSoundRef = useRef(new Audio(flipSheetSound));

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

  // Handle flip animation
  const flipPage = () => {
    // flip sound
    flipSoundRef.current.currentTime = 0; // reset sound
    flipSoundRef.current.play().catch(err => {
      console.error("Error playing flip sound:", err);
    });
    setIsFlipping(true);
    setTimeout(() => {
      setShowFrontside(!showFrontside);
      setIsFlipping(false);
    }, 300);
  };

  // handleInputChange function for nested objects
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // handle nested props
    if (name.includes('.')) {
      const parts = name.split('.');
      const [parent, ...nestedProps] = parts;

      setCharacter(prevCharacter => {
        // create copy
        const newParentObject = JSON.parse(JSON.stringify(prevCharacter[parent] || {}));

        // navigate to nested property
        let currentObj = newParentObject;
        for (let i = 0; i < nestedProps.length - 1; i++) {
          if (!currentObj[nestedProps[i]]) {
            currentObj[nestedProps[i]] = {};
          }
          currentObj = currentObj[nestedProps[i]];
        }

        // set value and return to updated state
        const lastProp = nestedProps[nestedProps.length - 1];
        currentObj[lastProp] = type === 'checkbox' ? checked : value;

        return {
          ...prevCharacter,
          [parent]: newParentObject
        };
      });
    } else {
      // handle non-nested prop
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

  // parse class and level from input
  const handleClassLevelChange = (e) => {
    const value = e.target.value;

    // extract level from string
    const match = value.match(/^(.*?)\s+(\d+)$/);

    if (match) {
      // extract class and level
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
      // If no level found, assume class only
      setCharacter({
        ...character,
        class: value,
      });
    }
  };

  // handle level up button (cool fireworks edition)
  const handleLevelUp = () => {
    // play level up sound
    levelSoundRef.current.currentTime = 0; // Reset sound to start
    levelSoundRef.current.play().catch(err => {
      console.error("Error playing sound:", err);
    });

    // increases level by 1, up to max 20
    const nextLevel = Math.min(parseInt(character.level) + 1, 20);

    // calc new proficiency bonus
    const newProficiencyBonus = calculateProficiencyBonus(nextLevel);

    // updates with new level and proficiency bonus
    setCharacter({
      ...character,
      level: nextLevel,
      proficiencyBonus: newProficiencyBonus
    });

    // Store the new level for display
    setNewLevel(nextLevel);

    // Trigger fireworks animation
    setShowFireworks(true);

    // Animate the button
    setButtonAnimating(true);
    setTimeout(() => {
      setButtonAnimating(false);
    }, 1200);

    // Show level notification after a delay to allow animations to be noticed first
    setTimeout(() => {
      alert(`${character.name} has reached level ${nextLevel}!`);
    }, 2000);
  };

  // handelr fireworks completion
  const handleFireworksComplete = () => {
    setShowFireworks(false);
    setNewLevel(null);
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
      <FireworksEffects
        active={showFireworks}
        onComplete={handleFireworksComplete}
        level={newLevel}
      />

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
            buttonAnimating={buttonAnimating}
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