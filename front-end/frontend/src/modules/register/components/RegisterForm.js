import { useRef, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  validateRegisterEmail,
  validateRegisterMobileNum,
  validateRegisterName,
  validateRegisterPassword,
  validateRegisterPasswordConfirm,
} from "../../common/validation/userValidation";

import { useRegisterMutation } from "../api/registerApiSlice";
import { fromRegisterToServer } from "../api/apiRegisterObject";

import useRegisterInput from "../hooks/useRegisterInput";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "../../common/styles/authForm.module.css";


export function RegisterForm() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";

  const firstnameRef = useRef();
  const errRef = useRef();

  const {
    value: firstname,
    valid: validFirstname,
    focused: firstnameFocus,
    errors: firstnameErrors,
    showErrors: showFirstnameErrors,
    onValueChange: firstnameChangeHandler,
    onFocus: firstnameFocusHandler,
    onBlur: firstnameBlurHandler,
  } = useRegisterInput(validateRegisterName, "");

  const {
    value: lastname,
    valid: validLastname,
    focused: lastnameFocus,
    errors: lastnameErrors,
    showErrors: showLastnameErrors,
    onValueChange: lastnameChangeHandler,
    onFocus: lastnameFocusHandler,
    onBlur: lastnameBlurHandler,
  } = useRegisterInput(validateRegisterName, "");

  const {
    value: email,
    valid: validEmail,
    focused: emailFocus,
    errors: emailErrors,
    showErrors: showEmailErrors,
    onValueChange: emailChangeHandler,
    onFocus: emailFocusHandler,
    onBlur: emailBlurHandler,
  } = useRegisterInput(validateRegisterEmail, "");

  const {
    value: mnumber,
    valid: validMnumber,
    focused: mnumberFocus,
    errors: mnumberErrors,
    showErrors: showMnumberErrors,
    onValueChange: mnumberChangeHandler,
    onFocus: mnumberFocusHandler,
    onBlur: mnumberBlurHandler,
  } = useRegisterInput(validateRegisterMobileNum, "");

  const {
    value: pwd,
    valid: validPwd,
    focused: pwdFocus,
    errors: pwdErrors,
    showErrors: showPwdErrors,
    onValueChange: pwdChangeHandler,
    onFocus: pwdFocusHandler,
    onBlur: pwdBlurHandler,
  } = useRegisterInput(validateRegisterPassword, "");

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [matchErrors, setMatchErrors] = useState([]);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    firstnameRef.current.focus();
  }, []);

  useEffect(() => {
    const validationStatus = validateRegisterPasswordConfirm(pwd, matchPwd);
    if (validationStatus === "ok") {
      setValidMatch(true);
    } else {
      setValidMatch(false);
      setMatchErrors(validationStatus.split("+"));
    }
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [firstname, lastname, mnumber, email, pwd, matchPwd]);

  const modeSuggestionContent = "Already have an account?";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toServer = fromRegisterToServer({
      firstname,
      lastname,
      email,
      pwd,
      mnumber,
    });

    try {
      await register(toServer).unwrap();
      navigate(from, { replace: true });
    } catch (err) {
      if (err.status === 409) {
        setErrMsg("This email was already used");
      }
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
                onChange={(e) => firstnameChangeHandler(e.target.value)}
                value={firstname}
                required
                aria-invalid={validFirstname ? "false" : "true"}
                aria-describedby="fnamenote"
                onFocus={firstnameFocusHandler}
                onBlur={firstnameBlurHandler}
                autoComplete="off"
              />
              <p
                id="fnamenote"
                className={
                  showFirstnameErrors ? classes.instructions : classes.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                {firstnameErrors.map((error) => (
                  <span key={error}>
                    {error} <br />
                  </span>
                ))}
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
                onChange={(e) => lastnameChangeHandler(e.target.value)}
                value={lastname}
                required
                aria-invalid={validLastname ? "false" : "true"}
                aria-describedby="lnamenote"
                onFocus={lastnameFocusHandler}
                onBlur={lastnameBlurHandler}
                autoComplete="off"
              />
              <p
                id="lnamenote"
                className={
                  showLastnameErrors ? classes.instructions : classes.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                {lastnameErrors.map((error) => (
                  <span key={error}>
                    {error} <br />
                  </span>
                ))}
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
              onChange={(e) => mnumberChangeHandler(e.target.value)}
              value={mnumber}
              required
              aria-invalid={validMnumber ? "false" : "true"}
              aria-describedby="mnumbernote"
              onFocus={mnumberFocusHandler}
              onBlur={mnumberBlurHandler}
              autoComplete="off"
            />
            <p
              id="mnumbernote"
              className={
                showMnumberErrors ? classes.instructions : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              {mnumberErrors.map((error) => (
                <span key={error}>
                  {error} <br />
                </span>
              ))}
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
              onChange={(e) => emailChangeHandler(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={emailFocusHandler}
              onBlur={emailBlurHandler}
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
              {emailErrors.map((error) => (
                <span key={error}>
                  {error} <br />
                </span>
              ))}
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
              onChange={(e) => pwdChangeHandler(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={pwdFocusHandler}
              onBlur={pwdBlurHandler}
            />

            <p
              id="pwdnote"
              className={
                showPwdErrors ? classes.instructions : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              {pwdErrors.map((error) => (
                <span key={error}>
                  {error} <br />
                </span>
              ))}
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
              {matchErrors.map((error) => (
                <span key={error}>
                  {error} <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className={classes.actions}>
          <button
            disabled={
              isLoading ||
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
            {isLoading ? "Submitting..." : "SIGN UP"}
          </button>
        </div>
      </form>
    </>
  );
}
