import React, { useEffect, useState } from 'react';
import { FingerSymbols } from '../App';
import classes from './Symbol.module.css';

type SymbolProps = {
  id: string;
  borderClasses: string;
  circleClasses: string;
  src: string;
  alt: string;
  choiceHandler?: (id: string) => void;
};

export default function Symbol({
  id,
  borderClasses,
  circleClasses,
  src,
  alt,
  choiceHandler,
}: SymbolProps) {
  const [cssClass, setCssClass] = useState('');

  useEffect(() => {
    if (alt === FingerSymbols.Rock) {
      setCssClass(alt);
    }
    if (alt === FingerSymbols.Paper) {
      setCssClass(alt);
    }
    if (alt === FingerSymbols.Scissors) {
      setCssClass(alt);
    }
    if (alt === FingerSymbols.Lizard) {
      setCssClass(alt);
    }
    if (alt === FingerSymbols.Spock) {
      setCssClass(alt);
    }
  }, []);

  if (choiceHandler === undefined) {
    return (
      <button
        type='button'
        className={borderClasses}
      >
        <div className={circleClasses}>
          <img src={src} alt={alt} />
        </div>
      </button>
    );
  }

  return (
    <div
      className={`${borderClasses} ${classes[cssClass]}`}
      onClick={() => choiceHandler(id)}
    >
      <div className={circleClasses}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Symbol.defaultProps = {
  choiceHandler: () => {},
};
