import useNewBoardContext from "../../hooks/useNewBoardContext";

import classes from "./DayHours.module.css";

const DayHours = ({ dayName, label }) => {
  const setDayFunctionName = `set${dayName}`;

  const { [dayName.toLowerCase()]: day, [setDayFunctionName]: setDay } =
    useNewBoardContext();

  const setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  };

  const changeOpenHandler = (e) => {
    let value = e.target.value;
    setDay((prevInfo) => {
      const valid = value < prevInfo.close;
      let closeTime = prevInfo.close;

      if (!valid) {
        if (closeTime[4] === "0") {
          value = closeTime;
          value = setCharAt(value, 4, 9);
          if (closeTime[3] === "0") {
            value = setCharAt(value, 1, +closeTime[1] - 1);
            value = setCharAt(value, 3, 5);
          } else {
            value = setCharAt(value, 3, +closeTime[3] - 1);
          }
        } else {
          value = closeTime;
          value = setCharAt(value, 4, +closeTime[4] - 1);
        }
      }
      return { ...prevInfo, open: value };
    });
  };
  const changeCloseHandler = (e) => {
    let value = e.target.value;
    setDay((prevInfo) => {
      const valid = value > prevInfo.open;
      let openTime = prevInfo.open;
      if (!valid) {
        if (openTime[4] === "9") {
          value = openTime;
          value = setCharAt(value, 4, 0);
          if (openTime[3] === "5") {
            value = setCharAt(value, 1, +openTime[1] + 1);
            value = setCharAt(value, 3, 0);
          } else {
            value = setCharAt(value, 3, +openTime[3] + 1);
          }
        } else {
          value = openTime;
          value = setCharAt(value, 4, +openTime[4] + 1);
        }
      }
      return { ...prevInfo, close: value };
    });
  };

  return (
    <div className={!day.disabled ? classes.day : classes["disabled-day"]}>
      <button
        type="button"
        className={classes["day-hours-button"]}
        onClick={() => {
          setDay((prevInfo) => ({ ...day, disabled: !day["disabled"] }));
        }}
      >
        {label}
      </button>

      <label htmlFor={`${dayName.toLowerCase()}open`}> Opening time </label>
      <input
        id={`${dayName.toLowerCase()}open`}
        type="time"
        min="06:00"
        max="18:00"
        value={day.open}
        disabled={day.disabled}
        onChange={changeOpenHandler}
      />
      <label htmlFor={`${dayName.toLowerCase()}close`}> Closing time </label>
      <input
        id={`${dayName.toLowerCase()}close`}
        type="time"
        min="03:00"
        max="23:59"
        value={day.close}
        disabled={day.disabled}
        onChange={changeCloseHandler}
      />
    </div>
  );
};

export default DayHours;
