import React from "react";
import Day from "../Day/Day.js";
import TimeColumn from "../TimeColumn/TimeColumn.js";
import classes from "./WeekBody.module.css";
import { useSelector } from "react-redux";
import { selectTimeBorders } from "../../store/weekSlice";

const WeekBody = () => {
  const { minutePercentage, timePoints } = useSelector(selectTimeBorders);

  return (
    <div className={classes.scroll}>
      <TimeColumn
        timeBorders={timePoints}
        minutePercentage={minutePercentage}
      />
      <Day day="monday" />
      <Day day="tuesday" />
      <Day day="wednesday" />
      <Day day="thursday" />
      <Day day="friday" />
      <Day day="saturday" />
      <Day day="sunday" />
    </div>
  );
};

export default WeekBody;
