/**
 * Default character template with initial values
 * @type {Object}
 */
export const DEFAULT_CHARACTER = {
  name: '',
  class: '',
  level: 1,
  background: '',
  race: '',
  alignment: '',
  experiencePoints: 0,
  portraitUrl: '',

  proficiencyBonus: 2,

  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,

  strengthSave: false,
  dexteritySave: false,
  constitutionSave: false,
  intelligenceSave: false,
  wisdomSave: false,
  charismaSave: false,

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

  armorClass: 10,
  initiative: 0,
  speed: 30,
  hitPointMaximum: 10,
  currentHitPoints: 10,
  temporaryHitPoints: 0,

  equipment: '',

  featuresAndTraits: '',

  description: '',

  spellcastingClass: '',
  spellcastingAbility: 'intelligence',
  spellSaveDC: 10,
  spellAttackBonus: '+2',

  spellSlots: {
    level1: { total: 4, used: 0 },
    level2: { total: 3, used: 0 },
    level3: { total: 3, used: 0 },
    level4: { total: 3, used: 0 },
    level5: { total: 2, used: 0 },
    level6: { total: 1, used: 0 },
    level7: { total: 1, used: 0 },
    level8: { total: 1, used: 0 },
    level9: { total: 1, used: 0 },
  },

  cantrips: Array(9).fill(''),

  spells: {
    level1: Array(9).fill().map(() => ({ name: '', prepared: false })),
    level2: Array(9).fill().map(() => ({ name: '', prepared: false })),
    level3: Array(9).fill().map(() => ({ name: '', prepared: false })),
    level4: Array(9).fill().map(() => ({ name: '', prepared: false })),
    level5: Array(9).fill().map(() => ({ name: '', prepared: false })),
    level6: Array(6).fill().map(() => ({ name: '', prepared: false })),
    level7: Array(6).fill().map(() => ({ name: '', prepared: false })),
    level8: Array(6).fill().map(() => ({ name: '', prepared: false })),
    level9: Array(6).fill().map(() => ({ name: '', prepared: false })),
  },

  attacks: Array(6).fill().map(() => ({ name: '', bonus: '', damage: '', type: '' })),
};

/**
 * Transform character to storage format
 * @param {Object} character - Character in component state format
 * @param {string} portraitUrl - URL for character portrait
 * @returns {Object} - Character in storage format
 */
export const createCharacterData = (character, portraitUrl) => {
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

  const spellcasting = {
    spellcastingClass: character.spellcastingClass,
    spellcastingAbility: character.spellcastingAbility,
    spellSaveDC: character.spellSaveDC,
    spellAttackBonus: character.spellAttackBonus,
    spellSlots: character.spellSlots,
    cantrips: character.cantrips,
    spells: character.spells,
    attacks: character.attacks
  };

  return {
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
    description: character.description,
    alignment: character.alignment,
    background: character.background,
    experiencePoints: character.experiencePoints,
    proficiencyBonus: character.proficiencyBonus,
    img: portraitUrl,
    skills: skills,
    saves: saves,
    combatStats: combatStats,
    equipment: character.equipment,
    featuresAndTraits: character.featuresAndTraits,
    spellcasting: spellcasting
  };
};

/**
 * Load character from browser/storage format to component state format
 * @param {Object} characterFromBrowser - Character data from browser/storage
 * @returns {Object} - Character in component state format
 */
export const loadCharacterFromBrowser = (characterFromBrowser) => {
  if (!characterFromBrowser) return DEFAULT_CHARACTER;
  
  const updatedCharacter = { ...DEFAULT_CHARACTER };

  updatedCharacter.name = characterFromBrowser.name || '';
  updatedCharacter.class = characterFromBrowser.class || '';
  updatedCharacter.level = characterFromBrowser.level || 1;
  updatedCharacter.race = characterFromBrowser.race || '';
  updatedCharacter.alignment = characterFromBrowser.alignment || '';
  updatedCharacter.background = characterFromBrowser.background || '';
  updatedCharacter.experiencePoints = characterFromBrowser.experiencePoints || 0;
  updatedCharacter.portraitUrl = characterFromBrowser.img || '';

  updatedCharacter.proficiencyBonus = Math.floor((parseInt(updatedCharacter.level) - 1) / 4) + 2;

  if (characterFromBrowser.attributes && characterFromBrowser.attributes.length >= 6) {
    updatedCharacter.strength = characterFromBrowser.attributes[0];
    updatedCharacter.dexterity = characterFromBrowser.attributes[1];
    updatedCharacter.constitution = characterFromBrowser.attributes[2];
    updatedCharacter.intelligence = characterFromBrowser.attributes[3];
    updatedCharacter.wisdom = characterFromBrowser.attributes[4];
    updatedCharacter.charisma = characterFromBrowser.attributes[5];
  }

  if (characterFromBrowser.skills) {
    Object.keys(characterFromBrowser.skills).forEach(key => {
      if (updatedCharacter.hasOwnProperty(key)) {
        updatedCharacter[key] = characterFromBrowser.skills[key];
      }
    });
  }

  if (characterFromBrowser.saves) {
    Object.keys(characterFromBrowser.saves).forEach(key => {
      if (updatedCharacter.hasOwnProperty(key)) {
        updatedCharacter[key] = characterFromBrowser.saves[key];
      }
    });
  }

  if (characterFromBrowser.combatStats) {
    Object.keys(characterFromBrowser.combatStats).forEach(key => {
      if (updatedCharacter.hasOwnProperty(key)) {
        updatedCharacter[key] = characterFromBrowser.combatStats[key];
      }
    });
  }

  updatedCharacter.equipment = characterFromBrowser.equipment || '';
  updatedCharacter.featuresAndTraits = characterFromBrowser.featuresAndTraits || '';
  updatedCharacter.description = characterFromBrowser.description || '';

  if (characterFromBrowser.spellcasting) {
    const sc = characterFromBrowser.spellcasting;
    updatedCharacter.spellcastingClass = sc.spellcastingClass || '';
    updatedCharacter.spellcastingAbility = sc.spellcastingAbility || 'intelligence';
    updatedCharacter.spellSaveDC = sc.spellSaveDC || updatedCharacter.spellSaveDC;
    updatedCharacter.spellAttackBonus = sc.spellAttackBonus || updatedCharacter.spellAttackBonus;
    
    if (sc.spellSlots) {
      updatedCharacter.spellSlots = sc.spellSlots;
    }
    
    if (sc.cantrips) {
      updatedCharacter.cantrips = sc.cantrips;
    }
    
    if (sc.spells) {
      updatedCharacter.spells = sc.spells;
    }
    
    if (sc.attacks) {
      updatedCharacter.attacks = sc.attacks;
    }
  }

  return updatedCharacter;
};