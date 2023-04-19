import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import randomColor from "randomcolor";
import classes from "./UserListItem.module.css";
import Buttons from "../buttons/index";

const UserListItem = ({
  id,
  name,
  surname,
  mobile_number,
  acceptClick,
  denyClick,
  confirmed,
}) => {
  return (
    <ListItem key={id} className={classes["user-list-item"]}>
      <ListItemAvatar>
        <Avatar
          className={classes["user-list-avatar"]}
          style={{ backgroundColor: randomColor({ seed: name + surname }) }}
        >
          {name[0]}
          {surname[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography className={classes["body-text"]}>
            {name + " " + surname}
          </Typography>
        }
        secondary={
          <Typography className={classes["body-text"]}>
            {mobile_number}
          </Typography>
        }
      />
      {!confirmed && (
        <Buttons
          acceptClick={() => {
            acceptClick(id);
          }}
          denyClick={() => {
            denyClick(id);
          }}
        />
      )}
    </ListItem>
  );
};

export default UserListItem;
