import React from 'react';

import './GuessWord.css';

type GuessWordTypes = {
  letter: string;
  status: string;
};
function GuessWord({ letter, status }: GuessWordTypes): JSX.Element {
  const HIDDEN_SYMBOL = ' _ ';

  function renderStatus(param: string) {
    switch (param) {
      case 'hidden':
        return <span className="hidden">{HIDDEN_SYMBOL}</span>;
      case 'visible':
        return <span className="visible">{letter}</span>;
      case 'resolve':
        return <span className="resolve">{letter}</span>;
      default:
        return HIDDEN_SYMBOL;
    }
  }

  return <>{renderStatus(status)}</>;
}

export default GuessWord;
