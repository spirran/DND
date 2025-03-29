// Dependencies
// 1. React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
//2. Styling
import './CreateChar.css';
//3. Components
import CreateCharHeader from './components/CreateChar/CreateCharHeader';
import ClassDropdown from './components/CreateChar/ClassDropdown';
import RaceDropdown from './components/CreateChar/RaceDropdown';
import Attributes from './components/CreateChar/CharAttributes';
import CharNameInput from './components/CreateChar/CharNameInput';
import CharDescriptionInput from './components/CreateChar/CharacterDescriptionInput';
import ClassLevelInput from './components/CreateChar/ClassLevelInput';
import AlignmentDropdown from './components/CreateChar/AlignmentDropdown';
import CharFeatureInput from './components/CreateChar/CharFeatures';
import CharEquipmentInput from './components/CreateChar/CharEquipment';
import CharImageInput from './components/CreateChar/CharImageInput';
import SelectAttrCheckbox from './components/CreateChar/selectAttrCheckbox';
/**
 * CreateChar React Component
 * 
 * This component represents the main character creation page in the application.
 * It allows users to input various details about their character, such as name, class, race, attributes, and more.
 * The component is composed of several child components that handle specific parts of the character creation process.
 * 
 * @component
 * @param {Object} props - The component props object.
 * @param {Function} props.onCharacterChange - Event handler prop from the parent component for when a character is created.
 * 
 * @returns {JSX.Element} The CreateChar component.
 */
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
    const [currentImage, setCurrentImage] = useState("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY");
    const [character, setCharacter] = useState(null);
    const [useStandard, setUseStandard] = useState(false);

    /**
     * Handles the change of a specific attribute value.
     * 
     * @function
     * @param {number} index - The index of the attribute to be changed.
     * @param {number} value - The new value of the attribute.
     */
    const handleAttrChange = (index, value) => {
        const updatedAttributes = [...currentAttributes];
        updatedAttributes[index] = value;
        console.log(updatedAttributes);
        setCurrentAttributes(updatedAttributes);

    };

    /**
     * Validates the input for the character creation form.
     * 
     * @function
     * @param {Object} character - The character object to validate.
     * @param {string} character.name - The name of the character.
     * @param {Array<number>} character.attributes - The array of character attributes.
     * @param {number} character.level - The level of the character.
     * 
     * @returns {boolean} Returns true if the input is valid, otherwise false.
     */
    const handleInput = (character) => {
        if (character.name.length <= 0 || character.name.length > 20) {
            alert("Name must be between 1 and 20 characters");
            return false;
        }


        for (let i = 0; i < character.attributes.length; i++) {
            if (isNumeric(character.attributes[i]) == false || isNumeric(character.level) == false) {
                alert("Attributes and level must be integers");
                return false;
            }

            if (character.attributes[i] < 1 || character.attributes[i] > 20) {
                alert("Attributes must be between 1 and 20");
                return false;
            }
        }

        if (character.level < 1 || character.level > 20) {
            alert("Level must be between 1 and 20");
            return false;
        }
        return true;
    }

    /**
     * Handles the submission of the character creation form.
     * 
     * @function
     * Creates a new character object and sends it to the parent component if the input is valid.
     */
    const handleSubmit = () => {
        const newCharacter = {
            name: currentName,
            class: currentClass,
            level: currentLevel,
            race: currentRace,
            attributes: currentAttributes,
            description: currentDescription,
            equipment: currentEquipment,
            features: currentFeatures,
            alignment: currentAlignment,
            img: currentImage
        };

        if (handleInput(newCharacter) == true) {
            setCharacter(newCharacter);
            onCharacterChange(newCharacter); // Update the character list
        }
        else {
            alert("Character not valid");
            return;
        }

    };

    /**
  * useEffect Hook
  * 
  * Navigates back to the front page after the character has been successfully submitted.
  * 
  * @function
  * @param {Object} character - The character object that was submitted.
  * @param {Function} navigate - The navigation function from react-router-dom.
  */

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
                    <SelectAttrCheckbox
                        onSelectChange={(state) => setUseStandard(state)}
                    />

                    <Attributes
                        onAttrChange={handleAttrChange}
                        currentAttributes={currentAttributes}
                        selectStandard={useStandard}
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
                    <CharImageInput
                        onImageChange={(newImage) => setCurrentImage(newImage)}
                        selectedImage={currentImage}
                    />
                    <CharFeatureInput
                        onFeatureChange={(newFeatures) => setCurrentFeatures(newFeatures)}
                        selectedClass={currentClass}
                        selectedLevel={currentLevel}
                    />

                    <CharEquipmentInput
                        onEquipmentChange={(newEquipment) => setCurrentEquipment(newEquipment)}
                    />
                </section>


            </div>

        </>
    );
};

/**
 * Checks if a given value is numeric.
 * 
 * @function
 * @param {string} value - The value to be tested.
 * 
 * @returns {boolean} Returns true if the value is a valid number, otherwise false.
 */
function isNumeric(value) {
    //Regex from: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    return /^-?\d+$/.test(value);
}
export default CreateChar;
