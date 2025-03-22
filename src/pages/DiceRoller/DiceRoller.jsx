/**
 * @fileoverview D&D Character Builder with dicerolling function
 * This component provides a visual dice roller with SVG representation
 * 
 * @module DiceRoller
 * @requires React
 */

import './DiceRoller.css';
import React, { useState, useEffect } from 'react';

/**
 * The apps header and title
 * @returns {React.ReactElement} Header component
 */
function Header() {
    return (
        <div className="header-wrapper">
            <header>
                <h1>D&D Character Builder</h1>
            </header>
        </div>
    );
}

/**
 * Component for character browser
 * @returns {React.ReactElement} Character browser component
 */
function CharacterBrowser() {
    return (
        <div className='browser-wrapper'>

        </div>
    );
}

/**
 * This function will "paint" the dices and make every button to have a listner
 * 
 * @param {Object} props - Component props 
 * @param {string} props.diceType - The die to render
 * @param {string} props.color - Color for the specific die
 * @param {Function} props.handleRoll - Function to call when dice is rolled 
 * @returns {React.ReactElement} Dicebutton component
 */
function DiceButton({ diceType, color, handleRoll }) {
    /**
     * Renders the dice based on type
     * @returns {React.ReactElement|null} SVG of all dices
     */
    const renderDiceSVG = () => {
        switch (diceType) {
            case 'D4':
                return (
                    <svg viewBox="0 0 100 100" className="dice-svg">
                        <polygon points="50,10 10,80 90,80" fill={color} stroke="black" strokeWidth="2" />
                        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">4</text>
                    </svg>
                );
            case 'D6':
                return (
                    <svg viewBox="0 0 100 100" className="dice-svg">
                        <rect x="20" y="20" width="60" height="60" fill={color} stroke="black" strokeWidth="2" rx="5" />
                        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">6</text>
                    </svg>
                );
            case 'D8':
                return (
                    <svg viewBox="0 0 100 100" className="dice-svg">
                        <polygon points="50,10 90,50 50,90 10,50" fill={color} stroke="black" strokeWidth="2" />
                        <line x1="10" y1="50" x2="50" y2="62" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="50" y1="62" x2="90" y2="50" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="50" y1="62" x2="50" y2="90" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="50" y1="42" x2="50" y2="10" fill={color} stroke="black" strokeWidth="1" />
                        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">8</text>
                    </svg>
                );
            case 'D10':
                return (
                    <svg viewBox="0 0 100 100" className="dice-svg">
                        <polygon points="50,10 90,50 50,90 10,50" fill={color} stroke="black" strokeWidth="2" />
                        <line x1="10" y1="50" x2="50" y2="62" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="50" y1="62" x2="90" y2="50" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="50" y1="90" x2="50" y2="62" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="30" y1="55" x2="50" y2="10" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="70" y1="55" x2="50" y2="10" fill={color} stroke="black" strokeWidth="1" />
                        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">10</text>
                    </svg>
                );
            case 'D12':
                return (
                    <svg viewBox="0 0 100 100" className="dice-svg">
                        <polygon points="50,10 75,20 90,40 90,60 75,80 50,90 25,80 10,60 10,40 25,20" fill={color} stroke="black" strokeWidth="2" />
                        <line x1="50" y1="10" x2="50" y2="30" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="10" y1="40" x2="30" y2="45" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="25" y1="80" x2="35" y2="70" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="75" y1="80" x2="65" y2="70" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="90" y1="40" x2="70" y2="45" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="50" y1="30" x2="70" y2="45" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="70" y1="45" x2="65" y2="70" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="65" y1="70" x2="35" y2="70" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="35" y1="70" x2="30" y2="45" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="30" y1="45" x2="50" y2="30" fill={color} stroke="black" strokeWidth="1" />
                        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">12</text>
                    </svg>
                );
            case 'D20':
                return (
                    <svg viewBox="0 0 100 100" className="dice-svg">
                        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill={color} stroke="black" strokeWidth="2" />
                        <line x1="10" y1="30" x2="90" y2="30" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="10" y1="70" x2="90" y2="70" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="50" y1="10" x2="50" y2="30" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="50" y1="30" x2="25" y2="70" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="50" y1="30" x2="75" y2="70" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="25" y1="70" x2="10" y2="30" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="75" y1="70" x2="90" y2="30" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="25" y1="70" x2="50" y2="90" fill={color} stroke="black" strokeWidth="1" />
                        <line x1="75" y1="70" x2="50" y2="90" fill={color} stroke="black" strokeWidth="1" />
                        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">20</text>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <button className="dice-button" onClick={() => { handleRoll(diceType); }}>
            <div className="dice-svg-container">
                {renderDiceSVG()}
            </div>
            <div className="dice-label">
                Roll {diceType}
            </div>
        </button>
    );
}

/**
 * Roll history component that displays previous dice rolls
 * @param {Object} props - Component props
 * @param {Array} props.rollHistory - Array of roll history objects
 * @param {Function} props.clearHistory - Function to clear roll history
 * @returns {React.ReactElement} Roll history component
 */
function RollHistoryBoard({ rollHistory, clearHistory }) {
    return (
        <div className="roll-history-board">
            <div className="roll-history-header">
                <h2>Roll History</h2>
                <button onClick={clearHistory} className="clear-history-btn">Clear History</button>
            </div>
            <div className="roll-history-content">
                {rollHistory.length === 0 ? (
                    <p className="no-rolls">No rolls yet</p>
                ) : (
                    <ul className="roll-list">
                        {rollHistory.map((roll, index) => (
                            <li key={index} className="roll-item" style={{ borderLeftColor: roll.color }}>
                                <span className="roll-dice-type">{roll.diceType}</span>
                                <span className="roll-result">{roll.result}</span>
                                <span className="roll-timestamp">{roll.timestamp}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

const RollHistoryContext = React.createContext();

/**
 * Provider component for roll history context
 * @param {Object} props - Component props
 * @returns {React.ReactElement} Provider component
 */
export function RollHistoryProvider({ children }) {
    const [rollHistory, setRollHistory] = useState(() => {
        const savedRolls = localStorage.getItem('dndRollHistory');
        return savedRolls ? JSON.parse(savedRolls) : [];
    });

    const [lastResult, setLastResult] = useState(() => {
        const savedResult = localStorage.getItem('dndLastResult');
        return savedResult ? parseInt(savedResult, 10) : 0;
    });

    useEffect(() => {
        const savedRolls = localStorage.getItem('dndRollHistory');
        if (savedRolls) {
            setRollHistory(JSON.parse(savedRolls));
        }

        const savedResult = localStorage.getItem('dndLastResult');
        if (savedResult) {
            setLastResult(parseInt(savedResult, 10));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('dndRollHistory', JSON.stringify(rollHistory));
    }, [rollHistory]);

    useEffect(() => {
        localStorage.setItem('dndLastResult', lastResult.toString());
    }, [lastResult]);

    const clearHistory = () => {
        setRollHistory([]);
        setLastResult(0);
        localStorage.removeItem('dndRollHistory');
        localStorage.removeItem('dndLastResult');
    };

    const addRoll = (newRoll) => {
        setLastResult(newRoll.result);
        setRollHistory(prevHistory => [newRoll, ...prevHistory.slice(0, 19)]);
    };

    return (
        <RollHistoryContext.Provider value={{
            rollHistory,
            lastResult,
            clearHistory,
            addRoll
        }}>
            {children}
        </RollHistoryContext.Provider>
    );
}

/**
 * Custom hook to use roll history context
 * @returns {Object} Roll history context
 */
export const useRollHistory = () => React.useContext(RollHistoryContext);

/**
 * Rolling interface component, display all the dices and result
 * @returns {React.ReactElement} Main dice component
 */
function MainDice() {
    const { rollHistory, lastResult, clearHistory, addRoll } = useRollHistory();

    const diceTypes = [
        { type: 'D4', color: '#FF5252' },
        { type: 'D6', color: '#FF9800' },
        { type: 'D8', color: '#FFEB3B' },
        { type: 'D10', color: '#4CAF50' },
        { type: 'D12', color: '#2196F3' },
        { type: 'D20', color: '#9C27B0' }
    ];

    /**
     * Get the color for a specific dice type
     * @param {string} diceType - Type of die
     * @returns {string} Color for the die
     */
    const getDiceColor = (diceType) => {
        const dice = diceTypes.find(d => d.type === diceType);
        return dice ? dice.color : '#333';
    };

    /**
     * 
     * @param {string} diceType - Type of die to roll
     */
    const handleRoll = (diceType) => {
        const rolledResult = RollDie(diceType);

        const newRoll = {
            diceType,
            result: rolledResult,
            timestamp: new Date().toLocaleTimeString(),
            color: getDiceColor(diceType)
        };

        addRoll(newRoll);
    };


    /**
     * 
     * @param {string} dieType - Type of die to roll
     * @returns {number} Random result from rolling a die
     */
    const RollDie = (dieType) => {
        switch (dieType) {
            case 'D4':
                return Math.floor(Math.random() * 4 + 1);
            case 'D6':
                return Math.floor(Math.random() * 6 + 1);
            case 'D8':
                return Math.floor(Math.random() * 8 + 1);
            case 'D10':
                return Math.floor(Math.random() * 10 + 1);
            case 'D12':
                return Math.floor(Math.random() * 12 + 1);
            case 'D20':
                return Math.floor(Math.random() * 20 + 1);
            default:
                return 0;
        }
    };

    const rows = [];
    for (let i = 0; i < diceTypes.length; i += 3) {
        const rowDice = diceTypes.slice(i, i + 3);
        rows.push(
            <div key={`row-${i}`} className="dice-row">
                {rowDice.map((dice) => (
                    <DiceButton
                        key={dice.type}
                        diceType={dice.type}
                        color={dice.color}
                        handleRoll={handleRoll}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className='main-content-wrapper'>
            <div className='main-dice-wrapper'>
                <h1>Dice Roller</h1>
                {rows}
                <p className="current-roll-result">Result: <span className="result-value">{lastResult}</span></p>
            </div>
            <RollHistoryBoard rollHistory={rollHistory} clearHistory={clearHistory} />
        </div>
    );
}

/**
 * Main component for the app
 * Renders header, dice roller and character browser
 * @returns {React.ReactElement} DiceRoller component
 */
function DiceRoller() {
    return (
        <>
            <RollHistoryProvider>
                <Header />
                <div id='main-section-wrapper'>
                    <CharacterBrowser />
                    <MainDice />
                </div>
            </RollHistoryProvider>
        </>
    );
}

export default DiceRoller;