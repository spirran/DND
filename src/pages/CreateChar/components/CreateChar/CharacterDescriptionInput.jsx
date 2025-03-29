
/**
 * CharacterDescriptionInput React Component 
 * 
 * This component provides a textarea input field for the user to input a description of their character
 * @component 
 * @param {Object} props - The component props object.
 * @param {Function} props.onDescriptionChange - Event handler prop from the parent component for when the description is updated.
 * 
 * @returns {JSX.Element} The CharDescriptionInput component.
 * 
 */
function CharDescriptionInput({ onDescriptionChange }) {

    return (
        <>
            <label className="createLabel">Character Description</label>
            <textarea type="text" className="descriptionInput" id="description" placeholder="Enter a description of your character"
                onChange={(e) => onDescriptionChange(e.target.value)}
            ></textarea>

        </>
    )

}
export default CharDescriptionInput;