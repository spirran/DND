import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import './App.css'
import FrontPage from './pages/FrontPage/FrontPage.jsx'
import CharSheet from './pages/CharSheet/CharSheet.jsx';
import CreateChar from './pages/CreateChar/CreateChar.jsx';
import DiceRoller from './pages/DiceRoller/DiceRoller.jsx';
import React, { useState, useEffect } from 'react';



function App() {

  let defaultCharacter = {
    name: "PlayerName",
    class:"Class",
    level:"1",
    race:"Human",
    attributes:[10,10,10,10,10,10],
    description:"this is a test character",
    alignment:"Neutral",
    img:"placeholder"
  };

  const [character,setCharacter] = useState(defaultCharacter);
  console.log(character.name + " is in app");


  const routeDefinitions = createRoutesFromElements(
    <Route>
      <Route path="/" element={<FrontPage 
        currentCharacter = {character}
         />} />

      <Route path="/CreateChar" element={<CreateChar 
      onCharacterChange = {(newCharacter) => setCharacter(newCharacter)}
      />} />
      <Route path="/CharSheet" element={<CharSheet />} />
      <Route path="/DiceRoller" element={<DiceRoller />} />
    </Route>
  );
  
  const router = createBrowserRouter(routeDefinitions);



  return <RouterProvider router={router} />;
}

export default App
