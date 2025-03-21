
import React, { useState, useEffect } from 'react';
import './CreateChar.css';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import CreateCharHeader from './components/CreateChar/CreateCharHeader';
import ClassDropdown from './components/CreateChar/ClassDropdown';
import RaceDropdown from './components/CreateChar/RaceDropdown';
//import SkillDropdown from './components/CreateChar/SkillDropdown';
import Attributes from './components/CreateChar/CharAttributes';
import CharNameInput from './components/CreateChar/CharNameInput';
import CharDescriptionInput from './components/CreateChar/CharacterDescription';
import ClassLevelInput from './components/CreateChar/ClassLevelInput';
import AlignmentDropdown from './components/CreateChar/AlignmentDropdown';

function CreateChar({onCharacterChange}) {
  const [currentClass,setCurrentClass] = useState("Barbarian");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentRace, setCurrentRace] = useState("Dragonborn");
  const [currentName, setCurrentName] = useState("player");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentAlignment, setCurrentAlignment] = useState("");
  const navigate = useNavigate();
  let initialAttributes = [1,1,1,1,1,1,1];

  const [currentAttributes,setCurrentAttributes] = useState([initialAttributes]);
  const handleAttrChange = (index,value) =>
  {
    const updatedAttributes = [...currentAttributes];
    updatedAttributes[index] = value;
    setCurrentAttributes(updatedAttributes);

  }

  const [character,setCharacter] = useState(null);

  const handleSubmit =() =>
  {
    const newCharacter = {
      name: currentName,
      class:currentClass,
      level:currentLevel,
      race:currentRace,
      attributes:currentAttributes,
      description:currentDescription,
      alignment:currentAlignment,
      img:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY"
    };
    setCharacter(newCharacter);
    onCharacterChange(newCharacter);

  }
  
  useEffect(() => {
    if (character) {
      navigate('/'); // Navigate back to the front page after submitting
    }
  }, [character, navigate]);

    return (
    <>
      <CreateCharHeader />
      
      <div className="createPage-wrapper">
      <CharNameInput
      onNameChange={(newName) => setCurrentName(newName)}
      />

      <RaceDropdown
      selectedRace = {currentRace}
      onRaceChange = {(newRace) => setCurrentRace(newRace)}
      />

      <section className="classSection">
        <div id="classPart">
          <ClassDropdown 
          selectedClass ={currentClass}
           onClassChange={(newClass) => setCurrentClass(newClass)} 
        />
        </div>
        <div id="levelPart">
        <ClassLevelInput
        onLevelChange ={(newLevel) => setCurrentLevel(newLevel)}
        />
        </div>
      </section>
      

      <Attributes  
      onAttrChange = {handleAttrChange}
      />

      <CharDescriptionInput 
      onDescriptionChange={(newDescription) => setCurrentDescription(newDescription)}
      />

      <AlignmentDropdown 
        selectedAlignmnent = {currentAlignment}
        onAlignmentChange = {(newAlignment) => setCurrentAlignment(newAlignment)}
      />

      <button className="createButton" id="createSubmitButton" onClick={handleSubmit}>
      Submit 
      </button>
      

      </div>
      
    </>
    );
  };

export default CreateChar;




