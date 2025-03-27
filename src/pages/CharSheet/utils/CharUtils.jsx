/**
 * Calculate proficiency bonus based on character level
 * @param {number} level - Character level
 * @returns {number} - Proficiency bonus
 */
export const calculateProficiencyBonus = (level) => {
    return Math.floor((parseInt(level) - 1) / 4) + 2;
  };
  
  /**
   * Calculate ability modifier from ability score
   * @param {number} score - Ability score
   * @returns {number} - Ability modifier
   */
  export const getAbilityModifier = (score) => {
    return Math.floor((parseInt(score) - 10) / 2);
  };
  
  /**
   * Format modifier to include + sign when positive
   * @param {number} modifier - Ability modifier
   * @returns {string} - Formatted modifier
   */
  export const formatModifier = (modifier) => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };
  
  /**
   * Calculate saving throw bonus
   * @param {Object} character - Character object
   * @param {string} ability - Ability name
   * @returns {number} - Saving throw bonus
   */
  export const getSavingThrowBonus = (character, ability) => {
    const abilityMod = getAbilityModifier(character[ability]);
    const isProficient = character[`${ability}Save`];
  
    return isProficient
      ? abilityMod + parseInt(character.proficiencyBonus)
      : abilityMod;
  };
  
  /**
   * Calculate skill bonus
   * @param {Object} character - Character object
   * @param {string} skillName - Skill name
   * @param {string} abilityName - Associated ability
   * @returns {number} - Skill bonus
   */
  export const getSkillBonus = (character, skillName, abilityName) => {
    const abilityMod = getAbilityModifier(character[abilityName]);
    const isProficient = character[skillName];
  
    return isProficient
      ? abilityMod + parseInt(character.proficiencyBonus)
      : abilityMod;
  };
  
  /**
   * Get spell save DC
   * @param {Object} character - Character object
   * @returns {number} - Spell save DC
   */
  export const getSpellSaveDC = (character) => {
    const abilityName = character.spellcastingAbility || 'intelligence';
    const abilityMod = getAbilityModifier(character[abilityName]);
    
    return 8 + parseInt(character.proficiencyBonus) + abilityMod;
  };
  
  /**
   * Get spell attack bonus
   * @param {Object} character - Character object
   * @returns {string} - Formatted spell attack bonus
   */
  export const getSpellAttackBonus = (character) => {
    const abilityName = character.spellcastingAbility || 'intelligence';
    const abilityMod = getAbilityModifier(character[abilityName]);
    
    return formatModifier(parseInt(character.proficiencyBonus) + abilityMod);
  };
  
  /**
   * Generate ability scores list with labels for display
   * @returns {Array} - Array of ability names for iteration
   */
  export const getAbilityScoresList = () => {
    return [
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma'
    ];
  };
  
  /**
   * Generate skills list with ability associations
   * @returns {Array} - Array of skill objects with name, ability, and label
   */
  export const getSkillsList = () => {
    return [
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
    ];
  };