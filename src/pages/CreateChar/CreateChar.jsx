
import React, { useState, useEffect } from 'react';
import ClassDropdown from './components/CreateChar/ClassDropdown';
import RaceDropdown from './components/CreateChar/RaceDropdown';
import SkillDropdown from './components/CreateChar/SkillDropdown';
import Attributes from './components/CreateChar/CharAttributes';
function CreateChar() {
    return (
    <>
    <h1>Create your character!</h1>
       <ClassDropdown />
       <RaceDropdown />
       <SkillDropdown
       className ={"barbarian"} 
        />
        <Attributes />
    </>
    );
  };

export default CreateChar;


