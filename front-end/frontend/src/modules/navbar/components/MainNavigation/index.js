import { NavLink } from "react-router-dom";
import { useLogout, useSelectUser} from "../../../auth";

import classes from "./MainNavigation.module.css";

export function MainNavigation() {
  const user = useSelectUser();
  const { loggingOut, logout } = useLogout();
  const userEmail = user?.email;
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
          {userEmail && (
            <li>
              <NavLink
                to="/boards"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                My Boards
              </NavLink>
            </li>
          )}
          {!userEmail && (
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
          {userEmail && (
            <li>
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                My Tickets
              </NavLink>
            </li>
          )}
          {userEmail && (
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
          {userEmail && (
            <li>
              <button onClick={logout}>
                {loggingOut ? "logging out..." : "Log out"}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
