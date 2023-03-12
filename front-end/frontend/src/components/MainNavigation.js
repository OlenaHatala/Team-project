import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const { accessToken } = useAuth();
  const logout = useLogout();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
          <NavLink
              to="/newboard"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              New Board
            </NavLink>
          </li>
          {!accessToken && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {accessToken && (
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                My Account
              </NavLink>
            </li>
          )}
          {true && (
            <li>
              <button onClick={logout}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
