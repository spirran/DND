import React, { useState, useEffect } from 'react';
/**
 * RaceDropdown React Component
 * 
 * This component provides a dropdown menu for selecting a character's Dungeons and Dragons race
 * by calling the DnD5e API to fetch the list of available races such as Dwarf, Elf, etc.
 * 
 * @component
 * @param {Object} props - The component props object.
 * @param {Function} props.onFeatureChange - Event handler prop from the parent component for when the features are updated.
 * @param {string} selectedRace - The currently selected character race.
 * 
 * @returns {JSX.Element} The RaceDropdown component.
 */
function RaceDropdown({ selectedRace, onRaceChange }) {
    const [raceList, setRaceList] = useState([]);

    //useEffect hook that runs once when the component mounts so there arent multiple API calls
    useEffect(() => {
        async function fetchRaces() {
            try {
                //Instructions from API
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                const response = await fetch("https://www.dnd5eapi.co/api/races", requestOptions);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const raceData = await response.json();
                setRaceList(raceData.results.map(item => item.name));
            } catch (error) {
                console.error(error);
            }
        }

        fetchRaces();
    }, []);

    return (

        <>
            <label className="createLabel">Race: </label>
            <select id="raceSelect"
                onChange={(e) => onRaceChange(e.target.value)}
                value={selectedRace}
            >
                {raceList.map((raceName, index) => (
                    <option key={index} value={raceName}>
                        {raceName}
                    </option>
                ))}
            </select>
        </>
    );
}

export default RaceDropdown;