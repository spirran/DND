import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CharSheet.css';

function NavButton({ url, text }) {
  return (
    <Link to={url}>
      <button className='nav-button'>{text}</button>
    </Link>
  );
}

function CharSheet() {
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    level: 1,
    background: '',
    playerName: '',
    race: '',
    alignment: '',
    experiencePoints: 0,
    
    // Ability scores
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,

    // Skills
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
    
    // Combat stats
    armorClass: 10,
    initiative: 0,
    speed: 30,
    hitPointMaximum: 10,
    currentHitPoints: 10,
    temporaryHitPoints: 0,
    
    // Equipment
    equipment: '',
    
    // Features & Traits
    featuresAndTraits: '',
  });

  // Calculate ability modifier
  const getAbilityModifier = (score) => {
    return Math.floor((score - 10) / 2);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCharacter({
      ...character,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Format modifier for display (+2, -1, etc.)
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
          <img src="/dnd-logo.png" alt="D&D Logo" className="dnd-logo" />
          <div className="header-title">CHARACTER SHEET</div>
        </div>

        <div className="top-section">
          <div className="char-info">
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

            <div className="char-info-row">
              <div className="input-group">
                <input
                  type="text"
                  name="class"
                  value={character.class}
                  onChange={handleInputChange}
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
                  name="playerName"
                  value={character.playerName}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <label>PLAYER NAME</label>
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
                  type="number"
                  name="experiencePoints"
                  value={character.experiencePoints}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <label>EXPERIENCE POINTS</label>
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

            {/* Inspiration */}
            <div className="inspiration-box">
              <div className="inspiration-circle"></div>
              <label>INSPIRATION</label>
            </div>

            {/* Proficiency Bonus */}
            <div className="proficiency-box">
              <div className="proficiency-value">+2</div>
              <label>PROFICIENCY BONUS</label>
            </div>

            {/* Saving Throws */}
            <div className="saving-throws">
              <h3>SAVING THROWS</h3>
              {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((ability) => (
                <div key={ability} className="save-item">
                  <input type="checkbox" id={`save-${ability}`} />
                  <span className="save-modifier">{formatModifier(getAbilityModifier(character[ability]))}</span>
                  <label htmlFor={`save-${ability}`}>{ability.charAt(0).toUpperCase() + ability.slice(1)}</label>
                </div>
              ))}
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
                    {formatModifier(getAbilityModifier(character[skill.ability]))}
                  </span>
                  <label htmlFor={`skill-${skill.name}`}>{skill.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="middle-column">
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
          </div>

          <div className="right-column">
            {/* Features & Traits - Now expanded */}
            <div className="features-section">
              <h3>FEATURES & TRAITS</h3>
              <textarea
                name="featuresAndTraits"
                value={character.featuresAndTraits}
                onChange={handleInputChange}
                className="features-input"
              />
            </div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="save-button">Save Character</button>
          <NavButton url="/DiceRoller" text="Roll Dice" />
        </div>
      </div>
    </div>
  );
}

export default CharSheet;