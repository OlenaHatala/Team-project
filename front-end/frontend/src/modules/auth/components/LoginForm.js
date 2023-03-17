import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentToken } from "../store";
import { useLogin } from "../hooks/useLogin";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

import classes from "../../common/styles/authForm.module.css";

export function LoginForm() {
  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [type, setType] = useState("password");
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const { isLoggingIn, login } = useLogin();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const icon = type === "password" ? eyeOff : eye;

  useEffect(() => {
    if (token) {
      navigate(from);
    }
  }, [token, from, navigate]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, error } = await login({ email, password });
    if (status.ok) {
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } else {
      setErrMsg(error ? error : "An error occurred");
      errRef.current.focus();
    }
  };

  const saveButtonLabel = "SIGN IN";
  const modeSuggestionContent = "Don't have an account? Create one";

  const content = (
    <>
      <h1>SIGN IN</h1>
      <div className={classes["mode-suggestion"]}>
        {<p>{modeSuggestionContent}</p>}
        <Link to={"/register"} state={{ from: from }}>
          here
        </Link>
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
              value={email}
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
                value={password}
                required
              />
              <span onClick={handleToggle}>
                <Icon icon={icon} size={25} />
              </span>
            </div>
          </div>
        </div>

        <div className={classes.actions}>
          <button disabled={isLoggingIn}>
            {isLoggingIn ? "Submitting..." : saveButtonLabel}
          </button>
        </div>
      </form>
    </>
  );

  return content;
}
