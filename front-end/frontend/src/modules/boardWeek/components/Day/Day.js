import React from "react";
import DayTickets from "../DayTickets/DayTickets";
import classes from "./Day.module.css";

import { useSelector } from "react-redux";
import { selectTimeBorders, selectDates } from "../../store/weekSlice";
import { monthByIndex, weekDayToUpperCase } from "../../utils/weekDay";

const Day = ({ day, onTicketApprove, onTicketDeny,  onTicketDelete, onTicketTake }) => {
  const { timePoints, minutePercentage } = useSelector(selectTimeBorders);
  const dates = useSelector(selectDates);
  const dayNumbers = dates[day];
  const borderDates = {
    upper: new Date(timePoints.upper),
    bottom: new Date(timePoints.bottom),
  };

  const hourHeight = minutePercentage * 60;

  const firstHour = borderDates.upper.getHours();
  let hours = [firstHour];

  let i = 0;
  while (hours[i] + 1 <= borderDates.bottom.getHours()) {
    hours.push(hours[i] + 1);
    i++;
  }

  let hourElements = [];

  for (let i = 0; i < hours.length; i++) {
    const hourElement = (
      <div
        key={i}
        className={classes.fourth}
        style={{ height: `${hourHeight}%` }}
      ></div>
    );
    hourElements.push(hourElement);
  }

  return (
    <>
      <div className={classes.day}>
        <div className={classes["week-header"]}>{`${weekDayToUpperCase[day]}${
          dayNumbers?.day
            ? ", " +
              dayNumbers?.day +
              " " +
              monthByIndex[dayNumbers?.month].slice(0, 3)
            : ""
        }`}</div>
        <div className={classes["time-markup"]}>{hourElements}</div>
        <DayTickets day={day} onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny} onTicketDelete={onTicketDelete} onTicketTake={onTicketTake}/>
      </div>
    </>
  );
};

export default Day;
