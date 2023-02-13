import { useRef, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useNavigation,
} from "react-router-dom";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

import classes from "./authForm.module.css";
import axios from "../../api/axios";

const API_LOGIN_URL = "/auth/login";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const [type, setType] = useState("password");
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const saveButtonLabel = "SIGN IN";
  const modeSuggestionContent = "Don't have an account? Create one";

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        API_LOGIN_URL,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUser("");
      setPwd("");

      //test token
      const token = "test token";

      // TODO: remove console.logs before deployment

      console.log("putting data from response to localStorage");
      console.log(response.data.user);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userEmail", response.data.user.email);
      localStorage.setItem("userSurname", response.data.user.surname);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem(
        "userMobileNumber",
        response.data.user.mobile_number
      );

      console.log("localStorage has user data");

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);

      localStorage.setItem("expiration", expiration.toISOString());

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (!err.response?.status) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(
          err.response?.data?.message || "Missing Username or Password"
        );
      } else if (err.response?.status === 401) {
        setErrMsg(err.response?.data?.message || "Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const icon = type === "password" ? eyeOff : eye;

  return (
    <>
      <h1>SIGN IN</h1>
      <div className={classes["mode-suggestion"]}>
        {<p>{modeSuggestionContent}</p>}
        <Link to={"/register"}>here</Link>
      </div>
      <p
        ref={errRef}
        className={errMsg ? classes.errmsg : classes.offscreen}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email address"
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="image">Password</label>
            <div className={classes["password-input-block"]}>
              <input
                id="password"
                type={type}
                placeholder="Enter password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <span onClick={handleToggle}>
                <Icon icon={icon} size={25} />
              </span>
            </div>
          </div>
        </div>

        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : saveButtonLabel}
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
