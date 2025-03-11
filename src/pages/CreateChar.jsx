
import React, { useState, useEffect } from 'react';

/*
function CreateChar() {
    return (
    <div>
       <h1> 
            VÄLKOMMEN TILL CREATE CHAR
        </h1>
        <ul>
            <li>class</li>
            <li>class2</li>
            <li>class3</li>
        </ul>
    </div>
    );
  };

export default CreateChar;
*/



/*
In body of function, do the fetch call for that feature
then in return put it into the HTML
https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/
*/


//CoPilot
function CreateChar() {
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
            <h1> 
                VÄLKOMMEN TILL CREATE CHAR
            </h1>
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

export default CreateChar;
