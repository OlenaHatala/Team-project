import React from "react";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import CopyToClipboardButton from "./CopyToClipboardButton";

import classes from "./BoardHeader.module.css";

const BoardHeader = ({ label, servname, description, address, link }) => {
  return (
    <div className={classes["board-header"]}>
      <div className={description ? classes["titles"] : classes["titles-padding"]}>
        <h1 align="left">{label}</h1>
        <h3>{servname}</h3>
        {description && <p>{description}</p>}
      </div>
      <div className={classes["header-right-block"]}>
        {address && (
          <div className={classes["address-container"]}>
            <LocationOnIcon />
            <p>{address}</p>
          </div>
        )}
        <div className={classes["link-btn-container"]}>
          <CopyToClipboardButton link={link} />
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
