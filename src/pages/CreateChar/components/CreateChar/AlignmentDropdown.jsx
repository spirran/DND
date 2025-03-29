import React, { useState, useEffect } from 'react';
/**
 * AlignmentDropdown React Component
 * 
 * This component provides a dropdown menu for selecting a character's Dungeons and Dragons alignment
 * by calling the DnD5e API to fetch the list of available alignments.
 * 
 * @component
 * @param {Object} props - The component props object.
 * @param {string} props.selectedAlignment - The currently selected alignment.
 * @param {Function} props.onAlignmentChange - Event handler prop from the parent component for when the alignment is updated.
 * @returns {JSX.Element} The AlignmentDropdown component.
 */
function AlignmentDropdown({ selectedAlignment, onAlignmentChange }) {

    const [alignmentList, setAlignmentList] = useState([]);

    //useEffect hook that runs once when the component mounts so there arent multiple API calls
    useEffect(() => {
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
            <select
                id="alignmentSelect"
                onChange={(e) => onAlignmentChange(e.target.value)}
                value={selectedAlignment || ""} // Handle null value
            >
                <option value="" disabled>Select Alignment</option>
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