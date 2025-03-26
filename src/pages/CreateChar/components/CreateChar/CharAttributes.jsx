import React, { useState, useEffect } from 'react';


function Attributes({onAttrChange, currentAttributes, selectStandard})
{
    const [selectedItems, setSelectedItems] = useState([]);
    const standardArray = [15,14,13,12,10,8];
    const attr = ["STR","DEX","CON","INT","WIS","CHA"];
if(selectStandard == true)
{
    return (
        <>
        <div style={{display:"flex", margintop:"2rem",}}> 
            {Array.from({ length: 6 }).map((_, index) => (
                <div id="attrDiv">
                    <label>{attr[index]}:</label>
                <select key={index} onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!selectedItems.includes(value)) {
                        const updatedItems = [...selectedItems];
                        updatedItems[index] = value;
                        setSelectedItems(updatedItems);
                        onAttrChange(index, value);
                        console.log("was changed");
                    }
                }}>
                    <option value="">--</option>
                    {standardArray.filter((item) => !selectedItems.includes(item) || selectedItems[index] === item)
                        .map((item, idx) => (
                            <option key={idx} value={item}
                            >{item}
                            
                            </option>
                        ))}
                </select>
                </div>
            ))}
        </div>
        </>
    );
}
else 
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
   
}
export default Attributes;