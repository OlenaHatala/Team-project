import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";

import { IconCounter } from "../../../common/components";

import classes from "./Members.module.css";
import { Backdrop } from "../../../common/components/Modal";

export const MobileWrapper = ({ children, isOpen, toggleOpen, alertCounter }) => {
  const left = isOpen ? "0" : "-300px";

  const toggleBtnLeft = isOpen ? "300px" : "0";
  const toggleBtnPaddingRight = isOpen ? "11px" : "0";
  const toggleBtnWidth = isOpen ? "38px" : "45px";

  return (
    <>
      {isOpen && <Backdrop onClose={toggleOpen} />}
      <div
        className={classes["members-toggle-button"]}
        style={{
          left: toggleBtnLeft,
          paddingRight: toggleBtnPaddingRight,
          width: toggleBtnWidth,
        }}
        onClick={() => {
          toggleOpen();
        }}
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <IconCounter
            showZero={false}
            value={alertCounter}
            style={{ marginLeft: "12px" }}
          >
            <GroupsIcon />
          </IconCounter>
        )}
      </div>
      {!isOpen && (
        <div
          className={classes["button-bar-connector"]}
          style={{ left: toggleBtnLeft }}
        ></div>
      )}
      <div className={classes["mobile-wrapper"]} style={{ left: left }}>
        {children}
      </div>
    </>
  );
};
