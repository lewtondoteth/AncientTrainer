import React, { useState, useMemo } from 'react';
import './App.css';

// Utility function to shuffle an array (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate random groups: first 5 groups of 4 letters, and 1 group of 6 letters.
function generateRandomGroups() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const shuffled = shuffleArray(alphabet);
  const groups = [];
  // Five groups of 4 letters each:
  for (let i = 0; i < 5; i++) {
    groups.push({
      label: `Group ${i + 1}`,
      letters: shuffled.slice(i * 4, i * 4 + 4)
    });
  }
  // One group of 6 letters:
  groups.push({
    label: `Group 6`,
    letters: shuffled.slice(20, 26)
  });
  return groups;
}

function App() {
  // Memoize the groups so they're created once per session.
  const randomGroups = useMemo(() => generateRandomGroups(), []);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const selectedGroup = randomGroups[selectedGroupIndex].letters;

  // Helper: pick a random letter from the current group.
  const getRandomLetter = (group) => group[Math.floor(Math.random() * group.length)];

  const [currentLetter, setCurrentLetter] = useState(getRandomLetter(selectedGroup));
  // Option order remains stable on a wrong guess; it resets on a correct answer.
  const [optionOrder, setOptionOrder] = useState([...selectedGroup]);
  const [feedback, setFeedback] = useState('');
  // Stores the letter that was selected (for highlighting)
  const [selectedOption, setSelectedOption] = useState(null);
  // Flag to indicate if the current guess is correct (for flash effect)
  const [isCorrect, setIsCorrect] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const handleGuess = (guess) => {
    if (guess === currentLetter) {
      setFeedback('✅ Correct!');
      setSelectedOption(guess);
      setIsCorrect(true);
      // Wait 1 second before resetting so the flash is visible
      setTimeout(() => {
        const newLetter = getRandomLetter(selectedGroup);
        setCurrentLetter(newLetter);
        setOptionOrder(shuffleArray(selectedGroup));
        setFeedback('');
        setSelectedOption(null);
        setIsCorrect(false);
      }, 500);
    } else {
      setFeedback('❌ Try again!');
      setSelectedOption(guess);
    }
  };

  const handleGroupChange = (groupIndex) => {
    setSelectedGroupIndex(groupIndex);
    const newGroup = randomGroups[groupIndex].letters;
    setCurrentLetter(getRandomLetter(newGroup));
    setOptionOrder(shuffleArray(newGroup));
    setFeedback('');
    setSelectedOption(null);
    setIsCorrect(false);
  };

  return (
    <div className="App">
      <h1>Ancients Alphabet Trainer</h1>
      
      {/* Group Selector */}
      <div className="group-selector">
        {randomGroups.map((group, index) => (
          <button 
            key={group.label} 
            onClick={() => handleGroupChange(index)}
            className={index === selectedGroupIndex ? 'active' : ''}
          >
            {group.label}
          </button>
        ))}
      </div>
      
      {/* Legend Toggle */}
      <label className="legend-toggle">
        <input
          type="checkbox"
          checked={showLegend}
          onChange={() => setShowLegend(!showLegend)}
        />
        Show Legend
      </label>

      {/* Legend displayed above the symbol if toggled */}
      {showLegend && (
        <div className="legend">
          {selectedGroup.map((l) => (
            <div key={l} className="legend-item">
              <span className="ancients">{l}</span> = {l}
            </div>
          ))}
        </div>
      )}
      
      {/* Challenge Section */}
      <div className="challenge">
        {/* When correct, display in normal font; otherwise in the Ancients font */}
        <p className={`symbol ${isCorrect ? 'normal' : 'ancients'}`}>
          {currentLetter}
        </p>
        <div className="options">
          {optionOrder.map((l) => (
            <button 
              key={l} 
              onClick={() => handleGuess(l)}
              className={
                selectedOption === l 
                  ? (isCorrect ? 'correct' : 'wrong') 
                  : ''
              }
            >
              {l}
            </button>
          ))}
        </div>
        <p className="feedback">{feedback}</p>
      </div>
    </div>
  );
}

export default App;
