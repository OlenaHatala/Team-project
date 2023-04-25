import React from "react";
import Day from "../Day/Day.js";
import TimeColumn from "../TimeColumn/TimeColumn.js";
import classes from "./WeekBody.module.css";
import { useSelector } from "react-redux";
import { selectTimeBorders } from "../../store/weekSlice";

const WeekBody = ({ onTicketApprove, onTicketDeny }) => {
  const { minutePercentage, timePoints } = useSelector(selectTimeBorders);

  return (
    <div className={classes.scroll}>
      <TimeColumn
        timeBorders={timePoints}
        minutePercentage={minutePercentage}
      />
      <Day day="monday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny}/>
      <Day day="tuesday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny}/>
      <Day day="wednesday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny}/>
      <Day day="thursday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny}/>
      <Day day="friday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny}/>
      <Day day="saturday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny}/>
      <Day day="sunday" onTicketApprove={onTicketApprove} onTicketDeny={onTicketDeny}/>
    </div>
  );
};

export default WeekBody;
