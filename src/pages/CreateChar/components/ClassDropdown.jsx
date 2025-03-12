import React, { useState, useEffect } from 'react';


function ClassDropdown() {
    const [classList, setClassList] = useState([]); 

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
            <select id="classSelect"> 
                {classList.map((className, index) => (
                    <option key={index} value={className}>
                        {className}
                    </option>
                ))}
            </select>
        </>
    );
}

export default ClassDropdown;