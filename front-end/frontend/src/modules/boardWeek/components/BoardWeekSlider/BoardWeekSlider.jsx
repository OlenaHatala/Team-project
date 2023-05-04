import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  setWeekIndexAction,
  selectDates,
  selectWeekView,
} from "../../store/weekSlice";
import { monthByIndex } from "../../utils/weekDay";
import { weekHalfsConstants, weekViewsConstants } from "../../utils/weekView";
import { fullWeekSlides, halfWeekSlides } from "./Slides";

import classes from "./BoardWeekSlider.module.css";
import { Loader } from "../../../common/components";

const SlideItemInner = ({ weekHalf }) => {
  const swiper = useSwiper();
  const dispatch = useDispatch();
  const dates = useSelector(selectDates);
  const weekView = useSelector(selectWeekView);

  const weekSlides =
    weekView === weekViewsConstants.fullWeek ? fullWeekSlides : halfWeekSlides;

  swiper.on("activeIndexChange", () => {
    dispatch(
      setWeekIndexAction({
        index:
          weekSlides.find((slide) => slide.sliderIndex === swiper.activeIndex)
            ?.weekIndex || 0,
        weekHalf:
          weekSlides.find((slide) => slide.sliderIndex === swiper.activeIndex)
            ?.weekHalf || weekHalfsConstants.mondayWednesday,
      })
    );
  });

  let datesBorders = <Loader />;

  const fromDay =
    weekHalf === weekHalfsConstants.thursdaySunday ? "thursday" : "monday";
  const toDay =
    weekHalf === weekHalfsConstants.mondayWednesday ? "wednesday" : "sunday";

  if (dates?.monday?.day) {
    datesBorders = `${dates[fromDay].day || " "} ${
      monthByIndex[dates[fromDay].month] || " "
    } - ${dates[toDay].day || " "} ${monthByIndex[dates[toDay].month] || " "}`;
  }

  return <div>{datesBorders}</div>;
};

const BoardWeekSlider = () => {
  const weekView = useSelector(selectWeekView);
  const weekSlides =
    weekView === weekViewsConstants.fullWeek ? fullWeekSlides : halfWeekSlides;
  return (
    <>
      <Swiper
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className={classes.swiper}
      >
        {weekSlides.map((slide) => (
          <SwiperSlide
            key={slide.sliderIndex}
            className={classes["swiper-slide"]}
          >
            <SlideItemInner
              index={slide.sliderIndex}
              weekHalf={slide.weekHalf}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BoardWeekSlider;
