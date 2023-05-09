import React from "react";
import Day from "../Day/Day.js";
import TimeColumn from "../TimeColumn/TimeColumn.js";
import classes from "./WeekBody.module.css";
import { useSelector } from "react-redux";
import {
  selectTimeBorders,
  selectWeekView,
  selectWeekIndex,
} from "../../store/weekSlice";
import {
  weekHalfsConstants,
  weekViewsConstants,
} from "../../utils/weekView.js";
import { OneDaySwiper } from "./OneDaySwiper.jsx";

export const WeekBody = ({
  onTicketApprove,
  onTicketDeny,
  onTicketDelete,
  onTicketTake,
}) => {
  const { minutePercentage, timePoints } = useSelector(selectTimeBorders);
  const weekView = useSelector(selectWeekView);
  const { weekHalf } = useSelector(selectWeekIndex);

  const showMondayWednesday =
    weekView === weekViewsConstants.fullWeek ||
    weekHalf === weekHalfsConstants.mondayWednesday;

  const showThursdaySunday =
    weekView === weekViewsConstants.fullWeek ||
    weekHalf === weekHalfsConstants.thursdaySunday;

  return (
    <>
      {weekView === weekViewsConstants.oneDay ? (
        <OneDaySwiper
          onTicketApprove={onTicketApprove}
          onTicketDeny={onTicketDeny}
          onTicketDelete={onTicketDelete}
          onTicketTake={onTicketTake}
        />
      ) : (
        <div className={classes.scroll}>
          <div className={classes.days}>
            <TimeColumn
              timeBorders={timePoints}
              minutePercentage={minutePercentage}
            />
            {showMondayWednesday && (
              <Day
                day="monday"
                onTicketApprove={onTicketApprove}
                onTicketDeny={onTicketDeny}
                onTicketDelete={onTicketDelete}
                onTicketTake={onTicketTake}
              />
            )}
            {showMondayWednesday && (
              <Day
                day="tuesday"
                onTicketApprove={onTicketApprove}
                onTicketDeny={onTicketDeny}
                onTicketDelete={onTicketDelete}
                onTicketTake={onTicketTake}
              />
            )}
            {showMondayWednesday && (
              <Day
                day="wednesday"
                onTicketApprove={onTicketApprove}
                onTicketDeny={onTicketDeny}
                onTicketDelete={onTicketDelete}
                onTicketTake={onTicketTake}
              />
            )}
            {showThursdaySunday && (
              <Day
                day="thursday"
                onTicketApprove={onTicketApprove}
                onTicketDeny={onTicketDeny}
                onTicketDelete={onTicketDelete}
                onTicketTake={onTicketTake}
              />
            )}
            {showThursdaySunday && (
              <Day
                day="friday"
                onTicketApprove={onTicketApprove}
                onTicketDeny={onTicketDeny}
                onTicketDelete={onTicketDelete}
                onTicketTake={onTicketTake}
              />
            )}
            {showThursdaySunday && (
              <Day
                day="saturday"
                onTicketApprove={onTicketApprove}
                onTicketDeny={onTicketDeny}
                onTicketDelete={onTicketDelete}
                onTicketTake={onTicketTake}
              />
            )}
            {showThursdaySunday && (
              <Day
                day="sunday"
                onTicketApprove={onTicketApprove}
                onTicketDeny={onTicketDeny}
                onTicketDelete={onTicketDelete}
                onTicketTake={onTicketTake}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
