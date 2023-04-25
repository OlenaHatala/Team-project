import React from "react";

import { Modal } from "../Modal";

import classes from "./AreYouSure.module.css";

const AreYouSure = ({ title, question, onClose, onContinue }) => {
  return (
    <Modal>
      <div className={classes.container}>
        <div className={classes.info}>
          <h2>{title}</h2>
          <p>{question}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={onClose}>NO</button>
          <button
            onClick={() => {
              onContinue();
              onClose();
            }}
          >
            YES
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AreYouSure;
