import { useEffect, useRef, useState } from "react";

import useNewBoardContext from "../hooks/useNewBoardContext";
import useValidInput from "../../common/hooks/useValidInput";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./NewBoardForm.module.css";

function ServiceInfo() {
  const { saveDetails, details } = useNewBoardContext();

  const [address, setAddress] = useState(details.address);
  const [desc, setDesc] = useState(details.desc);

  const {
    value: boardname,
    isValid: boardnameIsValid,
    hasError: boardnameHasError,
    valueChangeHandler: boardnameChangeHandler,
    inputBlurHandler: boardnameBlurHandler,
    checkErr: boardnameCheckErr,
  } = useValidInput(details.boardname, (value) => value.trim().length > 4);

  const {
    value: servname,
    isValid: servnameIsValid,
    hasError: servnameHasError,
    valueChangeHandler: servnameChangeHandler,
    inputBlurHandler: servnameBlurHandler,
    checkErr: servnameCheckErr,
  } = useValidInput(details.servname, (value) => value.trim().length > 4);

  const boardnameRef = useRef();

  const boardnameErrRef = useRef();
  const servnameErrRef = useRef();

  const canSaveStep = boardnameIsValid && servnameIsValid;

  useEffect(() => {
    boardnameRef.current.focus();
  }, []);

  const nextHandler = () => {
    if (canSaveStep) {
      saveDetails({ boardname, desc, address, servname });
    } else {
      boardnameCheckErr();
      servnameCheckErr();
      boardnameErrRef.current.focus();
      servnameErrRef.current.focus();
    }
  };

  return (
    <>
      <header className={classes["fieldset-header"]}>
        <div className={classes["fieldset-nav"]}>
          <div className={classes["right-btn"]}>
            <button type="button"
              className={
                !canSaveStep ? classes["invalid-nav-btn"] : classes["nav-btn"]
              }
              onClick={nextHandler}
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </header>
      <fieldset className={classes["form-fieldset"]}>
        <legend>Service Details</legend>
        <div className={classes["input-block"]}>
          <div className={classes.input}>
            <label htmlFor="boardname">Board Name</label>
            <input
              ref={boardnameRef}
              id="boardname"
              type="text"
              value={boardname}
              onChange={boardnameChangeHandler}
              onBlur={boardnameBlurHandler}
              aria-invalid={boardnameHasError ? "true" : "false"}
              aria-describedby="bnamenote"
            />
            <p
              id="bnamenote"
              className={
                boardnameHasError ? classes.instructions : classes.offscreen
              }
              aria-live="assertive"
              ref={boardnameErrRef}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              This field is required. Enter at least 5 characters.
            </p>
          </div>

          <div className={classes.input}>
            <label htmlFor="desc">
              <span>Optional*</span>
              <br />
              Board description
            </label>
            <input
              id="desc"
              type="text"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>

          <div className={classes.input}>
            <label htmlFor="address">
              <span>Optional*</span>
              <br />
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>

          <div className={classes.input}>
            <label htmlFor="servname">Service name</label>
            <input
              id="servname"
              type="text"
              value={servname}
              onChange={servnameChangeHandler}
              onBlur={servnameBlurHandler}
              aria-invalid={servnameHasError ? "true" : "false"}
              aria-describedby="snamenote"
            />
            <p
              id="snamenote"
              className={
                servnameHasError ? classes.instructions : classes.offscreen
              }
              aria-live="assertive"
              ref={servnameErrRef}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              This field is required. Enter at least 5 characters.
            </p>
          </div>
        </div>
      </fieldset>
    </>
  );
}

export default ServiceInfo;
