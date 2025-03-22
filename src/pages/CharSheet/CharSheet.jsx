import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dndLogo from '../../assets/images/dnd-logo2.png';


import './CharSheet.css';

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

  // Default character state
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    level: 1,
    background: '',
    race: '',
    alignment: '',
    experiencePoints: 0,
    portraitUrl: '',

    // proficiency bonus
    proficiencyBonus: 2,

    // ability scores
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,

    // saving throws proficiencies
    strengthSave: false,
    dexteritySave: false,
    constitutionSave: false,
    intelligenceSave: false,
    wisdomSave: false,
    charismaSave: false,

    // skills
    acrobatics: false,
    animalHandling: false,
    arcana: false,
    athletics: false,
    deception: false,
    history: false,
    insight: false,
    intimidation: false,
    investigation: false,
    medicine: false,
    nature: false,
    perception: false,
    performance: false,
    persuasion: false,
    religion: false,
    sleightOfHand: false,
    stealth: false,
    survival: false,

    // stats
    armorClass: 10,
    initiative: 0,
    speed: 30,
    hitPointMaximum: 10,
    currentHitPoints: 10,
    temporaryHitPoints: 0,

    // equipment
    equipment: '',

    // features & traits
    featuresAndTraits: '',

    // notes
    notes: '',
  });

  // state for portrait URL
  const [portraitUrl, setPortraitUrl] = useState('');

  // Initialize from created char
  useEffect(() => {
    if (characterFromBrowser) {
      // default char copy
      const updatedCharacter = { ...character };

      // Basic character info
      updatedCharacter.name = characterFromBrowser.name || '';
      updatedCharacter.class = characterFromBrowser.class || '';
      updatedCharacter.level = characterFromBrowser.level || 1;
      updatedCharacter.race = characterFromBrowser.race || '';
      updatedCharacter.alignment = characterFromBrowser.alignment || '';
      updatedCharacter.background = characterFromBrowser.background || '';
      updatedCharacter.experiencePoints = characterFromBrowser.experiencePoints || 0;
      updatedCharacter.portraitUrl = characterFromBrowser.img || '';

      // Proficiency bonus
      updatedCharacter.proficiencyBonus = characterFromBrowser.proficiencyBonus || 2;

      // map attributes array
      if (characterFromBrowser.attributes && characterFromBrowser.attributes.length >= 6) {
        updatedCharacter.strength = characterFromBrowser.attributes[0];
        updatedCharacter.dexterity = characterFromBrowser.attributes[1];
        updatedCharacter.constitution = characterFromBrowser.attributes[2];
        updatedCharacter.intelligence = characterFromBrowser.attributes[3];
        updatedCharacter.wisdom = characterFromBrowser.attributes[4];
        updatedCharacter.charisma = characterFromBrowser.attributes[5];
      }

      // Skills
      if (characterFromBrowser.skills) {
        Object.keys(characterFromBrowser.skills).forEach(key => {
          if (updatedCharacter.hasOwnProperty(key)) {
            updatedCharacter[key] = characterFromBrowser.skills[key];
          }
        });
      }

      // Saving Throws
      if (characterFromBrowser.saves) {
        Object.keys(characterFromBrowser.saves).forEach(key => {
          if (updatedCharacter.hasOwnProperty(key)) {
            updatedCharacter[key] = characterFromBrowser.saves[key];
          }
        });
      }

      // Combat Stats
      if (characterFromBrowser.combatStats) {
        Object.keys(characterFromBrowser.combatStats).forEach(key => {
          if (updatedCharacter.hasOwnProperty(key)) {
            updatedCharacter[key] = characterFromBrowser.combatStats[key];
          }
        });
      }

      updatedCharacter.equipment = characterFromBrowser.equipment || '';

      updatedCharacter.featuresAndTraits = characterFromBrowser.featuresAndTraits || '';

      updatedCharacter.notes = characterFromBrowser.description || '';

      setCharacter(updatedCharacter);
      setPortraitUrl(characterFromBrowser.img || '');
    }
  }, [characterFromBrowser]);

  // sync portraitUrl state with character state
  useEffect(() => {
    setPortraitUrl(character.portraitUrl);
  }, [character.portraitUrl]);

  // calculate ability modifier
  const getAbilityModifier = (score) => {
    return Math.floor((parseInt(score) - 10) / 2);
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

  // Handle input changes for fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCharacter({
      ...character,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle the combined class and level input
  const handleClassLevelChange = (e) => {
    const value = e.target.value;

    // Try to extract the level from the end of the string (format: "Class Name 5")
    const match = value.match(/^(.*?)\s+(\d+)$/);

    if (match) {
      // If we have a match, extract the class name and level
      const className = match[1].trim();
      const levelValue = parseInt(match[2], 10);

      setCharacter({
        ...character,
        class: className,
        level: levelValue
      });
    } else {
      // If no level is found, assume it's all class name
      setCharacter({
        ...character,
        class: value,
        // Keep the existing level
      });
    }
  };

  const handleLevelUp = () => {
    // Increment level by 1, ensuring it doesn't exceed 20 (max D&D level)
    const newLevel = Math.min(parseInt(character.level) + 1, 20);

    // Update character state with new level
    setCharacter({
      ...character,
      level: newLevel
    });

    // Optional: Show notification to the user
    alert(`${character.name} leveled up to level ${newLevel}!`);
  };

  // handler for portrait URL
  const handlePortraitUrlChange = (e) => {
    setPortraitUrl(e.target.value);
  };

  // apply portrait when done typing
  const applyPortraitUrl = () => {
    setCharacter({
      ...character,
      portraitUrl: portraitUrl
    });
  };



  // delete current character
  const deleteCharacter = () => {
    if (window.confirm(`Are you sure you want to delete ${character.name}?`)) {
      try {
        const savedCharactersJSON = localStorage.getItem('characterList');

        if (savedCharactersJSON) {
          const savedCharacters = JSON.parse(savedCharactersJSON);

          const updatedList = savedCharacters.filter(
            char => char.name !== characterFromBrowser.name
          );

          // Save the updated list back to localStorage
          localStorage.setItem('characterList', JSON.stringify(updatedList));

          // Set deleted flag
          localStorage.setItem('deleteCharacter', characterFromBrowser.name);

          window.dispatchEvent(new Event('storage'));

          alert(`Character ${characterFromBrowser.name} has been deleted. Use the Home button to return to the character list.`);
        }
      } catch (error) {
        console.error("Error deleting character:", error);
        alert("There was an error deleting the character. Please try again.");
      }
    }
  };

  const saveCharacter = () => {

    const skills = {
      acrobatics: character.acrobatics,
      animalHandling: character.animalHandling,
      arcana: character.arcana,
      athletics: character.athletics,
      deception: character.deception,
      history: character.history,
      insight: character.insight,
      intimidation: character.intimidation,
      investigation: character.investigation,
      medicine: character.medicine,
      nature: character.nature,
      perception: character.perception,
      performance: character.performance,
      persuasion: character.persuasion,
      religion: character.religion,
      sleightOfHand: character.sleightOfHand,
      stealth: character.stealth,
      survival: character.survival
    };

    const saves = {
      strengthSave: character.strengthSave,
      dexteritySave: character.dexteritySave,
      constitutionSave: character.constitutionSave,
      intelligenceSave: character.intelligenceSave,
      wisdomSave: character.wisdomSave,
      charismaSave: character.charismaSave
    };

    const combatStats = {
      armorClass: character.armorClass,
      initiative: character.initiative,
      speed: character.speed,
      hitPointMaximum: character.hitPointMaximum,
      currentHitPoints: character.currentHitPoints,
      temporaryHitPoints: character.temporaryHitPoints
    };

    // Create updated char  for character  list
    const updatedCharacter = {
      name: character.name,
      class: character.class,
      level: character.level,
      race: character.race,
      attributes: [
        character.strength,
        character.dexterity,
        character.constitution,
        character.intelligence,
        character.wisdom,
        character.charisma
      ],
      description: character.notes,
      alignment: character.alignment,
      background: character.background,
      experiencePoints: character.experiencePoints,
      proficiencyBonus: character.proficiencyBonus,
      img: portraitUrl,
      skills: skills,
      saves: saves,
      combatStats: combatStats,
      equipment: character.equipment,
      featuresAndTraits: character.featuresAndTraits
    };

    // Save to localStorage
    window.localStorage.setItem('updatedCharacter', JSON.stringify(updatedCharacter));
    window.localStorage.setItem('originalCharacterName', characterFromBrowser?.name || '');

    window.dispatchEvent(new Event('storage'));

    alert('Character saved successfully!');
  };

  const formatModifier = (modifier) => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  return (
    <div className="char-sheet-page">
      <div className="nav-buttons">
        <NavButton url="/" text="Home" />
        <NavButton url="/CreateChar" text="Create New Character" />
        <NavButton url="/DiceRoller" text="Dice Roller" />
      </div>

      <div className="character-sheet">
        <div className="header">
          <div className="header-left">
            <img src={dndLogo} alt="D&D Logo" className="dnd-logo" />
          </div>
          <div className="header-title">CHARACTER SHEET</div>
          <div className="portrait-container">
            <div className="portrait-box">
              {portraitUrl ? (
                <img
                  src={portraitUrl}
                  alt="Character Portrait"
                  className="character-portrait"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                    e.target.style.display = 'none';
                    alert('Error loading image. Please try another URL.');
                    const placeholder = e.target.parentNode.querySelector('.portrait-placeholder');
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="portrait-placeholder">CHARACTER PORTRAIT</div>
              )}
            </div>
            <div className="portrait-url-wrapper">
              <input
                type="text"
                value={portraitUrl}
                onChange={handlePortraitUrlChange}
                onBlur={applyPortraitUrl}
                onKeyDown={(e) => e.key === 'Enter' && applyPortraitUrl()}
                placeholder="Enter image URL"
                className="portrait-url-input"
                tabIndex={0}
              />
            </div>
          </div>
        </div>

        {/* Character Info */}
        <div className="top-section">
          <div className="char-info">
            <div className="char-info-row">
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  value={character.name}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <label>CHARACTER NAME</label>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  name="experiencePoints"
                  value={character.experiencePoints}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <label>EXPERIENCE POINTS</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="characterSubclass"
                  placeholder=""
                  className="input-field"
                  style={{ visibility: 'hidden' }}
                />
                <label style={{ visibility: 'hidden' }}>PLACEHOLDER</label>
              </div>
            </div>

            <div className="char-info-row">
              <div className="input-group">
                <input
                  type="text"
                  name="classAndLevel"
                  value={`${character.class} ${character.level}`}
                  onChange={handleClassLevelChange}
                  className="input-field"
                />
                <label>CLASS & LEVEL</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="background"
                  value={character.background}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <label>BACKGROUND</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="extraField"
                  placeholder=""
                  className="input-field"
                  style={{ visibility: 'hidden' }}
                />
                <label style={{ visibility: 'hidden' }}>PLACEHOLDER</label>
              </div>
            </div>

            <div className="char-info-row">
              <div className="input-group">
                <input
                  type="text"
                  name="race"
                  value={character.race}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <label>RACE</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="alignment"
                  value={character.alignment}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <label>ALIGNMENT</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="extraField2"
                  placeholder=""
                  className="input-field"
                  style={{ visibility: 'hidden' }}
                />
                <label style={{ visibility: 'hidden' }}>PLACEHOLDER</label>
              </div>
            </div>
          </div>
        </div>

        <div className="main-section">
          <div className="left-column">
            {/* Ability Scores */}
            <div className="ability-scores">
              {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((ability) => (
                <div key={ability} className="ability-score">
                  <label className="ability-label">{ability.toUpperCase()}</label>
                  <div className="ability-modifier">
                    {formatModifier(getAbilityModifier(character[ability]))}
                  </div>
                  <input
                    type="number"
                    name={ability}
                    value={character[ability]}
                    onChange={handleInputChange}
                    className="ability-input"
                  />
                </div>
              ))}
            </div>

            {/* Saving Throws */}
            <div className="saving-throws">
              <h3>SAVING THROWS</h3>
              {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((ability) => (
                <div key={ability} className="save-item">
                  <input
                    type="checkbox"
                    id={`save-${ability}`}
                    name={`${ability}Save`}
                    checked={character[`${ability}Save`]}
                    onChange={handleInputChange}
                  />
                  <span className="save-modifier">
                    {formatModifier(getSavingThrowBonus(ability))}
                  </span>
                  <label htmlFor={`save-${ability}`}>{ability.charAt(0).toUpperCase() + ability.slice(1)}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="middle-column">
            {/* Proficiency Bonus */}
            <div className="proficiency-box">
              <div className="proficiency-value">
                <input
                  type="number"
                  name="proficiencyBonus"
                  value={character.proficiencyBonus}
                  onChange={handleInputChange}
                  className="proficiency-input"
                />
              </div>
              <label>PROFICIENCY BONUS</label>
            </div>
            {/* Combat Stats */}
            <div className="combat-stats">
              <div className="combat-stat-row">
                <div className="combat-stat">
                  <div className="stat-value">
                    <input
                      type="number"
                      name="armorClass"
                      value={character.armorClass}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="stat-label">ARMOR CLASS</div>
                </div>

                <div className="combat-stat">
                  <div className="stat-value">
                    <input
                      type="number"
                      name="initiative"
                      value={character.initiative}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="stat-label">INITIATIVE</div>
                </div>

                <div className="combat-stat">
                  <div className="stat-value">
                    <input
                      type="number"
                      name="speed"
                      value={character.speed}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="stat-label">SPEED</div>
                </div>
              </div>

              <div className="hit-points">
                <div className="hp-max">
                  <label>Hit Point Maximum</label>
                  <input
                    type="number"
                    name="hitPointMaximum"
                    value={character.hitPointMaximum}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="current-hp">
                  <label>CURRENT HIT POINTS</label>
                  <input
                    type="number"
                    name="currentHitPoints"
                    value={character.currentHitPoints}
                    onChange={handleInputChange}
                    className="hp-input"
                  />
                </div>

                <div className="temp-hp">
                  <label>TEMPORARY HIT POINTS</label>
                  <input
                    type="number"
                    name="temporaryHitPoints"
                    value={character.temporaryHitPoints}
                    onChange={handleInputChange}
                    className="hp-input"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="skills">
              <h3>SKILLS</h3>
              {[
                { name: 'acrobatics', ability: 'dexterity', label: 'Acrobatics' },
                { name: 'animalHandling', ability: 'wisdom', label: 'Animal Handling' },
                { name: 'arcana', ability: 'intelligence', label: 'Arcana' },
                { name: 'athletics', ability: 'strength', label: 'Athletics' },
                { name: 'deception', ability: 'charisma', label: 'Deception' },
                { name: 'history', ability: 'intelligence', label: 'History' },
                { name: 'insight', ability: 'wisdom', label: 'Insight' },
                { name: 'intimidation', ability: 'charisma', label: 'Intimidation' },
                { name: 'investigation', ability: 'intelligence', label: 'Investigation' },
                { name: 'medicine', ability: 'wisdom', label: 'Medicine' },
                { name: 'nature', ability: 'intelligence', label: 'Nature' },
                { name: 'perception', ability: 'wisdom', label: 'Perception' },
                { name: 'performance', ability: 'charisma', label: 'Performance' },
                { name: 'persuasion', ability: 'charisma', label: 'Persuasion' },
                { name: 'religion', ability: 'intelligence', label: 'Religion' },
                { name: 'sleightOfHand', ability: 'dexterity', label: 'Sleight of Hand' },
                { name: 'stealth', ability: 'dexterity', label: 'Stealth' },
                { name: 'survival', ability: 'wisdom', label: 'Survival' }
              ].map((skill) => (
                <div key={skill.name} className="skill-item">
                  <input
                    type="checkbox"
                    name={skill.name}
                    checked={character[skill.name]}
                    onChange={handleInputChange}
                    id={`skill-${skill.name}`}
                  />
                  <span className="skill-modifier">
                    {formatModifier(getSkillBonus(skill.name, skill.ability))}
                  </span>
                  <label htmlFor={`skill-${skill.name}`}>{skill.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="right-column">
            {/* Level Up Button */}
            <button
              className="level-up-button"
              onClick={handleLevelUp}
            >
              Level Up
            </button>

            {/* Features & Traits*/}
            <div className="features-section">
              <h3>FEATURES & TRAITS</h3>
              <textarea
                name="featuresAndTraits"
                value={character.featuresAndTraits}
                onChange={handleInputChange}
                className="features-input"
              />
            </div>

            {/* Equipment */}
            <div className="equipment-section">
              <h3>EQUIPMENT</h3>
              <textarea
                name="equipment"
                value={character.equipment}
                onChange={handleInputChange}
                className="equipment-input"
              />
            </div>

            {/* Notes */}
            <div className="notes-section">
              <h3>NOTES</h3>
              <textarea
                name="notes"
                value={character.notes || ''}
                onChange={handleInputChange}
                className="notes-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <NavButton url="/" text="Home" />
        <button className="save-button" onClick={saveCharacter}>Save Character</button>
        <button className="delete-button" onClick={deleteCharacter}>Delete Character</button>
      </div>
    </div>
  );
}

export default CharSheet;