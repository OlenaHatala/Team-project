import classes from "./TimeColumn.module.css";
import useBoardContext from "../../hooks/useBoardContext";

const TimeColumn = () => {
  const { timeBorders, minutePercentage } = useBoardContext();

  const hourHeight = minutePercentage * 60;

  console.log("timeBorders: ");
  console.log(timeBorders);

  const firstHour = timeBorders.upper.getHours();
  let hours = [firstHour];

    let i = 0;
    while (hours[i] + 1 <= timeBorders.bottom.getHours()) {
      hours.push(hours[i] + 1);
      i++;
    }

  let hourElements = [];

  for (let i = 0; i < hours.length; i++) {
    const hourElement = (
      <div key={i} className={classes.time} style={{ height: `${hourHeight}%` }}>
        <p>{hours[i] + ":00"}</p>
      </div>
    );
    hourElements.push(hourElement);
  }

  return (
    <div className={classes.day}>
      <div className={classes["time-markup"]}>{hourElements}</div>
    </div>
  );
};

export default TimeColumn;
