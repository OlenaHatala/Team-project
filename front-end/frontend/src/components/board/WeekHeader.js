import useConfigureBoard from "../../hooks/useConfigureBoard";
import useBoardContext from "../../hooks/useBoardContext";

import classes from "./WeekHeader.module.css";

const WeekHeader = ({ onShowTicketForm }) => {
  const { details } = useBoardContext();

  const configureBoard = useConfigureBoard();
  console.log(details.boardname);
  return (
    <>
      <h1>{details.boardname}</h1>
      <div className={classes["new-ticket"]}>
        <button onClick={onShowTicketForm}>Add new ticket</button>
        <button onClick={configureBoard}>Configure Board</button>
      </div>
      <div className={classes.days}>
        <div className={classes["day-button"]}>
          <button>Monday</button>
        </div>
        <div className={classes["day-button"]}>
          <button>Tuesday</button>
        </div>
        <div className={classes["day-button"]}>
          <button disabled>Wednesday</button>
        </div>
        <div className={classes["day-button"]}>
          <button>Thursday</button>
        </div>
        <div className={classes["day-button"]}>
          <button>Friday</button>
        </div>
        <div className={classes["day-button"]}>
          <button>Saturday</button>
        </div>
        <div className={classes["day-button"]}>
          <button>Sunday</button>
        </div>
      </div>
    </>
  );
};

export default WeekHeader;
