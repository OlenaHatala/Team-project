import React from "react";
import DayTickets from "./DayTickets";
import classes from "./Day.module.css";
import useBoardContext from '../../hooks/useBoardContext';

const Day = ({day}) => {

  
  const { timeBorders, minutePercentage } = useBoardContext();

  const hourHeight = minutePercentage * 60;

  const firstHour = timeBorders.upper.getHours();
  let hours = [firstHour];

    let i = 0;
    while (hours[i] + 1 <= timeBorders.bottom.getHours()) {
      hours.push(hours[i] + 1);
      i++;
    }

  let hourElements = [];

  for (let i = 0; i < hours.length; i++) {
    const hourElement = (
      <div key={i} className={classes.fourth} style={{ height: `${hourHeight}%` }}></div>
    );
    hourElements.push(hourElement);
  }

  return (
    <>
      <div className={classes.day}>
        <div className={classes["time-markup"]}>
          {hourElements}
        </div>
        <DayTickets day={day} />
      </div>
    </>
  );
};

export default Day;
