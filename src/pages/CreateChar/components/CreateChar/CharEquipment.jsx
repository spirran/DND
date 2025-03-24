

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