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

/**
 * Navigation button component for character sheet
 * @param {Object} props - Component props
 * @param {string} props.url - Navigation URL
 * @param {string} props.text - Button text
 * @returns {JSX.Element} Navigation button
 */
function NavButton({ url, text }) {
  return (
    <Link to={url}>
      <button className='nav-button'>{text}</button>
    </Link>
  );
}

/**
 * Character sheet component for displaying and editing character information
 * @returns {JSX.Element} Character sheet page
 */
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

  useEffect(() => {
    if (characterFromBrowser) {
      const updatedCharacter = loadCharacterFromBrowser(characterFromBrowser);
      setCharacter(updatedCharacter);
      setPortraitUrl(characterFromBrowser.img || '');
    }
  }, [characterFromBrowser]);

  useEffect(() => {
    setPortraitUrl(character.portraitUrl);
  }, [character.portraitUrl]);

  /**
   * Handles the character sheet flip animation
   */
  const flipPage = () => {
    flipSoundRef.current.currentTime = 0;
    flipSoundRef.current.play().catch(err => {
      console.error("Error playing flip sound:", err);
    });
    setIsFlipping(true);
    setTimeout(() => {
      setShowFrontside(!showFrontside);
      setIsFlipping(false);
    }, 300);
  };

  /**
   * Handles input changes for character properties
   * @param {Object} e - Event object
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const parts = name.split('.');
      const [parent, ...nestedProps] = parts;

      setCharacter(prevCharacter => {
        const newParentObject = JSON.parse(JSON.stringify(prevCharacter[parent] || {}));

        let currentObj = newParentObject;
        for (let i = 0; i < nestedProps.length - 1; i++) {
          if (!currentObj[nestedProps[i]]) {
            currentObj[nestedProps[i]] = {};
          }
          currentObj = currentObj[nestedProps[i]];
        }

        const lastProp = nestedProps[nestedProps.length - 1];
        currentObj[lastProp] = type === 'checkbox' ? checked : value;

        return {
          ...prevCharacter,
          [parent]: newParentObject
        };
      });
    } else {
      setCharacter(prevCharacter => ({
        ...prevCharacter,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  /**
   * Calculates saving throw bonus for a given ability
   * @param {string} ability - Ability name
   * @returns {number} Saving throw bonus
   */
  const getSavingThrowBonus = (ability) => {
    const abilityMod = getAbilityModifier(character[ability]);
    const isProficient = character[`${ability}Save`];

    return isProficient
      ? abilityMod + parseInt(character.proficiencyBonus)
      : abilityMod;
  };

  /**
   * Calculates skill bonus based on ability and proficiency
   * @param {string} skillName - Skill name
   * @param {string} abilityName - Associated ability name
   * @returns {number} Skill bonus
   */
  const getSkillBonus = (skillName, abilityName) => {
    const abilityMod = getAbilityModifier(character[abilityName]);
    const isProficient = character[skillName];

    return isProficient
      ? abilityMod + parseInt(character.proficiencyBonus)
      : abilityMod;
  };

  /**
   * Handles changes to the class and level field
   * @param {Object} e - Event object
   */
  const handleClassLevelChange = (e) => {
    const value = e.target.value;

    const match = value.match(/^(.*?)\s+(\d+)$/);

    if (match) {
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
      setCharacter({
        ...character,
        class: value,
      });
    }
  };

  /**
   * Handles level up action with animations and sound effects
   */
  const handleLevelUp = () => {
    levelSoundRef.current.currentTime = 0;
    levelSoundRef.current.play().catch(err => {
      console.error("Error playing sound:", err);
    });

    const nextLevel = Math.min(parseInt(character.level) + 1, 20);
    const newProficiencyBonus = calculateProficiencyBonus(nextLevel);

    setCharacter({
      ...character,
      level: nextLevel,
      proficiencyBonus: newProficiencyBonus
    });

    setNewLevel(nextLevel);
    setShowFireworks(true);
    setButtonAnimating(true);
    
    setTimeout(() => {
      setButtonAnimating(false);
    }, 1200);

    setTimeout(() => {
      alert(`${character.name} has reached level ${nextLevel}!`);
    }, 2000);
  };

  /**
   * Handles fireworks animation completion
   */
  const handleFireworksComplete = () => {
    setShowFireworks(false);
    setNewLevel(null);
  };

  /**
   * Updates portrait URL in state
   * @param {Object} e - Event object
   */
  const handlePortraitUrlChange = (e) => {
    setPortraitUrl(e.target.value);
  };

  /**
   * Applies portrait URL to character
   */
  const applyPortraitUrl = () => {
    setCharacter({
      ...character,
      portraitUrl: portraitUrl
    });
  };

  /**
   * Handles portrait loading error
   */
  const handlePortraitError = () => {
    alert('Error loading image. Please paste in a working address.');
    setPortraitUrl('');
    setCharacter({
      ...character,
      portraitUrl: ''
    });
  };

  /**
   * Deletes character from storage after confirmation
   */
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

  /**
   * Saves character to storage
   */
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