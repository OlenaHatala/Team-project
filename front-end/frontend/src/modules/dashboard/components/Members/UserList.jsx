import React from "react";
import UserListItem from "../userListItem/index";
import classes from "./UserList.module.css";

export const UserList = ({ users, userlistType }) => {
  const noUserText =
    userlistType === "users"
      ? "No one has joined your board yet."
      : "You don't have new requests.";
  return (
    <>
      {users?.length === 0 ? (
        <p className={classes["nousers-p"]}>{noUserText}</p>
      ) : null}
      <div className={classes["user-div"]}>
        <ul className={classes["user-list"]}>
          {users.map((user) => (
            <UserListItem
              key={user.id}
              id={user.id}
              name={user.name}
              surname={user.surname}
              mobile_number={user.mobile_number}
              confirmed={user.confirmed}
            />
          ))}
        </ul>
      </div>

      {/*      <ul className={classes["user-list"]}>
        {requests.map((user) => (
          <UserListItem
            key={user.id}
            name={user.name}
            surname={user.surname}
            mobile_number={user.mobile_number}
            confirmed={user.confirmed}
            acceptClick={acceptClick}
            denyClick={denyClick}
          />
        ))}
      </ul>*/}
    </>
  );
};
