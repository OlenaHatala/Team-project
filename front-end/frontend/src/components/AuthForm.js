import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import React, { useState } from "react";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [type, setType]=useState('password');
  const [icon, setIcon]=useState(eyeOff);
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const saveButtonLabel = isLogin ? "LOG IN" : "SIGN UP";
  const modeSuggestionContent = isLogin
    ? "Don't have an account? Create one"
    : "Already have an account?";

  const handleToggle=()=>{    
    if(type==='password'){
      setIcon(eye);      
      setType('text');
    }
    else{
      setIcon(eyeOff);     
      setType('password');
    }
  }

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "LOG IN" : "REGISTER FOR AN ACCOUNT"}</h1>
        <div className={classes["mode-suggestion"]}>
          {<p>{modeSuggestionContent}</p>}
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "here" : "Log In"}
          </Link>
        </div>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <div className={classes.input}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            required
          />
        </div>
        {!isLogin && (
          <div className={classes.input}>
            <label htmlFor="number">Number</label>
            <input
              id="number"
              type="text"
              name="number"
              placeholder="Number"
              required
            />
          </div>
        )}
        <div className={classes["fullname-input-block"]}>
          {!isLogin && (
            <div className={`${classes.left} ${classes.input}`}>
              <label htmlFor="firstname">First name</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="First name"
                required
              />
            </div>
          )}
          {!isLogin && (
            <div className={`${classes.right} ${classes.input}`}>
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Last name"
                required
              />
            </div>
          )}
        </div>
        <div className={classes.input}>
          <label htmlFor="image">Password</label>
          <div className={classes["password-input-block"]}>
            <input
              id="password"
              type={type}
              name="password"
              placeholder={isLogin? 'Enter password' : 'Create password'}
              required
            />
            <span onClick={handleToggle}><Icon icon={icon} size={25}/></span>
          </div>
        </div>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : saveButtonLabel}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
