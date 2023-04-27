import React, { useState } from "react";

import { Modal } from "../../../common/components/Modal";
import classes from "./NewTicketModalForm.module.css";
import { useDispatch } from "react-redux";
import { toggleShowNewTicketAction } from "../../store/weekSlice";
import { WeekDayByIndexInverse } from "../../utils/weekDay";
import { useAddTicketMutation } from "../../api/index";
import { setNotificationAction } from "../../../../modules/notifications/store/notificationsSlice";

const NewTicketModalForm = ({ boardId, weekIndex }) => {
  const dispatch = useDispatch();

  const [weekday, setWeekday] = useState("monday");
  const [time, setTime] = useState("18:00");
  const [duration, setDuration] = useState(60);
  const [available, setAvailable] = useState(false);

  const [addTicket, { isLoading }] = useAddTicketMutation();

  const onClose = () => {
    dispatch(toggleShowNewTicketAction(false));
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    const hours = time.slice(0, 2);
    const mins = time.slice(3, 5);

    const todayWeekDay = new Date().getDay();
    let datetime = new Date(
      Date.now() +
        ((WeekDayByIndexInverse[weekday] - todayWeekDay) * 24 * 3600 * 1000) +
        weekIndex * 7 * 24 * 3600 * 1000
    );

    datetime.setHours(hours);
    datetime.setMinutes(mins);

    console.log(WeekDayByIndexInverse[weekday] - todayWeekDay);
    console.log(weekIndex * 7 * 24 * 3600 * 1000);
    console.log(datetime)

    const response = await addTicket({
      user_id: "",
      table_id: boardId,
      duration: duration,
      datetime: datetime,
      is_outdated: "false",
      confirmed: "false",
      enabled: available,
      weekIndex: weekIndex,
    }).unwrap();

    dispatch(
      setNotificationAction({
        message: response?.message,
        messageType: "error",
      })
    );

    onClose();
  };

  const newTicketModalContent = (
    <form onSubmit={sumbitHandler} className={classes.form}>
      <h3>Add new ticket</h3>
      <div className={classes.time}>
        <div className={classes["time-picker"]}>
          <h4>Weekday</h4>
          <select
            className={classes["picker-btn"]}
            value={weekday}
            onChange={(e) => {
              setWeekday(e.target.value);
            }}
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>

        <div className={classes["time-picker"]}>
          <h4>Time</h4>
          <input
            type="time"
            className={classes["picker-btn"]}
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </div>

        <div className={classes["time-picker"]}>
          <h4>Duration</h4>
          <input
            type="number"
            className={classes["picker-btn"]}
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </div>
      </div>

      <div className={classes["item-checkbox"]}>
        <input
          type="checkbox"
          id="checkbox-text"
          className={classes["checkbox-text"]}
          checked={available}
          onChange={(e) => {
            setAvailable(e.target.checked);
          }}
        />
        <label htmlFor="checkbox-text">Make available for clients</label>
      </div>

      <div className={classes["buttons-container"]}>
        <div className={classes["button-inner"]}>
          <button
            type="button"
            className={classes["close-btn"]}
            onClick={onClose}
          >
            Cancel
          </button>
          <button className={classes["add-btn"]}>Add</button>
        </div>
      </div>
    </form>
  );

  return <Modal onClose={onClose}>{newTicketModalContent}</Modal>;
};

export default NewTicketModalForm;
