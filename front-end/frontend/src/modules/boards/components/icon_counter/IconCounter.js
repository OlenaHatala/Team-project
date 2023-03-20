import React from "react";
import { Icon } from "react-icons-kit";
import classes from './IconCounter.module.css';

const IconCounter = ({ icon, counter }) => {
  return (
    <div className={classes["table-info"]}>
      <Icon icon={icon} size={16} style={{ color: "black" }} />
      <div className={classes["count-window"]}>{counter}</div>
    </div>
  );
};

export default IconCounter;
