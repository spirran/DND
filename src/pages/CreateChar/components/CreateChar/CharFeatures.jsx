import React, { useState, useEffect } from 'react';
/**
 * CharFeatureInput React Component
 * 
 * This component fetches and displays character features and traits in a textarea from DnD 5th edition API based on the currently selected class and level.
 * 
 * @component
 * @param {Object} props - The component props object.
 * @param {Function} props.onFeatureChange - Event handler prop from the parent component for when the features are updated.
 * @param {number} props.selectedLevel - The currently selected character level.
 * @param {string} props.selectedClass - The currently selected character class.
 * 
 * @returns {JSX.Element} The CharFeatureInput component.
 */
function CharFeatureInput({onFeatureChange, selectedLevel, selectedClass})
{
    const [featureList, setFeaturesList] = useState([]);
     //useEffect hook that runs once when the component mounts so there arent multiple API calls
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
            
                    let allFeatures = [];
                    for (let i = 1; i <= selectedLevel; i++) {
    
                        let response = await fetch("https://www.dnd5eapi.co/api/classes/"+selectedClass.toLowerCase()+"/levels/"+i+"/features", requestOptions);

                        if (!response.ok) {
                            throw new Error("Failed to fetch data");
                        }

                        const featureData = await response.json();
                        allFeatures = [...allFeatures, ...featureData.results.map(item => item.name)];
                        
                    }
                    setFeaturesList(allFeatures);
                    
                    

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

/**
 * This is a helper function to display the features fetched from the API in a readable format
 * by creating a new line after each feature
 * @function
 * @param {Array<number|string>} features the features fetched from the api
 * @returns {string} the features sorted into a string with a new line after each feature
 */
function displayFeatures(features) {
    let featureString = "";
    for (let i = 0; i < features.length; i++) {
        featureString += features[i] + "\n";
    }
    return featureString;
}