import React, { useCallback } from "react";
import classes from "./DayTickets.module.css";
import useBoardContext from '../../hooks/useBoardContext';

import { useSelector } from "react-redux";
import { selectBoard } from "./boardSlice";

const timeString = (date) => {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let minutesStr = "";
  let hoursStr = "";

  if (minutes < 10) {
    minutesStr = "0" + minutes.toString();
  } else {
    minutesStr = minutes.toString();
  }

  if (hours < 10) {
    hoursStr = "0" + hours.toString();
  } else {
    hoursStr = hours.toString();
  }

  return hoursStr + minutesStr;
}

const sortTickets = (tickets) => {
  tickets.sort(function (a, b) {
    if(timeString(a.date) < timeString(b.date)) { return -1; }
    if(timeString(a.date) > timeString(b.date)) { return 1; }
    return 0;
  });
  return tickets;
}

const DayTickets = ({ day }) => {
  const { timeBorders, tickets, minutePercentage } = useSelector(selectBoard);
  const dayTickets = tickets[0][day];

  const createDayArray = useCallback(
    (dayTickets) => {
      const sortedTickets = sortTickets([...dayTickets]);

      let dayArray = [];

      let prevEndDate = timeBorders.upper;

      for (var i = 0; i < sortedTickets.length; i++) {
        const currentTicket = sortedTickets[i];
        const currentStart = currentTicket.date.getHours() * 60
         + currentTicket.date.getMinutes();

        const prevEnd = prevEndDate.getHours() * 60
        + prevEndDate.getMinutes();

        if (currentStart - prevEnd > 0) {
          dayArray.push({
            id: `${i + 1000}`,
            type: "emptytime",
            date: prevEndDate,
            duration: currentStart - prevEnd,
          });
        }
        const id = i.toString();
        dayArray.push({...currentTicket, id: currentTicket.id + id});
        prevEndDate = new Date(
          currentTicket.date.getTime() +
          currentTicket.duration * 1000 * 60
        );
      }


      if (timeBorders.bottom.getHours().toString() + timeBorders.bottom.getMinutes().toString()
      > prevEndDate.getHours().toString() + prevEndDate.getMinutes().toString()) {
        dayArray.push({
          id: "999",
          type: "emptytime",
          date: prevEndDate,
          duration:
            (timeBorders.bottom.getHours() - prevEndDate.getHours())
            * 60 + (timeBorders.bottom.getMinutes() - prevEndDate.getMinutes())
        });
      }
      return dayArray;
    },
    [timeBorders.upper, timeBorders.bottom, tickets]
  );

  const dayArray = createDayArray(dayTickets, timeBorders);

  return (
    <div className={classes["ticket-list"]}>
      {dayArray.map((frame) => (
        <div key={frame.id} className={`${frame.type === "emptytime" ? classes['empty-time'] : classes.ticket}`} style={{ height: `${minutePercentage * frame.duration}%` }}></div>
      ))}
    </div>
  );
};
export default DayTickets;
