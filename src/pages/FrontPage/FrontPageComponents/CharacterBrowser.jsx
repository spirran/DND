import BrowserCard from "./BrowserCard";
import { useState } from "react";



function CharacterBrowser() {

    // Placeholder list to simulate data from localStorage
  const placeholderCharacters = [
    {
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY",
      name: "Arthas",
      level: 80,
      class: "Death Knight"
    },
    {
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY",
      name: "Jaina",
      level: 75,
      class: "Mage"
    },
    {
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY",
      name: "Thrall",
      level: 85,
      class: "Shaman"
    }
  ];

  const [characters, setCharacters] = useState(placeholderCharacters);

  if(characters.length === 0) {
    return <p>No characters created yet</p>
  }

    return (
            <div className='browser-wrapper'>
                <h2>Characters</h2>
                {characters.map((char, index) => (
                    <div key={index} className="browser-card">
                        <img src={char.image} alt={char.name} className="browser-portrait" />
                        <div className="hidden-text-wrapper">
                            <p className="hidden-text">{char.name}</p>
                            <p className="hidden-text">Level {char.level}</p>
                            <p className="hidden-text">{char.class}</p>
                        </div>
                    </div>
                ))}
            </div>
    );
}

export default CharacterBrowser;