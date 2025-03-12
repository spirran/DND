
import React, { useState, useEffect } from 'react';
import ClassDropdown from './components/ClassDropdown';
import RaceDropdown from './components/RaceDropdown';
import SkillDropdown from './components/SkillDropdown';
import Attributes from './components/CharAttributes';
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


