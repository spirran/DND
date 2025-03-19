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
    img:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY"
  };

  const [characterList, setCharacterList] = useState([]);

  const handleCharacterChange = (character) =>
    {
      const newCharacterList = [...characterList];
      newCharacterList.push(character);
      setCharacterList(newCharacterList);
      console.log("Character" + character.name + " added");
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
      <Route path="/DiceRoller" element={<DiceRoller />} />
    </Route>
  );
  
  const router = createBrowserRouter(routeDefinitions);
  return <RouterProvider router={router} />;
}



export default App
