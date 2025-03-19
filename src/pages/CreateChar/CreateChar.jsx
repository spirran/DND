
import React, { useState, useEffect } from 'react';
import './CreateChar.css';

import CreateCharHeader from './components/CreateChar/CreateCharHeader';
import ClassDropdown from './components/CreateChar/ClassDropdown';
import RaceDropdown from './components/CreateChar/RaceDropdown';
//import SkillDropdown from './components/CreateChar/SkillDropdown';
import Attributes from './components/CreateChar/CharAttributes';
import CharNameInput from './components/CreateChar/CharNameInput';
import CharDescriptionInput from './components/CreateChar/CharacterDescription';
import ClassLevelInput from './components/CreateChar/ClassLevelInput';

function CreateChar() {
  const [currentClass,setCurrentClass] = useState("Barbarian");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentRace, setCurrentRace] = useState("Dragonborn");
  const [currentName, setCurrentName] = useState("player");
  const [currentDescription, setCurrentDescription] = useState("");
  let initialAttributes = [1,1,1,1,1,1,1];

  const [currentAttributes,setCurrentAttributes] = useState([initialAttributes]);

  const handleAttrChange = (index,value) =>
  {
    const updatedAttributes = [...currentAttributes];
    updatedAttributes[index] = value;
    setCurrentAttributes(updatedAttributes);

  }

  let character = {
    name: currentName,
    class:currentClass,
    level:currentLevel,
    race:currentRace,
    attributes:currentAttributes,
    description:currentDescription,
  };

  let message = "Name:  "+character.name+ "\n Class: " + character.class + "\n Level:"+ character.level +"\n Race: "+character.race + "\n Attributes:" +
  "\n Attributes:"+ character.attributes
  +"\n Description:"+ character.description
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

      <button className="createButton" id="createSubmitButton" onClick={()=>testFunction(message)}>
      Submit 
      </button>

      </div>
      
    </>
    );
  };

export default CreateChar;
//Submit button needs to clear/erase the inputs
//Need to add level, name and description
//need a back to home button
function testFunction(message)
{
  console.log(message);
}




