import React from 'react';
import dndLogo from '../../assets/images/dnd-logo2.png';
import { 
  getAbilityModifier, 
  formatModifier,
  getSkillsList,
  getAbilityScoresList
} from './utils/CharUtils';

function CharSheetFront({
  character,
  portraitUrl,
  handleInputChange,
  handleClassLevelChange,
  handleLevelUp,
  handlePortraitUrlChange,
  applyPortraitUrl,
  handlePortraitError,
  getSavingThrowBonus,
  getSkillBonus,
  flipPage
}) {
  // Get list of ability scores
  const abilityScores = getAbilityScoresList();
  
  // Get list of skills with abilities
  const skills = getSkillsList();

  return (
    <div className="character-sheet frontside">
      {/* Flip Arrow */}
      <div className="flip-arrow" onClick={flipPage}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 4L4 9L9 14" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 9H14.5C17.5376 9 20 11.4624 20 14.5V14.5C20 17.5376 17.5376 20 14.5 20H5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
      {/* Header with Logo and Portrait */}
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
                  e.target.style.display = 'none';
                  handlePortraitError();
                  
                  // Make placeholder visible
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

      {/* Character Info Section */}
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
            {abilityScores.map((ability) => (
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
            {abilityScores.map((ability) => (
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
              {`+${character.proficiencyBonus}`}
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
            {skills.map((skill) => (
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

          {/* Description */}
          <div className="description-section">
            <h3>DESCRIPTION</h3>
            <textarea
              name="description"
              value={character.description || ''}
              onChange={handleInputChange}
              className="description-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharSheetFront;