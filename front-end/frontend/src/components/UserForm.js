import { useEffect, useRef, useState } from "react";
import { useNavigation, useNavigate } from "react-router-dom";

import classes from "./UserForm.module.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const API_EDIT_USER_URL = "/user/update";
const API_GET_USER_URL = "/user/read";

import { validateUserData } from "../utils/validation/userValidation";
import useUserApi from "../hooks/useUserApi";

const NAME_REGEX = /^[A-z][A-z-_]{1,15}$/;
const MNUMBER_REGEX =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function UserForm() {
  console.log("USERFORM");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    setAccInfo,
    name: ctxFirstname,
    surname: ctxLastname,
    email: ctxEmail,
    mobileNum: ctxNumber,
  } = useAuth();

  const { fetchUser, updateUser } = useUserApi();

  const [isEditing, setIsEditing] = useState(false);

  const [firstname, setFirstname] = useState(ctxFirstname);
  const [lastname, setLastname] = useState(ctxLastname);
  const [email, setEmail] = useState(ctxEmail);
  const [number, setNumber] = useState(ctxNumber);

  const [focusedInput, setFocusedInput] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const firstnameInputRef = useRef();
  const errRef = useRef();
  const successRef = useRef();
  const getEffectRun = useRef(false);

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (getEffectRun.current === false) {

      console.log("EFFECT");
      const getUserFromAPI = async () => {
        try {
          const response = await axiosPrivate.get(API_GET_USER_URL, {
            headers: { "Content-Type": "application/json" },
          });
          const responseUser = response?.data?.user;
  
          console.log("setting new acc info to CTX:");
          console.log({
            email: responseUser.email,
            surname: responseUser.surname,
            name: responseUser.name,
            mobileNum: responseUser.mobile_number,
          });
  
          setAccInfo({
            email: responseUser.email,
            surname: responseUser.surname,
            name: responseUser.name,
            mobileNum: responseUser.mobile_number,
          });
  
          console.log("AFTER: setting new acc info to CTX");
        } catch (err) {
          setSuccessMsg("");
          if (!err?.response) {
            setErrMsg("Server failed to send your data");
          } else if (err.response?.status === 400) {
            setErrMsg(
              err.response?.data?.message ||
                "Server failed to send your data. Try to sign in again"
            );
          } else {
            setErrMsg("Server failed to send your data");
          }
          errRef.current.focus();
        }
      };
  
      getUserFromAPI();

      return () => {
        getEffectRun.current = true;
      }
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
    setSuccessMsg("");
  }, [firstname, lastname, email, number]);

  useEffect(() => {
    if (isEditing) {
      setFocusedInput("firstname");
      firstnameInputRef.current.focus();
    } else {
      setFocusedInput("");
    }
  }, [isEditing]);

  function cancelHandler() {
    setIsEditing(false);
    setFirstname(ctxFirstname);
    setLastname(ctxLastname);
    setEmail(ctxEmail);
    setNumber(ctxNumber);
  }

  function editHandler() {
    setIsEditing(true);
  }

  function blurHandler() {
    //setFocusedInput("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {firstname, lastname, email, number};

    const validationStatus = validateUserData(userData);

    if (validationStatus !== "ok") {
      return validationStatus;
    }
    const response = await updateUser(userData);
    console.log(response);
    if (response?.user) {
      console.log(response.user.email);
      setAccInfo({
        email: response.user.email,
        surname: response.user.surname,
        name: response.user.name,
        mobileNum: response.user.mobileNum,
      });
      setErrMsg("");
      setSuccessMsg("Data was changed successfully");
      successRef.current.focus();
    } else if (response?.error) {
      setSuccessMsg("");
      setErrMsg(response.error);
      errRef.current.focus();
    }
    cancelHandler();
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
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
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
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
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
              value={number}
              onChange={(event) => setNumber(event.target.value)}
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
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Save"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default UserForm;
