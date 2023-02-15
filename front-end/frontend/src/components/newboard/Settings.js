import { useState } from "react";

import useNewBoardContext from "../../hooks/useNewBoardContext";

import classes from "./NewBoardForm.module.css";

const Settings = () => {
  const { saveSettings, settings } = useNewBoardContext();

  const [openauto, setOpenauto] = useState(settings.openauto);
  const [openday, setOpenday] = useState(settings.openday);
  const [reqconf, setReqConf] = useState(settings.reqconf);
  const [booknum, setBooknum] = useState(settings.booknum);
  const [ahead, setAhead] = useState(settings.ahead);

  const prevHandler = () => {
    saveSettings("prev", {reqconf, booknum, openauto, openday, ahead});
  };

  const nextHandler = () => {
    saveSettings("next", {reqconf, booknum, openauto, openday, ahead});
  };

  const openForContent =
    openday === "every" ? (
      <>
        <p className={`${classes["input-dayahed"]}`}>
          <nobr>day,</nobr>
          <input
            id="dayahead"
            type="number"
            min="1"
            max="99"
            value={ahead}
            onChange={(e) => {
              setAhead(e.target.value);
            }}
          />
          <nobr>days ahead.</nobr>
        </p>
      </>
    ) : (
      <>
        <p>
          <nobr>entire week,</nobr>
        </p>
        <select
          id="weekahead"
          type="number"
          value={ahead < 7 ? ahead : 1}
          onChange={(e) => {
            setAhead(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <p>
          <nobr>weeks ahead.</nobr>
        </p>
      </>
    );
  return (
    <>
      <header className={classes["fieldset-header"]}>
        <div className={classes["fieldset-nav"]}>
          <div className={classes["left-btn"]}>
            <button type="button" onClick={prevHandler}>Back</button>
          </div>
          <div className={classes["right-btn"]}>
            <button type="button" onClick={nextHandler}>Next</button>
          </div>
        </div>
      </header>

      <fieldset className={classes["form-fieldset"]}>
        <legend>Board Settings</legend>
        <div className={classes["input-block"]}>
          <div className={`${classes.input} ${classes["inline-input-label"]}`}>
            <div className={classes.inputcheck}>
              <input
                id="reqconf"
                type="checkbox"
                checked={reqconf}
                onChange={(e) => {
                  setReqConf(e.target.checked);
                }}
              />
            </div>
            <label htmlFor="reqconf">
              Require customers to wait for your confirmation of an appointment
            </label>
          </div>

          <div className={`${classes.input} ${classes["inline-input-label"]}`}>
            <label htmlFor="booknum">
              How many tickets can user take before previous one was expired:
            </label>
            <div className={classes.inputnum}>
              <input
                id="booknum"
                type="number"
                step="1"
                min="1"
                max="99"
                value={booknum}
                onChange={(e) => {
                  setBooknum(e.target.value);
                }}
              />
            </div>
          </div>

          <h3>Auto-open</h3>

          <div className={classes.autoopen}>
            <div className={classes["autoopen-options"]}>
              <label htmlFor="offopenauto">
                Tickets become available for clients only after your
                confirmation.
              </label>

              <input
                type="radio"
                id="offopenauto"
                value="offopenauto"
                checked={!openauto}
                onChange={(e) => {
                  setOpenauto(
                    e.target.value === "offopenauto" ? false : true
                  );
                }}
              />
            </div>

            <div className={classes["autoopen-options"]}>
              <label htmlFor="openauto">
                Tickets become available for clients at chosen time
                automaticaly.
              </label>

              <input
                type="radio"
                id="openauto"
                value="openauto"
                checked={openauto}
                onChange={(e) => {
                  setOpenauto(
                    e.target.value === "openauto" ? true : false
                  );
                }}
              />
            </div>
          </div>
        </div>
        {openauto && (
          <>
            <div className={`${classes["autoopen-config"]} ${classes.input}`}>
              <p>
                <nobr>Registration for a service opens</nobr>
              </p>
              <select
                value={openday}
                onChange={(e) => {
                  setOpenday(e.target.value);
                }}
              >
                <option value="every">every day</option>
                <option value="mon">Monday</option>
                <option value="tue">Tuesday</option>
                <option value="wed">Wednesday</option>
                <option value="tru">Thursday</option>
                <option value="fri">Friday</option>
                <option value="sat">Saturday</option>
                <option value="sun">Sunday</option>
              </select>
              <p>
                <nobr>for an</nobr>
              </p>
            </div>
            <div className={`${classes["autoopen-config"]} ${classes.input}`}>
              {openForContent}
            </div>
          </>
        )}
      </fieldset>
    </>
  );
};

export default Settings;
