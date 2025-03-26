/**
 * @file App.jsx
 * @description Root component of the D&D Character Builder app, handling routing and character management.
 */

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import './App.css'
import FrontPage from './pages/FrontPage/FrontPage.jsx'
import CharSheet from './pages/CharSheet/CharSheet.jsx';
import CreateChar from './pages/CreateChar/CreateChar.jsx';
import DiceRoller from './pages/DiceRoller/DiceRoller.jsx';
import React, { useState, useEffect } from 'react';

/**
 * Root component of the app.
 * @returns {JSX.Element} The App component.
 */

function App() {
  let defaultCharacter = {
    name: "PlayerName",
    class:"Class",
    level:"1",
    race:"Human",
    attributes:[10,10,10,10,10,10],
    description:"this is a test character",
    alignment:"Neutral",
    img:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY"
  };
  const [characterList, setCharacterList] = useState([]);


  // Load character list from localStorage
  useEffect(() => {
    const loadCharactersFromStorage = () => {
      try {
        const savedCharactersJSON = localStorage.getItem('characterList');
        if (savedCharactersJSON) {
          const savedCharacters = JSON.parse(savedCharactersJSON);
          setCharacterList(savedCharacters);
        }
      } catch (error) {
        console.error("Error loading characters from localStorage:", error);
      }
    };

    loadCharactersFromStorage();
  }, []);

  useEffect(() => {
    const checkForUpdates = () => {
      // Check for updated character
      const updatedCharacterJSON = window.localStorage.getItem('updatedCharacter');
      const originalCharName = window.localStorage.getItem('originalCharacterName');
      
      if (updatedCharacterJSON && originalCharName) {
        try {
          const updatedCharacter = JSON.parse(updatedCharacterJSON);
          
          setCharacterList(prevList => {
            // Find matching character
            const updatedList = [...prevList];
            const characterIndex = updatedList.findIndex(char => char.name === originalCharName);
            
            if (characterIndex !== -1) {
              // Replace existing
              updatedList[characterIndex] = updatedCharacter;
            } else {
              // Add new character if not found
              updatedList.push(updatedCharacter);
            }
            
            // Update localStorage with the new list
            localStorage.setItem('characterList', JSON.stringify(updatedList));
            
            return updatedList;
          });
          
          // Clear localStorage after updating
          window.localStorage.removeItem('updatedCharacter');
          window.localStorage.removeItem('originalCharacterName');
        } catch (error) {
          console.error("Error parsing updated character:", error);
        }
      }
      
      // Check for delete
      const deletedCharacterName = window.localStorage.getItem('deleteCharacter');
      if (deletedCharacterName) {
        // Update the state to remove
        setCharacterList(prevList => {
          const updatedList = prevList.filter(char => char.name !== deletedCharacterName);
          
          // Update localStorage with new list
          localStorage.setItem('characterList', JSON.stringify(updatedList));
          
          return updatedList;
        });
        
        // Clear localStorage flag
        window.localStorage.removeItem('deleteCharacter');
      }
    };

    checkForUpdates();

    // event listener for storage change
    window.addEventListener('storage', checkForUpdates);

    const intervalId = setInterval(checkForUpdates, 1000);
    

    return () => {
      window.removeEventListener('storage', checkForUpdates);
      clearInterval(intervalId);
    };
  }, []);

  const handleCharacterChange = (character) => {
    const newCharacterList = [...characterList];
    newCharacterList.push(character);
    setCharacterList(newCharacterList);
    
    localStorage.setItem('characterList', JSON.stringify(newCharacterList));
    
    console.log("Character " + character.name + " added");
  }

  const routeDefinitions = createRoutesFromElements(
    <Route>
      <Route path="/" element={<FrontPage 
        currentCharacterList = {characterList}
         />} />

      <Route path="/CreateChar" element={<CreateChar 
      onCharacterChange = {handleCharacterChange}
      />} />
      <Route path="/CharSheet" element={<CharSheet />} />
      <Route path="/DiceRoller" element={<DiceRoller 
        currentCharacterList = {characterList}/>} />
    </Route>
  );
  
  const router = createBrowserRouter(routeDefinitions);
  return <RouterProvider router={router} />;
}

export default App