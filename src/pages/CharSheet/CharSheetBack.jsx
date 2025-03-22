import React from 'react';
import './styles/CharSheetBack.css';
import dndLogo from '../../assets/images/dnd-logo2.png';

function CharSheetBack({ character, handleInputChange, onFlip }) {
    const getAbilityModifier = (score) => {
        return Math.floor((parseInt(score) - 10) / 2);
    };

    // format to include '+'
    const formatModifier = (modifier) => {
        return modifier >= 0 ? `+${modifier}` : `${modifier}`;
    };

    // Process spell slot
    const handleSpellSlotChange = (level, field, value) => {
        handleInputChange({
            target: {
                name: `spellSlots.level${level}.${field}`,
                value: parseInt(value) || 0
            }
        });
    };

    const handleSpellNameChange = (level, index, value) => {
        handleInputChange({
            target: {
                name: `spells.level${level}.${index}.name`,
                value: value
            }
        });
    };

    // Handles spell prepared status
    const handleSpellPreparedChange = (level, index, checked) => {
        handleInputChange({
            target: {
                name: `spells.level${level}.${index}.prepared`,
                type: 'checkbox',
                checked: checked
            }
        });
    };

    // handle cantrip
    const handleCantripChange = (index, value) => {
        handleInputChange({
            target: {
                name: `cantrips.${index}`,
                value: value
            }
        });
    };

    // Handle attack row input
    const handleAttackChange = (index, field, value) => {
        handleInputChange({
            target: {
                name: `attacks.${index}.${field}`,
                value: value
            }
        });
    };

    // function to get spell slot values
    const getSpellSlotValue = (level, field) => {
        if (character.spellSlots && 
            character.spellSlots[`level${level}`] && 
            character.spellSlots[`level${level}`][field] !== undefined) {
            return character.spellSlots[`level${level}`][field];
        }
        // Default
        return field === 'total' ? (level <= 3 ? 4 - level + 1 : (level <= 5 ? 3 : (level <= 7 ? 2 : 1))) : 0;
    };

    // Get spell at specified level and index
    const getSpellName = (level, index) => {
        if (character.spells && 
            character.spells[`level${level}`] && 
            character.spells[`level${level}`][index] &&
            character.spells[`level${level}`][index].name !== undefined) {
            return character.spells[`level${level}`][index].name;
        }
        return '';
    };

    // Get spell prepared status
    const getSpellPrepared = (level, index) => {
        if (character.spells && 
            character.spells[`level${level}`] && 
            character.spells[`level${level}`][index] &&
            character.spells[`level${level}`][index].prepared !== undefined) {
            return character.spells[`level${level}`][index].prepared;
        }
        return false;
    };

    // Get cantrip name
    const getCantripName = (index) => {
        if (character.cantrips && character.cantrips[index] !== undefined) {
            return character.cantrips[index];
        }
        return '';
    };

    // Get attack field value
    const getAttackValue = (index, field) => {
        if (character.attacks && 
            character.attacks[index] && 
            character.attacks[index][field] !== undefined) {
            return character.attacks[index][field];
        }
        return '';
    };

    return (
        <div className="char-sheet-back">
            <div className="flip-arrow" onClick={onFlip}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 4L20 9L15 14" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 9H10.5C7.46243 9 5 11.4624 5 14.5V14.5C5 17.5376 7.46243 20 10.5 20H19" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div className="header">
                <div className="header-left">
                    <img src={dndLogo} alt="D&D Logo" className="dnd-logo" />
                </div>
                <div className="header-title">CHARACTER SHEET</div>
            </div>

            <div className="back-content" style={{ marginTop: '10px' }}>
                <div className="attacks-section">
                    <h3>ATTACKS & SPELLS</h3>
                    <table className="attacks-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>ATK BONUS</th>
                                <th>DAMAGE</th>
                                <th>TYPE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <tr key={`attack-${index}`}>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder={`Attack ${index + 1}`}
                                            className="attack-input"
                                            value={getAttackValue(index, 'name')}
                                            onChange={(e) => handleAttackChange(index, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="+0"
                                            className="attack-input small-input"
                                            value={getAttackValue(index, 'bonus')}
                                            onChange={(e) => handleAttackChange(index, 'bonus', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="1d8"
                                            className="attack-input"
                                            value={getAttackValue(index, 'damage')}
                                            onChange={(e) => handleAttackChange(index, 'damage', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Slashing"
                                            className="attack-input"
                                            value={getAttackValue(index, 'type')}
                                            onChange={(e) => handleAttackChange(index, 'type', e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="spellcasting-section">
                    <div className="spellcasting-header">
                        <div className="spellcasting-class">
                            <h3>SPELLCASTING CLASS</h3>
                            <input
                                type="text"
                                name="spellcastingClass"
                                className="spellcasting-input"
                                value={character.spellcastingClass || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="spellcasting-ability">
                            <h3>SPELLCASTING ABILITY</h3>
                            <select
                                className="spellcasting-select"
                                name="spellcastingAbility"
                                value={character.spellcastingAbility || 'intelligence'}
                                onChange={handleInputChange}
                            >
                                <option value="intelligence">INT</option>
                                <option value="wisdom">WIS</option>
                                <option value="charisma">CHA</option>
                            </select>
                        </div>
                        <div className="spell-save-dc">
                            <h3>SPELL SAVE DC</h3>
                            <input
                                type="number"
                                name="spellSaveDC"
                                className="spellcasting-input number-input"
                                value={character.spellSaveDC || 8 + 2 + getAbilityModifier(character?.intelligence || 10)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="spell-attack-bonus">
                            <h3>SPELL ATTACK BONUS</h3>
                            <input
                                type="text"
                                name="spellAttackBonus"
                                className="spellcasting-input number-input"
                                value={character.spellAttackBonus || formatModifier(2 + getAbilityModifier(character?.intelligence || 10))}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="spell-levels">
                        <div className="cantrips spell-level-section">
                            <h3>CANTRIPS</h3>
                            <div className="spell-list">
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                                    <input
                                        key={`cantrip-${index}`}
                                        type="text"
                                        placeholder={`Cantrip ${index + 1}`}
                                        className="spell-input"
                                        value={getCantripName(index)}
                                        onChange={(e) => handleCantripChange(index, e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
                            <div key={`level-${level}`} className="spell-level-section">
                                <div className="spell-level-header">
                                    <h3>LEVEL {level}</h3>
                                    <div className="spell-slots">
                                        <div className="spell-slots-wrapper">
                                            <span>SLOTS TOTAL</span>
                                            <input
                                                type="number"
                                                value={getSpellSlotValue(level, 'total')}
                                                onChange={(e) => handleSpellSlotChange(level, 'total', e.target.value)}
                                                className="spell-slot-input"
                                            />
                                        </div>
                                        <div className="spell-slots-wrapper">
                                            <span>SLOTS EXPENDED</span>
                                            <input
                                                type="number"
                                                value={getSpellSlotValue(level, 'used')}
                                                onChange={(e) => handleSpellSlotChange(level, 'used', e.target.value)}
                                                className="spell-slot-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="spell-list">
                                    {Array.from({ length: level <= 5 ? 9 : 6 }, (_, i) => (
                                        <div key={`spell-${level}-${i}`} className="spell-entry">
                                            <input 
                                                type="checkbox" 
                                                className="prepared-checkbox" 
                                                checked={getSpellPrepared(level, i)}
                                                onChange={(e) => handleSpellPreparedChange(level, i, e.target.checked)}
                                            />
                                            <input
                                                type="text"
                                                placeholder={`Spell name`}
                                                className="spell-input"
                                                value={getSpellName(level, i)}
                                                onChange={(e) => handleSpellNameChange(level, i, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharSheetBack;