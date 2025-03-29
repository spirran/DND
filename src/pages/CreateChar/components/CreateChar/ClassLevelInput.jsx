
import React from 'react';
/**
 * ClassLevelInput React Component
 * 
 * This component provides an input field for the user to input the character's level.
 * @component
 * @param {Object} props - the component props object
 * @param {Function} props.onLevelChange - Event handler prop from the parent component for when the level is updated.
 * @param {string} props.currentLevel - The currently selected character level.
 * 
 * @returns {JSX.Element} The ClassLevelInput component.
 */
function ClassLevelInput({onLevelChange, currentLevel})
{

    return(
        <>
        <label className="createLabel" id="levelLabel">Level:</label>
        <input type="text" className="levelInput" id="level"
        value={currentLevel ?? ""}   
            onChange={(e) => onLevelChange(e.target.value)} 
        ></input>
        </>
    )

}
export default ClassLevelInput;