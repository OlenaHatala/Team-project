import React from "react";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { Button } from "@mui/material";
import classes from "./Buttons.module.css";

const Buttons = ({ acceptClick, denyClick, slim }) => {
  return (
    <div
      className={
        !slim ? classes["user-list-buttons"] : classes["user-list-buttons-slim"]
      }
    >
      <button onClick={acceptClick} className={classes["button-choice-accept"]}>
        <CheckCircleOutline sx={{"font-size":"20px"}}/>
      </button>
      <button onClick={denyClick} className={classes["button-choice-reject"]}>
        <HighlightOff sx={{"font-size":"20px"}}/>
      </button>
    </div>
  );
};

export default Buttons;
