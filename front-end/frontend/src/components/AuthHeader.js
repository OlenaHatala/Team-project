import React from "react";

import classes from "./AuthHeader.module.css";

import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <div className={classes["auth-page__logo"]}>
      <Link to="/">
        <p>Loggions</p>
        <span>Home</span>
      </Link>
    </div>
  );
};

export default AuthHeader;
