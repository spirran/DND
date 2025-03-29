import React, { useState, useEffect } from 'react';

/**
 * ClassDropdown React Component
 * 
 * This component provides a dropdown menu for selecting a character's Dungeons and Dragons class
 * by calling the DnD5e API to fetch the list of available classes such as Barbarian, Wizard, etc.
 * 
 * @component
 * @param {Object} props - The component props object.
 * @param {string} props.selectedClass - The currently selected class.
 * @param {Function} props.onClassChange - Event handler prop from the parent component for when the class is updated.
 *
 * @returns {JSX.Element} The ClassDropdown component.
 * 
 */
function ClassDropdown({selectedClass, onClassChange}) {
    const [classList, setClassList] = useState([]); 
    
 //useEffect hook that runs once when the component mounts so there arent multiple API calls
    useEffect(() => { 
        async function fetchClasses() {
            try {
                //Instructions from API
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                const response = await fetch("https://www.dnd5eapi.co/api/classes", requestOptions);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const classData = await response.json();
                setClassList(classData.results.map(item => item.name));
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchClasses();

    }, []);
    return (
        <> 
        <section id="classSection">
        <label className="createLabel">Select Class:
            <select 
                id="classSelect" 
                onChange={(e) => onClassChange(e.target.value)} 
                value={selectedClass}
            > 
                {classList.map((className, index) => (
                    <option key={index} value={className}>
                        {className}
                    </option>
                ))}
            </select>
        </label>
        </section>
        </>
    );
}


export default ClassDropdown;