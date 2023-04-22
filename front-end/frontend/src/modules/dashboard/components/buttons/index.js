import React from 'react';
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { Button } from '@mui/material';
import classes from './Buttons.module.css';

const Buttons = (props) => {
  return (
    <div className={classes["user-list-buttons"]}>
      <Button variant="contained" onClick={props.acceptClick}><CheckCircleOutline className={classes["button-choice-accept"]} /></Button>
      <Button variant="contained" onClick={props.denyClick}><HighlightOff className={classes["button-choice-deny"]} /></Button>
    </div>
  );
};

export default Buttons;