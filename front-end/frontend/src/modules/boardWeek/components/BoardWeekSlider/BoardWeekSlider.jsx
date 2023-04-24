import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import { setWeekIndexAction, selectDates } from "../../store/weekSlice";
import { monthByIndex } from "../../utils/weekDay";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import classes from "./BoardWeekSlider.module.css";
import { Loader } from "../../../common/components";

const SliderItemWrapper = () => {
  const swiper = useSwiper();
  const dispatch = useDispatch();
  const dates = useSelector(selectDates);

  swiper.on("activeIndexChange", () => {
    dispatch(setWeekIndexAction(swiper.activeIndex));
  });

  let label = <Loader />
  if (dates?.monday?.day) {

    
    label = `${dates?.monday?.day || " "} ${
      monthByIndex[dates?.monday?.month] || " "
    } - ${dates?.sunday?.day || " "} ${
      monthByIndex[dates?.sunday?.month] || " "
    }`;
  }
    
  return <div>{label}</div>;
};

const BoardWeekSlider = () => {
  return (
    <>
      <Swiper
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        className={classes.swiper}
      >
        <SwiperSlide className={classes["swiper-slide"]}>
          <SliderItemWrapper index={0} />
        </SwiperSlide>
        <SwiperSlide className={classes["swiper-slide"]}>
          <SliderItemWrapper index={1} />
        </SwiperSlide>
        <SwiperSlide className={classes["swiper-slide"]}>
          <SliderItemWrapper index={2} />
        </SwiperSlide>
        <SwiperSlide className={classes["swiper-slide"]}>
          <SliderItemWrapper index={3} />
        </SwiperSlide>
        <SwiperSlide className={classes["swiper-slide"]}>
          <SliderItemWrapper index={4} />
        </SwiperSlide>
        <SwiperSlide className={classes["swiper-slide"]}>
          <SliderItemWrapper index={5} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default BoardWeekSlider;
