import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



function CharacterBrowser({characterList}) {
/*
  const placeholderCharacters = [
    {
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY",
        name: character.name,
        level: character.level,
        class: character.class
      },
      {
        image: "https://i.pinimg.com/736x/af/7a/19/af7a194a8f2e759408ddaca3e1f5783e.jpg",
        name: "Jaina",
        level: 17,
        class: "Fighter"
      },
      {
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6BxQy30QTJ0xs2dH44TQPwcota6v4dFDO479kTRptRCJw8aCY",
        name: "Thrall",
        level: 2,
        class: "Ranger"
      }
  ];
*/
let placeholderCharacters = characterList;
  const [characters, setCharacters] = useState(placeholderCharacters);

  useEffect(() => {
    setCharacters(characterList || []);
    console.log("Character list updated:", characterList);
  }, [characterList]);

  if(characters.length === 0) {
    return <p>No characters created yet</p>
  }

    return (
            <div className='browser-wrapper'>
                <h2>Characters</h2>
                {characters.map((char, index) => (
                    <div key={index} className="browser-card">
                        <Link to={'/CharSheet'}>
                            <img src={char.img} alt={char.name} className="browser-portrait" />
                            <div className="hidden-text-wrapper">
                                <p className="hidden-text">{char.name}</p>
                                <p className="hidden-text">Level {char.level}</p>
                                <p className="hidden-text">{char.class}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
    );
}

export default CharacterBrowser;