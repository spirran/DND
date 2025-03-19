import React, { useState, useEffect } from 'react';

function RaceDropdown({selectedRace, onRaceChange}) {
    const [raceList, setRaceList] = useState([]); 

    useEffect(() => { //inbyggd react grej?
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
            <p>{selectedRace}</p>
        </>
    );
}

export default RaceDropdown;