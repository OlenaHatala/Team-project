import { useRef, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useNavigation,
} from "react-router-dom";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./authForm.module.css";

import axios from "../../api/axios";
//import useAuth from "../../hooks/useAuth";

const API_REGISTER_URL = "/auth/register";

const NAME_REGEX = /^[A-z][A-z-_]{1,15}$/;
const MNUMBER_REGEX =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function RegisterForm() {
  const navigate = useNavigate();
  //const {setAuth} = useAuth();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const firstnameRef = useRef();
  const errRef = useRef();

  const [firstname, setFirstname] = useState("");
  const [validFirstname, setValidFirstname] = useState(false);
  const [firstnameFocus, setFirstnameFocus] = useState(false);

  const [lastname, setLastname] = useState("");
  const [validLastname, setValidLastname] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [mnumber, setMnumber] = useState("");
  const [validMnumber, setValidMnumber] = useState(false);
  const [mnumberFocus, setMnumberFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    firstnameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstname(NAME_REGEX.test(firstname));
  }, [firstname]);

  useEffect(() => {
    setValidLastname(NAME_REGEX.test(lastname));
  }, [lastname]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidMnumber(MNUMBER_REGEX.test(mnumber));
  }, [mnumber]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [firstname, lastname, mnumber, email, pwd, matchPwd]);

  const modeSuggestionContent = "Don't have an account? Create one";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(firstname);
    const v2 = NAME_REGEX.test(lastname);
    const v3 = PWD_REGEX.test(pwd);
    const v4 = MNUMBER_REGEX.test(mnumber);
    const v5 = EMAIL_REGEX.test(email);
    if (!(v1 && v2 && v3 && v4 && v5)) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.post(
        API_REGISTER_URL,
        JSON.stringify({
          name: firstname,
          surname: lastname,
          mobile_number: mnumber,
          email: email,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setFirstname("");
      setLastname("");
      setPwd("");
      setMatchPwd("");
      setMnumber("");
      setEmail("");

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg(err.response?.data?.message || "Registration Failed");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.message || "Invalid Entry");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <h1>REGISTER FOR AN ACCOUNT</h1>
      <div className={classes["mode-suggestion"]}>
        {<p>{modeSuggestionContent}</p>}
        <Link to={"/login"}>Sign In</Link>
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
          <div className={classes["fullname-input-block"]}>
            <div className={`${classes.left} ${classes.input}`}>
              <label htmlFor="firstname">
                First name
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validFirstname ? classes.valid : classes.hide}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validFirstname || !firstname
                      ? classes.hide
                      : classes.invalid
                  }
                />
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="First name"
                ref={firstnameRef}
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                required
                aria-invalid={validFirstname ? "false" : "true"}
                aria-describedby="fnamenote"
                onFocus={() => setFirstnameFocus(true)}
                onBlur={() => setFirstnameFocus(false)}
                autoComplete="off"
              />
              <p
                id="fnamenote"
                className={
                  firstnameFocus && firstname && !validFirstname
                    ? classes.instructions
                    : classes.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Should have 2 to 16 letters.
              </p>
            </div>
            <div className={`${classes.right} ${classes.input}`}>
              <label htmlFor="lastname">
                Last name
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validLastname ? classes.valid : classes.hide}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validLastname || !lastname ? classes.hide : classes.invalid
                  }
                />
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Last name"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                required
                aria-invalid={validLastname ? "false" : "true"}
                aria-describedby="lnamenote"
                onFocus={() => setLastnameFocus(true)}
                onBlur={() => setLastnameFocus(false)}
                autoComplete="off"
              />
              <p
                id="lnamenote"
                className={
                  lastnameFocus && lastname && !validLastname
                    ? classes.instructions
                    : classes.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Should have 2 to 16 letters.
              </p>
            </div>
          </div>
          <div className={classes.input}>
            <label htmlFor="mnumber">
              Phone number
              <FontAwesomeIcon
                icon={faCheck}
                className={validMnumber ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validMnumber || !mnumber ? classes.hide : classes.invalid
                }
              />
            </label>
            <input
              id="mnumber"
              type="text"
              placeholder="Number"
              onChange={(e) => setMnumber(e.target.value)}
              value={mnumber}
              required
              aria-invalid={validMnumber ? "false" : "true"}
              aria-describedby="mnumbernote"
              onFocus={() => setMnumberFocus(true)}
              onBlur={() => setMnumberFocus(false)}
              autoComplete="off"
            />
            <p
              id="mnumbernote"
              className={
                mnumberFocus && mnumber && !validMnumber
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Enter a valid phone number.
            </p>
          </div>
          <div className={classes.input}>
            <label htmlFor="email">
              Email
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validEmail || !email ? classes.hide : classes.invalid
                }
              />
            </label>
            <input
              id="email"
              placeholder="Email address"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              autoComplete="off"
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Enter a valid email.
            </p>
          </div>

          <div className={classes.input}>
            <label htmlFor="password">
              Password
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? classes.hide : classes.invalid}
              />
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />

            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd ? classes.instructions : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters and a number.
            </p>
          </div>

          <div className={classes.input}>
            <label htmlFor="confirm_pwd">
              Confirm Password
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validMatch && matchPwd ? classes.valid : classes.hide
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validMatch || !matchPwd ? classes.hide : classes.invalid
                }
              />
            </label>
            <input
              id="confirm_pwd"
              type="password"
              placeholder="Enter password again"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
          </div>
        </div>

        <div className={classes.actions}>
          <button
            disabled={
              isSubmitting ||
              !(
                validEmail &&
                validFirstname &&
                validLastname &&
                validMnumber &&
                validPwd &&
                validMatch
              )
            }
          >
            {isSubmitting ? "Submitting..." : "SIGN UP"}
          </button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
