import useNewBoardContext from "../../hooks/useNewBoardContext";

import classes from "./DayHours.module.css";

const DayHours = ({ dayName, label }) => {

  const setDayFunctionName = `set${dayName}`;

  const { [dayName.toLowerCase()]: day, [setDayFunctionName]: setDay } =
    useNewBoardContext();

  return (
    <div className={`${classes.day}`}>
      <button
        onClick={() => {
          setDay((prevInfo) => ({...day, disabled: !day["disabled"]}));
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
        onChange={(e) => {
            setDay((prevInfo) => ({...day, open: e.target.value}));
          }}
      />
      <label htmlFor={`${dayName.toLowerCase()}close`}> Closing time </label>
      <input
        id={`${dayName.toLowerCase()}close`}
        type="time"
        min="03:00"
        max="23:59"
        value={day.close}
        disabled={day.disabled}
        onChange={(e) => {
            setDay((prevInfo) => ({...day, close: e.target.value}));
          }}
      />
    </div>
  );
};

export default DayHours;
