import React, { useMemo } from "react";
import { v4 as uuid } from "uuid";
import classes from "./DayTickets.module.css";

import { useSelector } from "react-redux";
import { selectWeek } from "../../store/weekSlice";
import { Ticket } from "../Ticket";

const getTimeFromString = (datetime) => {
  const date = new Date(datetime);
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
};

const sortTickets = (tickets) => {
  tickets.sort(function (a, b) {
    if (getTimeFromString(a.datetime) < getTimeFromString(b.datetime)) {
      return -1;
    }
    if (getTimeFromString(a.datetime) > getTimeFromString(b.datetime)) {
      return 1;
    }
    return 0;
  });
  return tickets;
};

const DayTickets = ({ day }) => {
  const week = useSelector(selectWeek);
  const { tickets, timeBorders, weekIndex } = week;
  const { timePoints, minutePercentage } = timeBorders;
  const borderDates = {
    upper: new Date(timePoints.upper),
    bottom: new Date(timePoints.bottom),
  };
  const dayTickets = tickets[day] || [];

  const dayArray = useMemo(() => {
    const sortedTickets = sortTickets([...dayTickets]);

    let calculatedArray = [];

    let prevEndDate = borderDates.upper;

    for (var i = 0; i < sortedTickets.length; i++) {
      const currentTicket = {
        ...sortedTickets[i],
        datetime: new Date(sortedTickets[i].datetime),
        weekIndex: weekIndex,
        weekDay: day,
      };
      const currentStart =
        currentTicket.datetime.getHours() * 60 +
        currentTicket.datetime.getMinutes();

      const prevEnd = prevEndDate.getHours() * 60 + prevEndDate.getMinutes();

      if (currentStart - prevEnd > 0) {
        calculatedArray.push({
          id: uuid(),
          type: "emptytime",
          date: prevEndDate,
          duration: currentStart - prevEnd,
        });
      }
      calculatedArray.push({ ...currentTicket, id: currentTicket.id,  });
      prevEndDate = new Date(
        currentTicket.datetime.getTime() + currentTicket.duration * 1000 * 60
      );
    }

    if (
      borderDates.bottom.getHours().toString() +
        borderDates.bottom.getMinutes().toString() >
      prevEndDate.getHours().toString() + prevEndDate.getMinutes().toString()
    ) {
      calculatedArray.push({
        id: uuid(),
        type: "emptytime",
        date: prevEndDate,
        duration:
          (borderDates.bottom.getHours() - prevEndDate.getHours()) * 60 +
          (borderDates.bottom.getMinutes() - prevEndDate.getMinutes()),
      });
    }
    return calculatedArray;
  }, [borderDates, dayTickets]);

  return (
    <div className={classes["ticket-list"]}>
      {dayArray.map((frame) => {
        let frameContent;
        if (frame?.type === "emptytime") {
          frameContent = (
            <div
              key={frame.id}
              className={classes["empty-time"]}
              style={{ height: `${minutePercentage * frame.duration}%` }}
            ></div>
          );
        } else {
          frameContent = (
            <>
              <Ticket
                height={(minutePercentage * frame.duration * 95) / 100}
                ticket={frame}
              />
              <div
                key={`spacer-${frame.id}`}
                className={classes.spacer}
                style={{
                  height: `${(minutePercentage * frame.duration * 5) / 100}%`,
                }}
              ></div>
            </>
          );
        }
        return frameContent;
      })}
    </div>
  );
};
export default DayTickets;
