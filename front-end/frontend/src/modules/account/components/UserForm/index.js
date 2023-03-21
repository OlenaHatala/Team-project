import { useEffect, useRef, useState } from "react";

import {
  useSelectUser,
  useUpdateUserStore,
  fromStoreToServer,
} from "../../../auth";

import { validateUserData } from "../../../common/validation/userValidation";

import { useUpdateUserMutation } from "../../api/accountApiSlice";

import classes from "./UserForm.module.css";

export function UserForm() {
  const user = useSelectUser();
  const {
    name: storedName,
    surname: storedSurname,
    email: storedEmail,
    mobileNum: storedMobileNum,
  } = user;

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { updateUserStore } = useUpdateUserStore();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(storedName);
  const [surname, setSurname] = useState(storedSurname);
  const [email, setEmail] = useState(storedEmail);
  const [mobileNum, setMobileNum] = useState(storedMobileNum);

  const [focusedInput, setFocusedInput] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const firstnameInputRef = useRef();
  const errRef = useRef();
  const successRef = useRef();

  useEffect(() => {
    setErrMsg("");
    setSuccessMsg("");
  }, [name, surname, email, mobileNum]);

  useEffect(() => {
    if (isEditing) {
      setErrMsg("");
      setSuccessMsg("");
      setFocusedInput("firstname");
      firstnameInputRef.current.focus();
    } else {
      setFocusedInput("");
    }
  }, [isEditing]);

  function cancelHandler() {
    setIsEditing(false);
    setName(storedName);
    setSurname(storedSurname);
    setEmail(storedEmail);
    setMobileNum(storedMobileNum);
  }

  function editHandler() {
    setIsEditing(true);
  }

  function blurHandler() {
    //setFocusedInput("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, surname, email, mobileNum };
    const validationStatus = validateUserData(userData);

    if (validationStatus !== "ok") {
      return setErrMsg(validationStatus);
    }
    try {
      const newUserData = await updateUser(
        fromStoreToServer(userData)
      ).unwrap();
      const user = newUserData.user;
      updateUserStore(user);
      setIsEditing(false);
      setErrMsg("");
      setSuccessMsg("Data was changed successfully");
      successRef.current.focus();
    } catch (err) {
      const errMessage = err?.message || "An error ocured";
      setErrMsg(errMessage);
      cancelHandler();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <p
        ref={errRef}
        className={errMsg ? classes.errmsg : classes.offscreen}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <p
        ref={successRef}
        className={successMsg ? classes.successmsg : classes.offscreen}
        aria-live="assertive"
      >
        {successMsg}
      </p>
      <div className={classes.header}>
        <h2>Personal information</h2>{" "}
      </div>
      <div className={classes.body}>
        <div className={classes["image-block"]}>
          <div className={classes["profile-photo"]}>
            <img
              src="https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
              alt=""
            />
          </div>
        </div>
        <div className={classes["input-block"]}>
          <div
            className={`${classes.input} ${
              focusedInput === "firstname" ? classes.focused : ""
            }`}
          >
            <label htmlFor="firstname">First Name</label>
            <input
              ref={firstnameInputRef}
              id="firstname"
              type="text"
              name="firstname"
              disabled={!isEditing}
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              onFocus={() => setFocusedInput("firstname")}
              onBlur={blurHandler}
            />
          </div>
          <div
            className={`${classes.input} ${
              focusedInput === "lastname" ? classes.focused : ""
            }`}
          >
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              disabled={!isEditing}
              required
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              onFocus={() => setFocusedInput("lastname")}
              onBlur={blurHandler}
            />
          </div>
          <div
            className={`${classes.input} ${
              focusedInput === "email" ? classes.focused : ""
            }`}
          >
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              disabled={!isEditing}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onFocus={() => setFocusedInput("email")}
              onBlur={blurHandler}
            />
          </div>
          <div
            className={`${classes.input} ${
              focusedInput === "number" ? classes.focused : ""
            }`}
          >
            <label htmlFor="number">Phone number</label>
            <input
              id="number"
              type="text"
              name="number"
              disabled={!isEditing}
              required
              value={mobileNum}
              onChange={(event) => setMobileNum(event.target.value)}
              onFocus={() => setFocusedInput("number")}
              onBlur={blurHandler}
            />
          </div>
          <div className={classes.actions}>
            {!isEditing && (
              <button type="button" onClick={editHandler}>
                Edit
              </button>
            )}
            {isEditing && (
              <div className={classes.actions}>
                <button
                  type="button"
                  onClick={cancelHandler}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Save"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
