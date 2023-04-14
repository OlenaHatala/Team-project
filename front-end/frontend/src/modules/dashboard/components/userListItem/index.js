import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import randomColor from "randomcolor";
import classes from "./UserListItem.module.css";
import Buttons from "../buttons/index";

const UserListItem = (props) => {
  return (
    <ListItem key={props.id} className={classes["user-list-item"]}>
      <ListItemAvatar>
        <Avatar
          className={classes["user-list-avatar"]} style={{backgroundColor: randomColor({seed: props.name + props.surname,}),}}> 
          {props.name[0]}
          {props.lastName[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.name + " " + props.surname}
        secondary={props.mobile_number}
      />
      {!props.confirmed && <Buttons acceptClick={props.acceptClick} denyClick={props.denyClick}/>}
    </ListItem>
  );
};

export default UserListItem;
