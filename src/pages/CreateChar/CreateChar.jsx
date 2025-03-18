
import React, { useState, useEffect } from 'react';
import ClassDropdown from './components/CreateChar/ClassDropdown';
import RaceDropdown from './components/CreateChar/RaceDropdown';
import SkillDropdown from './components/CreateChar/SkillDropdown';
import Attributes from './components/CreateChar/CharAttributes';
function CreateChar() {
  const [currentClass,setCurrentClass] = useState();
  const [currentRace, setCurrentRace] = useState();

  let message = "Class: " + currentClass + "\n Race: "+currentRace;
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
       className ={"barbarian"} 
        />
        <Attributes />
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

