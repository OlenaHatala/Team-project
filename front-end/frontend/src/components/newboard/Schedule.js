import useNewBoardContext from "../../hooks/useNewBoardContext";
import DayHours from "./DayHours";

import classes from "./Schedule.module.css";

const Schedule = ({ onSubmit, isSubmitting }) => {
  const { duration, setDuration, saveSchedule } = useNewBoardContext();

  const prevHandler = () => {
    saveSchedule();
  };

  return (
    <>
      <header className={classes["fieldset-header"]}>
        <div className={classes["fieldset-nav"]}>
          <div className={classes["left-btn"]}>
            <button type="button" onClick={prevHandler}>
              Back
            </button>
          </div>
          <div className={classes["right-btn"]}>
            <button type="button" onClick={onSubmit}>
              {isSubmitting ? "Creating..." : "Create Board"}
            </button>
          </div>
        </div>
      </header>

      <fieldset>
        <legend id="days-text">Working days</legend>
        <div className={classes.week}>
          <DayHours dayName="Mon" label="Monday" />
          <DayHours dayName="Tue" label="Tuesday" />
          <DayHours dayName="Wed" label="Wednesday" />
          <DayHours dayName="Thu" label="Thursday" />
          <DayHours dayName="Fri" label="Friday" />
          <DayHours dayName="Sat" label="Saturday" />
          <DayHours dayName="Sun" label="Sunday" />
        </div>

        <div className={`${classes["number-input"]}`}>
          <label htmlFor="num">
            How long does it take to serve one customer? (in minutes)
          </label>
          <input
            id="num"
            type="number"
            max="1440"
            min="1"
            value={duration}
            onChange={(e) => {
              const value = e.target.value < 1441 ? e.target.value : 1440;
              setDuration(value);
            }}
          />
        </div>
      </fieldset>
    </>
  );
};

export default Schedule;
