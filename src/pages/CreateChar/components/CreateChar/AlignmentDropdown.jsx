import React, { useState, useEffect } from 'react';

function AlignmentDropdown({selectedAlignment, onAlignmentChange}) {

    const [alignmentList, setAlignmentList] = useState([]);
    
    useEffect(() => { //inbyggd react grej?
        async function fetchAlignments() {
            try {
                //Instructions from API
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };
                //Vad ska hämtas?
                const response = await fetch("https://www.dnd5eapi.co/api/alignments/", requestOptions);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const alignmentData = await response.json();
                setAlignmentList(alignmentData.results.map(item => item.name));
            } catch (error) {
                console.error(error);
            }
        }

        fetchAlignments();
    }, []);

    return (
        <>
        <label className="createLabel" id="alignmentLabel">Alignment: </label>
            <select id="alignmentSelect" 
             onChange={(e) => onAlignmentChange(e.target.value)} 
             value={selectedAlignment}>
                {alignmentList.map((alignmentName, index) => (
                    <option key={index} value={alignmentName}>
                        {alignmentName}
                    </option>
                ))}
            </select>
        </>
    );

}
export default AlignmentDropdown;