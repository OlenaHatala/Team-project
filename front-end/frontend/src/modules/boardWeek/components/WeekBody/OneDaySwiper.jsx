import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { weekIndexContants } from "../../../common/constants/index.js";

import Day from "../Day/Day.js";
import TimeColumn from "../TimeColumn/TimeColumn.js";
import {
  selectTimeBorders,
  setWeekIndexAction,
  selectWeekIndex,
} from "../../store/weekSlice";
import { WeekDay } from "../../utils/weekDay.js";

import classes from "./WeekBody.module.css";

export const OneDaySwiper = ({
  onTicketApprove,
  onTicketDeny,
  onTicketDelete,
  onTicketTake,
}) => {
  const dispatch = useDispatch();
  const { index: weekIndex } = useSelector(selectWeekIndex);
  const { minutePercentage, timePoints } = useSelector(selectTimeBorders);

  const [allowNext, setAllowNext] = useState(true);
  const [allowPrev, setAllowPrev] = useState(weekIndex !== 0);

  const swipeDayHandler = (dayIndex, prevDayIndex) => {
    //if reached the borders
    if (dayIndex === 0 && weekIndex === weekIndexContants.firstIndex) {
      setAllowPrev(false);
    } else if (dayIndex === 6 && weekIndex === weekIndexContants.lastIndex) {
      setAllowNext(false);
    } else {
      //if swipped from border-element
      if (!allowNext) {
        setAllowNext(true);
      }
      if (!allowPrev) {
        setAllowPrev(true);
      }
    }

    //dispatch week increment / decrement
    if (
      dayIndex === 0 &&
      prevDayIndex === 6 &&
      weekIndex !== weekIndexContants.lastIndex
    ) {
      dispatch(
        setWeekIndexAction({
          index: weekIndex + 1,
        })
      );
    } else if (
      dayIndex === 6 &&
      prevDayIndex === 0 &&
      weekIndex !== weekIndexContants.firstIndex
    ) {
      dispatch(
        setWeekIndexAction({
          index: weekIndex - 1,
        })
      );
    }
  };

  const dayElements = [];
  for (let day in WeekDay) {
    dayElements.push(
      <SwiperSlide key={day}>
        <Day
          day={day}
          onTicketApprove={onTicketApprove}
          onTicketDeny={onTicketDeny}
          onTicketDelete={onTicketDelete}
          onTicketTake={onTicketTake}
        />
      </SwiperSlide>
    );
  }

  return (
    <div className={classes.scroll}>
      <div className={classes.days}>
        <TimeColumn
          timeBorders={timePoints}
          minutePercentage={minutePercentage}
        />
        <Swiper
          style={{minHeight: '1710px', height: '1710px'}}
          loop={true}
          className={classes.swiper}
          onActiveIndexChange={(swiper) => {
            swipeDayHandler(swiper.realIndex, swiper.previousRealIndex);
          }}
          allowSlideNext={allowNext}
          allowSlidePrev={allowPrev}
        >
          {dayElements}
        </Swiper>
      </div>
    </div>
  );
};
