

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