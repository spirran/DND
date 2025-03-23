import React, { useState, useEffect } from 'react';

const inputStyle = {
border:"0.1rem",
display:"grid",
width:"2.5rem",
};
function Attributes({onAttrChange, currentAttributes})
{

    return(
        <>
        <section style={{display:"flex", margintop:"2rem",}}>
            <div id="attrDiv">
                <label>STR:</label>
                <input type="text"className="attrInput" id="str"
                value={currentAttributes[0] ?? ""}
                onChange={(e) => onAttrChange(0,e.target.value)} 
                ></input>
            </div>

            <div id="attrDiv">
                <label>DEX:</label>
                <input type="text" className="attrInput" id="dex"
                 value={currentAttributes[1] ?? ""}
                onChange={(e) => onAttrChange(1,e.target.value)} 
                 ></input>   
            </div>

            <div id="attrDiv">
                <label>CON:</label>
                <input type="text" className="attrInput" id="con"
                  value={currentAttributes[2] ?? ""}
                 onChange={(e) => onAttrChange(2,e.target.value)} 
                ></input>
            </div>

            <div id="attrDiv">
                <label>INT:</label>
                <input type="text" className="attrInput" id="int"
                  value={currentAttributes[3] ?? ""}
                 onChange={(e) => onAttrChange(3,e.target.value)} 
                ></input>
            </div>

            <div id="attrDiv">
                <label>WIS:</label>
                <input type="text" className="attrInput" id="wis"
                 value={currentAttributes[4] ?? ""}
                 onChange={(e) => onAttrChange(4,e.target.value)} 
                ></input>
            
            </div>

            <div id="attrDiv">
                <label>CHA:</label>
                <input type="text" className="attrInput" id="cha"
                 value={currentAttributes[5] ?? ""}
                 onChange={(e) => onAttrChange(5,e.target.value)} 
                ></input>
            </div>
        </section>
        </>
    )
}
export default Attributes;