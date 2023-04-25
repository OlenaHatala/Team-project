import { NavLink } from "react-router-dom";
import { useLogout, useSelectUser } from "../../../auth";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import classes from "./MainNavigation.module.css";
import { useState } from "react";

export function MainNavigation() {
  const user = useSelectUser();
  const { loggingOut, logout } = useLogout();
  const username = user?.name;
  const surname = user?.surname;

  const [activeItem, setActiveItem] = useState("");

  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <ul className={classes.list}>
          {!username && (
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  if (isActive) {
                    setActiveItem("/");
                  }
                  return isActive ? classes.active : undefined;
                }}
                end
              >
                <div
                  className={
                    activeItem === "/"
                      ? classes["active-item"]
                      : classes["header-item"]
                  }
                >
                  Home
                </div>
              </NavLink>
            </li>
          )}
          {username && (
          <li>
            <NavLink
              to="/newboard"
              className={({ isActive }) => {
                if (isActive) {
                  setActiveItem("/newboard");
                }
                return isActive ? classes.active : undefined;
              }}
            >
              <div
                className={
                  activeItem === "/newboard"
                    ? classes["active-item"]
                    : classes["header-item"]
                }
              >
                New Board
              </div>
            </NavLink>
          </li>)}
          {username && (
            <li>
              <NavLink
                to="/boards"
                className={({ isActive }) => {
                  if (isActive) {
                    setActiveItem("/boards");
                  }
                  return isActive ? classes.active : undefined;
                }}
              >
                <div
                  className={
                    activeItem === "/boards"
                      ? classes["active-item"]
                      : classes["header-item"]
                  }
                >
                  My Boards
                </div>
              </NavLink>
            </li>
          )}
          {!username && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  if (isActive) {
                    setActiveItem("/");
                  }
                  return isActive ? classes.active : undefined;
                }}
              >
                <div
                  className={
                    activeItem === "/login"
                      ? classes["active-item"]
                      : classes["header-item"]
                  }
                >
                  Authentication
                </div>
              </NavLink>
            </li>
          )}
          {username && (
            <li>
              <NavLink
                to="/tickets"
                className={({ isActive }) => {
                  if (isActive) {
                    setActiveItem("/tickets");
                  }
                  return isActive ? classes.active : undefined;
                }}
              >
                <div
                  className={
                    activeItem === "/tickets"
                      ? classes["active-item"]
                      : classes["header-item"]
                  }
                >
                  My Tickets
                </div>
              </NavLink>
            </li>
          )}
        </ul>
        <div className={classes["right-block"]}>
          {username && (
            <div>
              <NavLink
                to="/account"
                className={({ isActive }) => {
                  if (isActive) {
                    setActiveItem("/account");
                  }
                  return isActive ? classes.active : undefined;
                }}
              >
                <div
                  className={
                    activeItem === "/account"
                      ? classes["active-item"]
                      : classes["header-item"]
                  }
                >
                  <div className={classes.icon}>
                    <AccountCircleIcon sx={{ "font-size": "30px" }} />
                  </div>

                  {username + " " + surname}
                </div>
              </NavLink>
            </div>
          )}
          {username && (
            <div>
              <div className={classes["header-item"]}>
                <button
                  disabled={loggingOut}
                  className={classes.logout}
                  onClick={logout}
                >
                  <LogoutIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
