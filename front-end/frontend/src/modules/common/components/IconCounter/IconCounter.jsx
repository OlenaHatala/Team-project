import React from "react";

import classes from "./IconCounter.module.css";
import { AlertCounter } from "../AlertCounter";

export const IconCounter = ({ children, value, style, showZero = false }) => {
  return (
    <div className={classes.wrapper} style={style}>
      <div
        className={classes["icon-wrapper"]}
        style={{ marginRight: value === 0 && !showZero ? "20px" : "0" }}
      >
        {children}
      </div>
      {(value !== 0 || showZero) && (
        <AlertCounter
          value={value}
          style={{ position: "relative", right: "15px", top: "-4px" }}
        />
      )}
    </div>
  );
};
