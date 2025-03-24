

function CharDescriptionInput({onDescriptionChange})
{

    return(
        <>
        <label className="createLabel">Character Description</label>
        <textarea type="text" className="descriptionInput" id="description" placeholder="Enter a description of your character"  
            onChange={(e) => onDescriptionChange(e.target.value)} 
        ></textarea>
        
        </>
    )

}
export default CharDescriptionInput;