import { useEffect, useRef, useState } from "react";
import {
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
//import { getAuthToken } from "../util/auth";
import classes from "./UserForm.module.css";
import { API_URL } from "../config/urls";

function UserForm({ method, user}) {
  console.log('UserForm render');
  const [isEditing, setIsEditing] = useState(false);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);

  const [focusedInput, setFocusedInput] = useState("");

  const firstnameInputRef = useRef();

  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

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

  function firstnameChangeHandler(event) {
    setFirstname(event.target.value);
  }

  function lastnameChangeHandler(event) {
    setLastname(event.target.value);
  }

  function emailChangeHandler(event) {
    setEmail(event.target.value);
  }

  function numberChangeHandler(event) {
    setNumber(event.target.value);
  }

  function firstnameFocusHandler() {
    setFocusedInput('firstname');
  }

  function lastnameFocusHandler() {
    setFocusedInput('lastname');
  }

  function emailFocusHandler() {
    setFocusedInput('email');
  }

  function numberFocusHandler() {
    setFocusedInput('number');
  }

  function blurHandler () {
    setFocusedInput('');
  }

  useEffect(() => {
    console.log('UserForm useEffect');
    if (isEditing) {
      setFocusedInput("firstname");
      firstnameInputRef.current.focus();
    } else {
      setFocusedInput("");
    }
  }, [isEditing]);

  return (
    <Form method={method} className={classes.form}>
      <div className={classes.header}>
        <h2>Personal information</h2>{" "}
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
      </div>
      <div className={classes.body}>
        <div className={classes["image-block"]}>
          <div className={classes["profile-photo"]}>
            <img
              src="https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
              alt="profile-photo"
            />
          </div>
        </div>
        <div className={classes["input-block"]}>
          <div className={`${classes.input} ${focusedInput === "firstname" ? classes.focused : ''}`}>
            <label htmlFor="firstname">First Name</label>
            <input
              ref={firstnameInputRef}
              id="firstname"
              type="text"
              name="firstname"
              disabled={!isEditing}
              required
              value={firstname}
              onChange={firstnameChangeHandler}
              onFocus={firstnameFocusHandler}
              onBlur={blurHandler}
            />
          </div>
          <div className={`${classes.input} ${focusedInput === "lastname" ? classes.focused : ''}`}>
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              disabled={!isEditing}
              required
              value={lastname}
              onChange={lastnameChangeHandler}
              onFocus={lastnameFocusHandler}
              onBlur={blurHandler}
            />
          </div>
          <div className={`${classes.input} ${focusedInput === "email" ? classes.focused : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              disabled={!isEditing}
              required
              value={email}
              onChange={emailChangeHandler}
              onFocus={emailFocusHandler}
              onBlur={blurHandler}
            />
          </div>
          <div className={`${classes.input} ${focusedInput === "number" ? classes.focused : ''}`}>
            <label htmlFor="number">Phone number</label>
            <input
              id="number"
              type="text"
              name="number"
              disabled={!isEditing}
              required
              value={number}
              onChange={numberChangeHandler}
              onFocus={numberFocusHandler}
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
    </Form>
  );
}

export default UserForm;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    name: data.get("firstname"),
    surname: data.get("lastname"),
    email: data.get("email"),
    mobile_number: data.get("number"),
  };

  const userId = localStorage.getItem("userId");
  let url = `${API_URL}/api/auth/update/`;

  //const token = getAuthToken();

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id: userId, userData}),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save user info." }, { status: 500 });
  }

  if (response.status === 422) {
    return response;
  }

  const resData = await response.json();

  localStorage.setItem("userEmail", resData.user.email);
  localStorage.setItem("userSurname", resData.user.surname);
  localStorage.setItem("userName", resData.user.name);
  localStorage.setItem("userMobileNumber", resData.user.mobile_number);

  return redirect("/success/?message=Personal-data-was-saved-successfuly");
}
