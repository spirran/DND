import React, { useState, useEffect } from 'react';

function CharFeatureInput({onFeatureChange, selectedLevel, selectedClass})
{
    const [featureList, setFeaturesList] = useState([]);
    useEffect(() => { 
            async function fetchFeatures() {
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
                    console.log("class:"+ selectedClass);
                    let allFeatures = [];
                    for (let i = 1; i <= selectedLevel; i++) {
    
                        let response = await fetch("https://www.dnd5eapi.co/api/classes/"+selectedClass.toLowerCase()+"/levels/"+i+"/features", requestOptions);

                        if (!response.ok) {
                            throw new Error("Failed to fetch data");
                        }

                        const featureData = await response.json();
                        allFeatures = [...allFeatures, ...featureData.results.map(item => item.name)];
                        console.log("data:"+featureData.results.map(item => item.name));
                    }
                    setFeaturesList(allFeatures);
                    console.log(allFeatures);
                    

                } catch (error) {
                    console.error(error);
                   
                }
            }
            fetchFeatures();
        }, [selectedLevel, selectedClass]);

    return(
        <>
        <label className="createLabel">Character Features & Traits</label>
        <textarea type="text" className="featureInput" id="features" placeholder="Enter the features and traits of your character" 
            onChange={(e) => onFeatureChange(e.target.value)} 
            value = {displayFeatures(featureList)}
        ></textarea>
        
        </>
    )

}
export default CharFeatureInput;


function displayFeatures(features) {
    let featureString = "";
    for (let i = 0; i < features.length; i++) {
        featureString += features[i] + "\n";
    }
    return featureString;
}