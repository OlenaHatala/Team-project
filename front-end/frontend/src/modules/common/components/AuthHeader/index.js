import React from "react";

import classes from "./AuthHeader.module.css";
import { ReactComponent as HeaderLogo } from "../../../../assets/headerlogo.svg";

import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes["auth-page__logo"]}>
          <Link to="/">
            <HeaderLogo height="60px" width="auto" margin="0" />
          </Link>
        </div>
    </header>
  );
};

export default AuthHeader;
