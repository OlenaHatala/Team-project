import { useState } from "react";
import { useMediaQuery } from "@mui/material";

import { device } from "../../../common/constants";
import { Card } from "../../../common/UI";

import { UserList } from "./UserList";
import { MobileWrapper } from "./MobileWrapper";

import classes from "./Members.module.css";
import { AlertCounter } from "../../../common/components/AlertCounter";

export const Members = ({ members, requests }) => {
  const [userlistType, setUserlistType] = useState("users");
  const [mobileWrapperIsOpen, setMobileWrapperIsOpen] = useState(false);

  const isTabletView = useMediaQuery(device.tabletM, { noSsr: true });
  const isMobileView = useMediaQuery(device.mobile, { noSsr: true });

  const MembersWrapper = isTabletView ? MobileWrapper : Card;

  return (
    <>
      <MembersWrapper
        style={{
          "margin-right": "0",
        }}
        alertCounter={requests?.length || 0}
        isOpen={mobileWrapperIsOpen}
        toggleOpen={() => {
          setMobileWrapperIsOpen((state) => !state);
        }}
      >
        {isMobileView && (
          <UserList
            users={userlistType === "users" ? members : requests}
            userlistType={userlistType}
          />
        )}
        <div className={classes["list-toggle-container"]}>
          <button
            className={
              userlistType === "requests"
                ? `${classes["noactive-button"]} ${classes.button}`
                : classes.button
            }
            onClick={() => {
              setUserlistType("users");
            }}
            disabled={userlistType === "users"}
          >
            {`Clients${members?.length > 0 ? ` (${members?.length})` : ""}`}
          </button>
          <button
            className={
              userlistType === "users"
                ? `${classes["noactive-button"]} ${classes.button}`
                : classes.button
            }
            onClick={() => {
              setUserlistType("requests");
            }}
            disabled={userlistType === "requests"}
          >
            <span style={{ display: "flex", justifyContent: "center" }}>
              Requests
              {requests?.length > 0 && (
                <AlertCounter
                  value={requests.length}
                  style={{ position: "relative", left: "5px", top: "2px" }}
                />
              )}
            </span>
          </button>
        </div>
        {!isMobileView && (
          <UserList
            users={userlistType === "users" ? members : requests}
            userlistType={userlistType}
          />
        )}
      </MembersWrapper>
    </>
  );
};
