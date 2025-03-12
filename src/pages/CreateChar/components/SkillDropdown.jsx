import React, { useState, useEffect } from 'react';

function SkillDropdown({className}) {

    const [skillList, setSkillList] = useState([]);
    
    useEffect(() => { //inbyggd react grej?
        async function fetchSkills() {
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
                const response = await fetch("https://www.dnd5eapi.co/api/classes/"+className+"/features", requestOptions);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const skillData = await response.json();
                setSkillList(skillData.results.map(item => item.name));
            } catch (error) {
                console.error(error);
            }
        }

        fetchSkills();
    }, []);

    return (

        <>
            <select id="skillSelect">
                {skillList.map((skillName, index) => (
                    <option key={index} value={skillName}>
                        {skillName}
                    </option>
                ))}
            </select>
        </>
    );

}
export default SkillDropdown;