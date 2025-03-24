

function CharNameInput({selectedName,onNameChange})
{

    return(
        <>
        <label className="createLabel">Character Name</label>
        <input type="text" className="nameInput" id="name"
        value = {selectedName ?? ""} 
            onChange={(e) => onNameChange(e.target.value)}
        ></input>
        </>
    )

}
export default CharNameInput;