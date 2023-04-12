import classes from "./TimeColumn.module.css";

import { useSelector } from "react-redux";
import { selectTimeBorders } from "../../store/weekSlice";

const TimeColumn = () => {
  const { timePoints, minutePercentage } = useSelector(selectTimeBorders);
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
        className={classes.time}
        style={{ height: `${hourHeight}%` }}
      >
        <p>{hours[i] + ":00"}</p>
      </div>
    );
    hourElements.push(hourElement);
  }

  return (
    <>
      <div className={classes["time-column"]}>
      <div className={classes["header-spacer"]}>{""}
      </div>
        <div className={classes["time-markup"]}>{hourElements}</div>
      </div>
    </>
  );
};

export default TimeColumn;
