import React, { useCallback, useEffect, useState } from 'react';
import logo from './assets/images/logo-bonus.svg';
import pentagon from './assets/images/bg-pentagon.svg';
import scissors from './assets/images/icon-scissors.svg';
import paper from './assets/images/icon-paper.svg';
import lizard from './assets/images/icon-lizard.svg';
import spock from './assets/images/icon-spock.svg';
import rock from './assets/images/icon-rock.svg';
import Modal from './components/Modal';
import Symbol from './components/Symbol';

export enum FingerSymbols {
  Rock = 'rock',
  Paper = 'paper',
  Lizard = 'lizard',
  Scissors = 'scissors',
  Spock = 'spock',
}

type Symbols = {
  id: string;
  src: string;
  alt: string;
  name: string;
  beats: [string, string];
};

const symbols: Symbols[] = [
  {
    id: 's1',
    src: rock,
    alt: FingerSymbols.Rock,
    name: FingerSymbols.Rock,
    beats: [FingerSymbols.Lizard, FingerSymbols.Scissors],
  },
  {
    id: 's2',
    src: paper,
    alt: FingerSymbols.Paper,
    name: FingerSymbols.Paper,
    beats: [FingerSymbols.Rock, FingerSymbols.Spock],
  },
  {
    id: 's3',
    src: scissors,
    alt: FingerSymbols.Scissors,
    name: FingerSymbols.Scissors,
    beats: [FingerSymbols.Paper, FingerSymbols.Lizard],
  },
  {
    id: 's4',
    src: lizard,
    alt: FingerSymbols.Lizard,
    name: FingerSymbols.Lizard,
    beats: [FingerSymbols.Spock, FingerSymbols.Paper],
  },
  {
    id: 's5',
    src: spock,
    alt: FingerSymbols.Spock,
    name: FingerSymbols.Spock,
    beats: [FingerSymbols.Scissors, FingerSymbols.Rock],
  },
];

const initialScore = localStorage.getItem('score') || 0;

function App() {
  const [showRules, setShowRules] = useState(false);
  const [score, setScore] = useState(+initialScore);
  const [userChoice, setUserChoice] = useState<Symbols>();
  const [computerChoice, setComputerChoice] = useState<Symbols>();
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [whoWin, setWhoWin] = useState('');

  const compareChoices = useCallback(() => {
    if (!userChoice || !computerChoice) {
      return;
    }
    const user = userChoice.beats.includes(computerChoice.name);
    const computer = computerChoice.beats.includes(userChoice.name);

    if (user) {
      setScore((prevState) => prevState + 1);
      setWhoWin('You win');
    }
    if (computer) {
      if (score > 0) {
        setScore((prevState) => prevState - 1);
      }
      setWhoWin('You lose');
    }
    if (!user && !computer) {
      setWhoWin('Draw');
    }
    setIsGameFinished(true);
  }, [setScore, userChoice, computerChoice, setWhoWin]);

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    setComputerChoice(symbols[randomIndex]);
  };

  const getUserChoice = (id: string) => {
    const index = symbols.findIndex((symbol) => symbol.id === id);
    setUserChoice(symbols[index]);

    setTimeout(() => {
      getComputerChoice();
    }, 1000);
  };

  const showRulesHandler = () => {
    setShowRules((prevState) => !prevState);
  };

  const restartGame = () => {
    setIsGameFinished(false);
    setComputerChoice(undefined);
    setUserChoice(undefined);
    setWhoWin('');
  };

  useEffect(() => {
    setTimeout(() => {
      compareChoices();
    }, 500);
    localStorage.setItem('score', score.toString());
  }, [compareChoices]);

  return (
    <div className='wrapper'>
      <div className='app'>
        <header className='header'>
          <h1>
            <img src={logo} alt='Rock, paper, scissors, lizard, spock' />
          </h1>
          <div className='score-container'>
            <p>Score</p>
            <p>{score}</p>
          </div>
        </header>
        <main className='main'>
          {!userChoice && (
          <div className='symbols-container'>
            <img src={pentagon} alt='' className='pentagon' />
            {symbols.map((symbol) => (
              <Symbol
                key={symbol.id}
                id={symbol.id}
                alt={symbol.alt}
                borderClasses={`${symbol.alt} border`}
                circleClasses='circle'
                src={symbol.src}
                choiceHandler={() => getUserChoice(symbol.id)}
              />
            ))}
          </div>
          )}
          {userChoice !== undefined && (
          <div className='picked-wrapper'>
            <div className={`${whoWin === 'You win' ? 'winner-circle' : ''}`}>
              <Symbol
                borderClasses='picked-border'
                circleClasses='picked-circle'
                src={userChoice.src}
                alt={userChoice.alt}
                id={userChoice.id}
              />
            </div>
              {computerChoice !== undefined && (
              <div className={`${whoWin === 'You lose' ? 'winner-circle' : ''}`}>
                <Symbol
                  borderClasses='picked-border picked-border-computer'
                  circleClasses='picked-circle'
                  src={computerChoice.src}
                  alt={computerChoice.alt}
                  id={computerChoice.id}
                />
              </div>
              )}
              {!computerChoice && <div className='choice-placeholder' />}
            <p className='user-text'>You picked</p>
            <p className='computer-text'>The house picked</p>
            <div className={`${isGameFinished ? 'show' : 'hide'} result`}>
              <h2>{whoWin}</h2>
              <button type='button' onClick={restartGame}>Play again</button>
            </div>
          </div>
          )}
          {showRules && <Modal closeHandler={showRulesHandler} />}
          <button type='button' onClick={showRulesHandler} className='rules'>
            rules
          </button>
        </main>
        <footer>
          <div className='attribution'>
            Challenge by
            <a href='https://www.frontendmentor.io?ref=challenge' target='_blank' rel='noreferrer'>Frontend Mentor</a>
            .
            Coded by
            <a href='https://www.frontendmentor.io/profile/wojtek0123'>wojtek0123</a>
            .
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
