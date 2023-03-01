import useConfigureBoard from "../../hooks/useConfigureBoard";
import useBoardContext from "../../hooks/useBoardContext";

import { useDispatch, useSelector } from "react-redux";
import { selectBoard } from "./boardSlice";
import { configuringStarted } from "./boardSlice";

import classes from "./WeekHeader.module.css";
import { useNavigate } from "react-router-dom";

const WeekHeader = ({ onShowTicketForm }) => {
  const { details } = useSelector(selectBoard);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const configureBoardHandler = () => {
    dispatch(configuringStarted());
    navigate("/newboard");
  }
  return (
    <>
      <h1>{details.boardname}</h1>
      <div className={classes["new-ticket"]}>
        <button onClick={onShowTicketForm}>Add new ticket</button>
        <button onClick={configureBoardHandler}>Configure Board</button>
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
