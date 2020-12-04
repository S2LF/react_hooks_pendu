import React from 'react';

import './GuessCount.css';

type GuessCountType = {
  guesses: number;
  failed: number;
};
function GuessCount({ guesses, failed }: GuessCountType): JSX.Element {
  return (
    <div className={`guesses ${failed > 6 ? 'red' : 'green'}`}>
      Tentative : {guesses}
    </div>
  );
}
export default GuessCount;
