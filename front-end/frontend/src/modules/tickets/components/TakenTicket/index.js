import classes from "./TakenTicket.module.css";
import { Icon } from "react-icons-kit";
import { calendar } from "react-icons-kit/icomoon/calendar";
import { clock } from "react-icons-kit/icomoon/clock";

const TakenTicket = (props) => {
  console.log(props);
  console.log(props.status);
  return (
    <div className={classes.ticket}>
      <div
        className={`${classes["ticket-header"]} ${classes[`${props.status}`]}`}
      >
        {props.status}
      </div>
      <div className={classes["ticket-title"]}>
        {props.boardName.slice(0, 40)}
      </div>
      <hr />
      <h5 className={classes["ticket-details-header"]}>Date and time:</h5>
      <div className={classes["ticket-details"]}>
        <div className={classes["ticket-date"]}>
          <span>
            <Icon icon={calendar} size={14} />
          </span>
          {props.date.toDateString()}
        </div>
        <div className={classes["ticket-time"]}>
          <span>
            <Icon icon={clock} size={14} />
          </span>
          {props.time}
        </div>
      </div>
    </div>
  );
};

export default TakenTicket;
