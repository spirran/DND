
import React from 'react';
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