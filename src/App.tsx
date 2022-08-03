import React, { useState } from 'react'
import logo from './assets/images/logo-bonus.svg'
import pentagon from './assets/images/bg-pentagon.svg'
import scissors from './assets/images/icon-scissors.svg'
import paper from './assets/images/icon-paper.svg'
import lizard from './assets/images/icon-lizard.svg'
import spock from './assets/images/icon-spock.svg'
import rock from './assets/images/icon-rock.svg'
import Modal from './components/Modal'
import './App.css'

export enum Symbols {
  Rock = 'rock',
  Paper = 'paper',
  Lizard = 'lizard',
  Scissors = 'scissors',
  Spock = 'spock',
}

const symbols = [
  {
    id: 's1',
    src: rock,
    alt: Symbols.Rock,
    name: Symbols.Rock,
  },
  {
    id: 's2',
    src: paper,
    alt: Symbols.Paper,
    name: Symbols.Paper,
  },
  {
    id: 's3',
    src: scissors,
    alt: Symbols.Scissors,
    name: Symbols.Scissors,
  },
  {
    id: 's4',
    src: lizard,
    alt: Symbols.Lizard,
    name: Symbols.Lizard,
  },
  {
    id: 's5',
    src: spock,
    alt: Symbols.Spock,
    name: Symbols.Spock,
  },
]

function App() {
  const [showRules, setShowRules] = useState(false)

  const showRulesHandler = () => {
    setShowRules((prevState) => !prevState)
  }

  return (
    // <div className='app'>
    <div className='wrapper'>
      <div className='app'>
        <header className='header'>
          <h1>
            <img src={logo} alt='Rock, paper, scissors, lizard, spock' />
          </h1>
          <div className='score-container'>
            <p>Score</p>
            <p>12</p>
          </div>
        </header>
        <main className='main'>
          <div className='symbols-container'>
            <img src={pentagon} alt='' className='pentagon' />
            {symbols.map((symbol) => (
              <button key={symbol.id} className={`${symbol.alt} border`}>
                <div key={symbol.id} className={`circle`}>
                  <img src={symbol.src} alt={symbol.alt} />
                </div>
              </button>
            ))}
          </div>
          {showRules && <Modal closeHandler={showRulesHandler} />}
          <button type='button' onClick={showRulesHandler} className='rules'>
            rules
          </button>
        </main>
        {/* <footer>
        <div className='attribution'>
          Challenge by
          <a href='https://www.frontendmentor.io?ref=challenge' target='_blank' rel='noreferrer'>Frontend Mentor</a>
          .
          Coded by
          <a href='https://www.frontendmentor.io/profile/wojtek0123'>wojtek0123</a>
          .
        </div>
      </footer> */}
      </div>
    </div>
    // </div>
  )
}

export default App

