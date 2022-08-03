import React from 'react'
import ReactDOM from 'react-dom'
import rulesImage from '../assets/images/image-rules-bonus.svg'
import closeIcon from '../assets/images/icon-close.svg'
import classes from './Modal.module.css'

const modalRoot = document.getElementById('modal-root')!

type ModalProps = {
  closeHandler: () => void
}

function RulesModal({ closeHandler }: ModalProps) {
  return (
    <>
      <div className={`${classes.modal} ${classes.show}`}>
        <div className={classes.container}>
          <h2>Rules</h2>
          <button
            type='button'
            className={classes.closeDesktop}
            onClick={closeHandler}>
            <img src={closeIcon} alt='Close rules modal' />
          </button>
        </div>
        <img src={rulesImage} alt='Game rules' />
        <button
          type='button'
          className={classes.closeMobile}
          onClick={closeHandler}>
          <img src={closeIcon} alt='Close rules modal' />
        </button>
      </div>
      <div className={classes.shadow}></div>
    </>
  )
}

function Modal({ closeHandler }: ModalProps) {
  return ReactDOM.createPortal(
    <RulesModal closeHandler={closeHandler} />,
    modalRoot
  )
}

export default Modal
