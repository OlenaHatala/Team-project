import React from "react";
import WeekHeader from "./WeekHeader";
import WeekBody from "./WeekBody";
import classes from "./Week.module.css";

const Week = ({ onShowTicketForm }) => {
  return (
    <div className={classes.container}>
      <div className={classes["days-container"]}>
        <div className={classes.card}>
            <WeekHeader onShowTicketForm={onShowTicketForm} />
          <WeekBody />
        </div>
      </div>
    </div>
  );
};

export default Week;
