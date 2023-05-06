import React from "react";

import classes from "./AlertCounter.module.css";

export const AlertCounter = ({ value, style }) => {
  return (
    <div className={classes.counter} style={style}>
      {value}
    </div>
  );
};
