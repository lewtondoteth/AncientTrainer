import React, { useState } from 'react';
import './App.css';

// Simple A-Z cipher mapping
const cipher = {
  A: 'A', B: 'B', C: 'C', D: 'D', E: 'E',
  F: 'F', G: 'G', H: 'H', I: 'I', J: 'J',
  K: 'K', L: 'L', M: 'M', N: 'N', O: 'O',
  P: 'P', Q: 'Q', R: 'R', S: 'S', T: 'T',
  U: 'U', V: 'V', W: 'W', X: 'X', Y: 'Y', Z: 'Z',
};

const letters = Object.keys(cipher);

function App() {
  const [showLegend, setShowLegend] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(
    letters[Math.floor(Math.random() * letters.length)]
  );
  const [feedback, setFeedback] = useState('');

  const handleGuess = (guess) => {
    if (guess === currentLetter) {
      setFeedback('✅ Correct!');
      setCurrentLetter(letters[Math.floor(Math.random() * letters.length)]);
    } else {
      setFeedback('❌ Try again!');
    }
  };

  return (
    <div className="App">
      <h1>Ancients Alphabet Trainer</h1>
      
      <label className="legend-toggle">
        <input
          type="checkbox"
          checked={showLegend}
          onChange={() => setShowLegend(!showLegend)}
        />
        Show Legend
      </label>

      {showLegend && (
        <div className="legend">
          {letters.map((l) => (
            <div key={l} className="legend-item">
              <span className="ancients">{cipher[l]}</span> = {l}
            </div>
          ))}
        </div>
      )}

      {/* Test line for verifying the Ancients font */}
      <p className="ancients">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>

      <div className="challenge">
        <p className="ancients symbol">{cipher[currentLetter]}</p>
        <div className="options">
          {letters.map((l) => (
            <button key={l} onClick={() => handleGuess(l)}>
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
