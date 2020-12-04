import React, { useState } from 'react';
import './App.css';
import shuffle from 'lodash.shuffle';
import difference from 'lodash.difference';
import Letter from './components/Letter';
import GuessCount from './components/GuessCount';
import GuessWord from './components/GuessWord';

const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LETTERS = SYMBOLS.split('');
const WORDS = ['MARMOTTE', 'TANOUKI', 'SOURIS', 'LAPIN'];

function App(): JSX.Element {
  const [tried, setTried] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(0);
  const [failed, setFailed] = useState<number>(0);
  const [newWord, setNewWord] = useState<string>('');

  function getFeedbackForLetter(letter: string) {
    const usedLetter = tried.includes(letter);
    if (usedLetter) {
      return 'use';
    }
    return 'not_use';
  }

  function generateWord() {
    if (newWord === '') {
      const word = shuffle(WORDS);
      const wordArr = word[0].split('');
      return wordArr;
    }
    return newWord.toUpperCase().split('');
  }
  const [shuffleWord, setShuffleWord] = useState<string[]>(generateWord);
  const won = difference(shuffleWord, tried).length === [].length;
  const lost = failed >= 11;

  function getStatusForLetter(letter: string) {
    if (shuffleWord.includes(letter) && tried.includes(letter)) {
      return 'visible';
    }
    if (lost) return 'resolve';
    return 'hidden';
  }

  function handleLetterClick(letter: string) {
    if (!won && !lost) {
      setGuesses(guesses + 1);
      tried.push(letter);
      setTried(tried);
      if (!shuffleWord.includes(letter) && tried.includes(letter))
        setFailed(failed + 1);
    }
  }

  function resetGame() {
    setShuffleWord(generateWord);
    setGuesses(0);
    setFailed(0);
    setNewWord('');
    setTried([]);
  }

  return (
    <div className="App">
      <h1>Jeu du pendu</h1>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/img/pendu${failed}.png`}
          alt="pendu_dessin"
        />
      </div>
      <div className="word">
        <h1>
          Devine le mot :&nbsp;
          {shuffleWord.map((letter, index) => (
            <GuessWord
              status={getStatusForLetter(letter)}
              letter={letter}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            />
          ))}
        </h1>
      </div>
      <div>
        <GuessCount guesses={guesses} failed={failed} />
      </div>
      <div className="clavier">
        {LETTERS.map((letter, index) => (
          <Letter
            letter={letter}
            index={index}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            feedback={getFeedbackForLetter(letter)}
            onClick={(res: string) => {
              handleLetterClick(res);
            }}
          />
        ))}
      </div>
      <div>
        {lost && (
          <div className="loose">
            <h1>PERDU !!</h1>
          </div>
        )}
        {won && (
          <div className="won">
            <h1>GAGNÉ !!</h1>
          </div>
        )}
        {(won || lost) && (
          <div className="reset">
            <label htmlFor="word">
              Choisir le prochain mot&nbsp;
              <input
                id="word"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
              />
            </label>
            <button type="submit" onClick={resetGame}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
