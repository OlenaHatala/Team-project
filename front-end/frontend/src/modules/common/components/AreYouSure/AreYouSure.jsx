import React from "react";

import { Modal } from "../Modal";

import classes from "./AreYouSure.module.css";

const AreYouSure = ({ title, question, onClose, onContinue }) => {
  return (
    <Modal onClose={onClose}>
      <div className={classes.container}>
        <div className={classes.info}>
          <h2>{title}</h2>
          {question ? <p>{question}</p> : null}
        </div>
        <div className={classes.actions}>
          <button
            onClick={
              onClose}
          >
            CANCEL
          </button>
          <button
            onClick={() => {
              onContinue();
              onClose();
            }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AreYouSure;
