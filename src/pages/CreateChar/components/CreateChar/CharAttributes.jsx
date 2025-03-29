
import React, { useState, useEffect } from 'react';

/**
 * Attributes React Component
 * 
 * This is a  component that provides input fields or dropdown menues for managing and displaying the character's Dungeons and Dragons attributes.
 * [Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma]
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {function} props.onAttrChange - Callback function to handle attribute changes. 
 *                                         It receives the index of the attribute and the new value.
 * @param {Array<number|string>} props.currentAttributes - An array representing the current values of the attributes.
 * @param {boolean} props.selectStandard - A flag indicating whether to use the standard array for attribute selection.
 * 
 * @returns {JSX.Element} The Attributes component.
 */
function Attributes({onAttrChange, currentAttributes, selectStandard})
{
    const [selectedItems, setSelectedItems] = useState([]);
    const standardArray = [15,14,13,12,10,8];
    const attribute = ["STR","DEX","CON","INT","WIS","CHA"];
if(selectStandard == true)
{
    return (
        <>
       <div style={{ display: "flex"}}>
    {Array.from({ length: 6 }).map((_, index) => (
        <div id="attrDiv" key={index}>
            <label htmlFor={`attr-select-${index}`}>{attribute[index]}:</label>
            <select
                id={`attr-select-${index}`}
                value={selectedItems[index] ?? ""}
                onChange={(e) => {
                    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
                    if (!selectedItems.includes(value)) {
                        const updatedItems = [...selectedItems];
                        updatedItems[index] = value;
                        setSelectedItems(updatedItems);
                        onAttrChange(index, value);
                        console.log("value: " + value + " was changed");
                        console.log("updatedItems: " + updatedItems);
                        console.log("selectedItems: " + selectedItems);
                    }
                }}
            >
                <option value="">--</option>
                {standardArray
                    .filter(
                        (item) =>
                            !selectedItems.includes(item) ||
                            selectedItems[index] === item
                    )
                    .map((item, idx) => (
                        <option key={idx} value={item}>
                            {item}
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