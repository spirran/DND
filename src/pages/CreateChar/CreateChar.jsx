
import React, { useState, useEffect } from 'react';
import ClassDropdown from './components/CreateChar/ClassDropdown';
import RaceDropdown from './components/CreateChar/RaceDropdown';
import SkillDropdown from './components/CreateChar/SkillDropdown';
import Attributes from './components/CreateChar/CharAttributes';
function CreateChar() {
  const [currentClass,setCurrentClass] = useState();
  const [currentRace, setCurrentRace] = useState();

  let initialAttributes = ["","","","","","",""];

  const [currentAttributes,setCurrentAttributes] = useState([initialAttributes]);

  const handleAttrChange = (index,value) =>
  {
    const updatedAttributes = [...currentAttributes];
    updatedAttributes[index] = value;
    setCurrentAttributes(updatedAttributes);

  }

  let message = "Class: " + currentClass + "\n Race: "+currentRace + "\n Attributes:"
  +"\n Strength: "+currentAttributes[0] +
  "\n Dexterity: "+currentAttributes[1] +
  "\n Constitution: "+currentAttributes[2] +
  "\n Intelligence: "+currentAttributes[3] +
  "\n Wisdom: "+currentAttributes[4] +
  "\n Charisma: "+currentAttributes[5];
    return (
    <>
    <h1>Create your character!</h1>
       <ClassDropdown 
       selectedClass ={currentClass}
        onClassChange={(newClass) => setCurrentClass(newClass)} 
      />

      <RaceDropdown
      selectedRace = {currentRace}
      onRaceChange = {(newRace) => setCurrentRace(newRace)}
      />

       <SkillDropdown
       className ={currentClass} 
        />

        <Attributes  
        selectedAttributes = {currentAttributes}
        onAttrChange = {handleAttrChange}
    
        />

        <button onClick={()=>testFunction(message)}>
        Submit
        </button>
    </>
    );
  };

export default CreateChar;

function testFunction(message)
{
  console.log(message);
}




