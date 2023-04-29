import classes from "./TakenTicket.module.css";
import { Icon } from "react-icons-kit";
import { calendar } from "react-icons-kit/icomoon/calendar";
import { clock } from "react-icons-kit/icomoon/clock";
import { useNavigate } from "react-router-dom";

const TakenTicket = (props) => {
  const statusText = props.status === "in-waitlist"? "in waitlist": props.status;
  const [hours, minutes] = props.time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + props.duration;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  const end_time = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/board/${props?.boardId}`)
  }
  return (
    <div className={classes.ticket} onClick={clickHandler}>
      <div
        className={`${classes["ticket-header"]} ${classes[`${props.status}`]}`}
      >
        {statusText}
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
          {props.time}-{end_time}
        </div>
      </div>
    </div>
  );
};

export default TakenTicket;