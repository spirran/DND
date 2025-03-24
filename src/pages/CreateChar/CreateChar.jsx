import React, { useState, useEffect } from 'react';
import './CreateChar.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import CreateCharHeader from './components/CreateChar/CreateCharHeader';
import ClassDropdown from './components/CreateChar/ClassDropdown';
import RaceDropdown from './components/CreateChar/RaceDropdown';
//import SkillDropdown from './components/CreateChar/SkillDropdown';
import Attributes from './components/CreateChar/CharAttributes';
import CharNameInput from './components/CreateChar/CharNameInput';
import CharDescriptionInput from './components/CreateChar/CharacterDescriptionInput';
import ClassLevelInput from './components/CreateChar/ClassLevelInput';
import AlignmentDropdown from './components/CreateChar/AlignmentDropdown';
import CharFeatureInput from './components/CreateChar/CharFeatures';
import CharEquipmentInput from './components/CreateChar/CharEquipment';

function CreateChar({ onCharacterChange }) {
    const navigate = useNavigate();

    const [currentClass, setCurrentClass] = useState("Barbarian");
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentRace, setCurrentRace] = useState("Dragonborn");
    const [currentName, setCurrentName] = useState("player");
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentEquipment, setCurrentEquipment] = useState("");
    const [currentFeatures, setCurrentFeatures] = useState("");
    const [currentAlignment, setCurrentAlignment] = useState("Neutral");

    const [currentAttributes, setCurrentAttributes] = useState([10, 10, 10, 10, 10, 10]);

    const [character, setCharacter] = useState(null);

    const handleAttrChange = (index, value) => {
        const updatedAttributes = [...currentAttributes];
        updatedAttributes[index] = value;
        setCurrentAttributes(updatedAttributes);

    };

    const handleInput = (character) =>
    {
        alert(character.name.length);
        if(character.name.length <= 0 || character.name.length > 20)
        {
            alert("Name must be between 1 and 20 characters");
            return false;
        }


        for(let i = 0; i<character.attributes.length;i++)
        {
            if(isNumeric(character.attributes[i]) == false || isNumeric(character.level) == false)
            {
                alert("Attributes and level must be integers");
                return false;
            }
            
            if(character.attributes[i] < 1 || character.attributes[i] > 20)
            {
                alert("Attributes must be between 1 and 20");
                return false;
            }
        }

        if(character.level < 1 || character.level > 20)
        {
            alert("Level must be between 1 and 20");
            return false;
        }
        return true;
    }


    const handleSubmit = () => {
        const newCharacter = {
            name: currentName,
            class: currentClass,
            level: currentLevel,
            race: currentRace,
            attributes: currentAttributes,
            description: currentDescription,
            equipment:currentEquipment,
            features: currentFeatures,
            alignment: currentAlignment,
            img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY"
        };

        if(handleInput(newCharacter) == true)
        {
            alert("Character is valid");
            setCharacter(newCharacter);
            onCharacterChange(newCharacter); // Update the character list
        }
        else{
            alert("Character not valid");
            return;
        }
       
    };

    useEffect(() => {
        if (character) {
            navigate('/'); // Navigate back to the front page after submitting
        }
    }, [character, navigate]);

    return (
        <>
            <CreateCharHeader />


            <div className="createPage-wrapper">
                <section id="leftCreateSection">
                    <CharNameInput
                        onNameChange={(newName) => setCurrentName(newName)}
                        selectedName={currentName}
                    />

                    <RaceDropdown
                        selectedRace={currentRace}
                        onRaceChange={(newRace) => setCurrentRace(newRace)}
                    />

                    <section className="classSection">
                        <div id="classPart">
                            <ClassDropdown
                                selectedClass={currentClass}
                                onClassChange={(newClass) => setCurrentClass(newClass)}
                            />
                        </div>
                        <div id="levelPart">
                            <ClassLevelInput
                                onLevelChange={(newLevel) => setCurrentLevel(newLevel)}
                                currentLevel={currentLevel}
                            />
                        </div>
                    </section>


                    <Attributes
                        onAttrChange={handleAttrChange}
                        currentAttributes={currentAttributes}
                    />

                    <CharDescriptionInput
                        onDescriptionChange={(newDescription) => setCurrentDescription(newDescription)}
                    />

                    <AlignmentDropdown
                        selectedAlignment={currentAlignment}
                        onAlignmentChange={(newAlignment) => setCurrentAlignment(newAlignment)}
                    />

                    <Link to={"/"}>
                        <button className="createButton" id="createSubmitButton" onClick={handleSubmit}>
                            Submit
                        </button>
                    </Link>
                </section>
                <section id="rightCreateSection">
                    <CharFeatureInput
                        onFeatureChange={(newFeatures) => setCurrentFeatures(newFeatures)}
                    />

                    <CharEquipmentInput
                        onEquipmentChange={(newEquipment) => setCurrentEquipment(newEquipment)}
                    />
                </section>


            </div>

        </>
    );
};

function isNumeric(value) {
    //Regex from: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    return /^-?\d+$/.test(value);
}
export default CreateChar;
