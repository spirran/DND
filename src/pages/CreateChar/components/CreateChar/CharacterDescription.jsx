

function CharDescriptionInput({onDescriptionChange})
{

    return(
        <>
        <label className="createLabel">Character Description</label>
        <textarea type="text" className="descriptionInput" id="description"   
            onChange={(e) => onDescriptionChange(e.target.value)} 
        ></textarea>
        
        </>
    )

}
export default CharDescriptionInput;