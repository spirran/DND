import { createCharacterData } from './CharModel';

/**
 * Save character to localStorage
 * @param {Object} character - Character in component state format
 * @param {string} portraitUrl - URL for character portrait
 * @param {string} originalName - Original name of character
 * @returns {string} - Success message
 */
export const saveCharacter = (character, portraitUrl, originalName) => {
  try {
    const updatedCharacter = createCharacterData(character, portraitUrl);
    window.localStorage.setItem('updatedCharacter', JSON.stringify(updatedCharacter));
    window.localStorage.setItem('originalCharacterName', originalName || '');
    window.dispatchEvent(new Event('storage'));
    
    return 'Character saved successfully!';
  } catch (error) {
    console.error("Error saving character:", error);
    return "Error saving character. Please try again.";
  }
};

/**
 * Delete character from localStorage
 * @param {string} characterName - Name of character to delete
 * @returns {boolean} - Success status
 */
export const deleteCharacter = (characterName) => {
  try {
    const savedCharactersJSON = localStorage.getItem('characterList');
    if (!savedCharactersJSON) return false;
    
    const savedCharacters = JSON.parse(savedCharactersJSON);
    const updatedList = savedCharacters.filter(char => char.name !== characterName);
    
    localStorage.setItem('characterList', JSON.stringify(updatedList));
    localStorage.setItem('deleteCharacter', characterName);
    
    window.dispatchEvent(new Event('storage'));
    return true;
  } catch (error) {
    console.error("Error deleting character:", error);
    return false;
  }
};

/**
 * Load characters list from localStorage
 * @returns {Array} - Array of characters / empty if none found
 */
export const loadCharactersList = () => {
  try {
    const savedCharactersJSON = localStorage.getItem('characterList');
    return savedCharactersJSON ? JSON.parse(savedCharactersJSON) : [];
  } catch (error) {
    console.error("Error loading characters:", error);
    return [];
  }
};

/**
 * Check if a character with the given name already exists
 * @param {string} name - Character name to check
 * @returns {boolean} - True if character name exists, false otherwise
 */
export const characterNameExists = (name) => {
  const characters = loadCharactersList();
  return characters.some(char => char.name === name);
};

/**
 * Update existing character in localStorage
 * @param {Object} updatedCharacter - Updated character data
 * @param {string} originalName - Original name of character
 * @returns {boolean} - Success status
 */
export const updateExistingCharacter = (updatedCharacter, originalName) => {
  try {
    const characters = loadCharactersList();
    const index = characters.findIndex(char => char.name === originalName);
    
    if (index !== -1) {
      characters[index] = updatedCharacter;
      localStorage.setItem('characterList', JSON.stringify(characters));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating character:", error);
    return false;
  }
};

/**
 * Add new character to localStorage
 * @param {Object} character - New character data
 * @returns {boolean} - Success status
 */
export const addNewCharacter = (character) => {
  try {
    const characters = loadCharactersList();
    characters.push(character);
    localStorage.setItem('characterList', JSON.stringify(characters));
    return true;
  } catch (error) {
    console.error("Error adding character:", error);
    return false;
  }
};