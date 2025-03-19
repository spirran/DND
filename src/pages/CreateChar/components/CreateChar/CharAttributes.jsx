import React, { useState, useEffect } from 'react';

const inputStyle = {
border:"0.1rem",
display:"grid",
width:"2.5rem",
};
function Attributes({onAttrChange})
{

    return(
        <>
        <section style={{display:"flex", margintop:"2rem",}}>
            <div id="attrDiv">
                <label>STR:</label>
                <input type="text"className="attrInput" id="str"
                
                onChange={(e) => onAttrChange(0,e.target.value)} 
                ></input>
            </div>

            <div id="attrDiv">
                <label>DEX:</label>
                <input type="text" className="attrInput" id="dex"
                 
                onChange={(e) => onAttrChange(1,e.target.value)} 
                 ></input>   
            </div>

            <div id="attrDiv">
                <label>CON:</label>
                <input type="text" className="attrInput" id="con"
                  
                 onChange={(e) => onAttrChange(2,e.target.value)} 
                ></input>
            </div>

            <div id="attrDiv">
                <label>INT:</label>
                <input type="text" className="attrInput" id="int"
                  
                 onChange={(e) => onAttrChange(3,e.target.value)} 
                ></input>
            </div>

            <div id="attrDiv">
                <label>WIS:</label>
                <input type="text" className="attrInput" id="wis"
                 
                 onChange={(e) => onAttrChange(4,e.target.value)} 
                ></input>
            
            </div>

            <div id="attrDiv">
                <label>CHA:</label>
                <input type="text" className="attrInput" id="cha"
                 
                 onChange={(e) => onAttrChange(5,e.target.value)} 
                ></input>
            </div>
        </section>
        </>
    )
}
export default Attributes;