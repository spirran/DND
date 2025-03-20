import React, { useState, useEffect } from 'react';

function ClassDropdown({selectedClass, onClassChange}) {
    const [classList, setClassList] = useState([]); 
    //const [selectedClass,setSelectedClass] = useState();
    useEffect(() => { //inbyggd react grej?
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
        <label className="createLabel">Select Class:</label>
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
        </section>
        </>
    );
}


export default ClassDropdown;