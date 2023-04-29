import React from "react";
import Day from "../Day/Day.js";
import TimeColumn from "../TimeColumn/TimeColumn.js";
import classes from "./WeekBody.module.css";
import { useSelector } from "react-redux";
import { selectTimeBorders } from "../../store/weekSlice";

const WeekBody = ({ onTicketApprove, onTicketDeny, onTicketDelete, onTicketTake }) => {
  const { minutePercentage, timePoints } = useSelector(selectTimeBorders);

  return (
    <div className={classes.scroll}>
      <div className={classes.days}>
      <TimeColumn
        timeBorders={timePoints}
        minutePercentage={minutePercentage}
      />
      <Day day="monday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny} onTicketDelete={onTicketDelete} onTicketTake={onTicketTake}/>
      <Day day="tuesday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny} onTicketDelete={onTicketDelete} onTicketTake={onTicketTake}/>
      <Day day="wednesday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny} onTicketDelete={onTicketDelete} onTicketTake={onTicketTake}/>
      <Day day="thursday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny} onTicketDelete={onTicketDelete} onTicketTake={onTicketTake}/>
      <Day day="friday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny} onTicketDelete={onTicketDelete} onTicketTake={onTicketTake}/>
      <Day day="saturday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny} onTicketDelete={onTicketDelete} onTicketTake={onTicketTake}/>
      <Day day="sunday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny} onTicketDelete={onTicketDelete} onTicketTake={onTicketTake}/>
    </div>
    </div>
  );
};

export default WeekBody;
