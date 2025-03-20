

function ClassLevelInput({onLevelChange})
{

    return(
        <>
        <label className="createLabel" id="levelLabel">Level:</label>
        <input type="text" className="levelInput" id="level"   
            onChange={(e) => onLevelChange(e.target.value)} 
        ></input>
        </>
    )

}
export default ClassLevelInput;