import { useEffect, useRef, useState } from "react";
import {
  useNavigation,
  useNavigate,
} from "react-router-dom";

import classes from "./UserForm.module.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const API_EDIT_USER_URL = "/auth/update";

const NAME_REGEX = /^[A-z][A-z-_]{1,15}$/;
const MNUMBER_REGEX =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function UserForm({ user }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {setAccInfo, id: userId} = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);

  const [focusedInput, setFocusedInput] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const firstnameInputRef = useRef();
  const errRef = useRef();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setErrMsg("");
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
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEmail(user.email);
    setNumber(user.number);
  }

  function editHandler() {
    setIsEditing(true);
  }

  function blurHandler() {
    //setFocusedInput("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    const v1 = NAME_REGEX.test(firstname);
    const v2 = NAME_REGEX.test(lastname);
    const v3 = MNUMBER_REGEX.test(number);
    const v4 = EMAIL_REGEX.test(email);

    if (!v1) {
      setErrMsg("First name should have 2 to 16 letters.");
      return;
    }

    if (!v2) {
      setErrMsg("Last name should have 2 to 16 letters.");
      return;
    }

    if (!v3) {
      setErrMsg("Phone number is not valid.");
      return;
    }

    if (!v4) {
      setErrMsg("Email is not valid.");
      return;
    }

    const userData = {
      name: firstname,
      surname: lastname,
      email: email,
      mobile_number: number,
    };

    try {
      const response = await axiosPrivate.patch(
        API_EDIT_USER_URL,
        JSON.stringify({ id: userId, userData }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const responseUser = response?.data?.user;

      setAccInfo({
        email: responseUser.email,
        surname: responseUser.surname,
        name: responseUser.name,
        mobileNum: responseUser.mobile_number,
      });
        
      navigate("/success/?message=Personal-data-was-saved-successfuly");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg(err.response?.data?.message || "Changing data failed");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.message || "Invalid Entry");
      } else {
        setErrMsg("Changing data failed");
      }
      errRef.current.focus();
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

// export async function action({ request, params }) {
//   const data = await request.formData();

//   const userData = {
//     name: data.get("firstname"),
//     surname: data.get("lastname"),
//     email: data.get("email"),
//     mobile_number: data.get("number"),
//   };

//   const userId = localStorage.getItem("userId");
//   let url = `${API_URL}/api/auth/update/`;

//   //const token = getAuthToken();

//   const response = await fetch(url, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id: userId, userData }),
//   });

//   if (response.status === 422) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({ message: "Could not save user info." }, { status: 500 });
//   }

//   if (response.status === 422) {
//     return response;
//   }

//   const resData = await response.json();

//   localStorage.setItem("userEmail", resData.user.email);
//   localStorage.setItem("userSurname", resData.user.surname);
//   localStorage.setItem("userName", resData.user.name);
//   localStorage.setItem("userMobileNumber", resData.user.mobile_number);

//   return redirect("/success/?message=Personal-data-was-saved-successfuly");
// }
