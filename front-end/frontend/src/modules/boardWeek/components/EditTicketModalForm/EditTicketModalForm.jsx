import React, { useState } from "react";

import { Modal } from "../../../common/components/Modal";
import classes from "./EditTicketModalForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModalsState,
  hideEditTicketAction,
  ticketAdded,
  ticketUpdated,
} from "../../store/weekSlice";
import { useConfigureTicketMutation } from "../../api";

const EditTicketModalForm = () => {
  const dispatch = useDispatch();
  const { editedTicket } = useSelector(selectModalsState);
  const [configureTicket, { isLoading }] = useConfigureTicketMutation();

  const [time, setTime] = useState(
    formatTimeForInput(
      editedTicket.datetime.getHours(),
      editedTicket.datetime.getMinutes()
    )
  );
  const [duration, setDuration] = useState(editedTicket.duration);
  const [available, setAvailable] = useState(editedTicket.available);

  const onClose = () => {
    dispatch(hideEditTicketAction());
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    let hours = time.slice(0, 2);
    let mins = time.slice(2, 4);
    console.log(hours)
    console.log(mins)
    console.log(editedTicket.datetime)
    let newDateTime = new Date(editedTicket.datetime);
    newDateTime.setHours(hours);
    newDateTime.setMinutes(mins);
    let availablePayload = available ? 'true' : 'false';
    try {
      const newTicketData = await configureTicket({
        ...editedTicket,
        datetime: newDateTime,
        duration: duration,
        availablePayload: availablePayload,
      }).unwrap();

      const ticket = newTicketData.ticket;
      dispatch(ticketUpdated(ticket));
    } catch (err) {
      const errMessage = err?.message || "An error ocured";
      console.log(errMessage);
    } finally {
      onClose();
    }
    //dispatch(ticketEdited(weekday, time, duration, available));
  };

  const editTicketModalContent = (
    <form onSubmit={sumbitHandler} className={classes.form}>
      <h3>Configure ticket</h3>
      <div className={classes.time}>
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
          <button className={classes["add-btn"]}>
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );

  return <Modal onClose={onClose}>{editTicketModalContent}</Modal>;
};

const formatTimeForInput = (hours, minutes) => {
  let hoursStr, minutesStr;
  if (hours < 10) {
    hoursStr = `0${hours}`;
  } else {
    hoursStr = `${hours}`;
  }
  if (minutes < 10) {
    minutesStr = `0${minutes}`;
  } else {
    minutesStr = `${minutes}`;
  }
  return `${hoursStr}:${minutesStr}`;
};

export default EditTicketModalForm;
