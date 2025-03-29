/**
 * CharNameInput React Component
 * 
 * This is a component that provides an input field for the user to input the name of their character
 * @component
 * @param {Object} props - The component props object.
 * @param {Function} props.onNameChange - Event handler prop from the parent component for when the name is updated.
 * @returns {JSX.Element} The CharNameInput component.
 */

function CharNameInput({onNameChange})
{

    return(
        <>
        <label className="createLabel">Character Name</label>
        <input type="text" className="nameInput" id="name"
        
            onChange={(e) => onNameChange(e.target.value)}
        ></input>
        </>
    )

}
export default CharNameInput;