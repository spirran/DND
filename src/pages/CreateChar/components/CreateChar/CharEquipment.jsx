/**
 * CharacterEquipmentInput React Component 
 * 
 * This component provides a textarea input field for the user to input a description of their characters equipment
 * @component 
 * @param {Object} props - The component props object.
 * @param {Function} props.onEquipmentChange - Event handler prop from the parent component for when the equipment is updated.
 * 
 * @returns {JSX.Element} The CharEquipmentInput component.
 * 
 */
function CharEquipmentInput({onEquipmentChange})
{

    return(
        <>
        <label className="createLabel">Character Equipment</label>
        <textarea type="text" className="equipmentInput" id="equipment" placeholder="Enter the equipment your character has"   
            onChange={(e) => onEquipmentChange(e.target.value)} 
        ></textarea>
        
        </>
    )

}
export default CharEquipmentInput;