import React, { useState } from "react";
import { useSelector } from "react-redux";

import randomColor from "randomcolor";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";

import Buttons from "../../../common/components/buttons/index";
import { useApproveRequestMutation, useDenyRequestMutation } from "../../api";
import { selectBoardId } from "../../store";

import classes from "./UserListItem.module.css";
import { AreYouSure, Loader } from "../../../common/components";

const areYouSureInitialState = {
  open: false,
  title: "",
  question: "",
  action: () => {},
};

const UserListItem = ({ id, name, surname, mobile_number, confirmed }) => {
  const [areYouSure, setAreYouSure] = useState(areYouSureInitialState);
  const boardId = useSelector(selectBoardId);
  const [approveRequest, { isLoading: approveLoading }] =
    useApproveRequestMutation();
  const [denyRequest, { isLoading: denyLoading }] = useDenyRequestMutation();

  const denyHandler = () => {
    const action = async () => {
      const response = await denyRequest({
        user_id: id,
        board_id: boardId,
      }).unwrap();
    };

    setAreYouSure({
      open: true,
      title: "Forbid access",
      question:
        "Are you sure you want to forbid access to your board for the user?",
      action,
    });
  };

  const approveHandler = () => {
    const action = async () => {
      const response = await approveRequest({
        user_id: id,
        board_id: boardId,
      }).unwrap();
    };

    setAreYouSure({
      open: true,
      title: "Add user",
      question: "Add user to the members of your board",
      action,
    });
  };

  const closeAreYouSure = () => {
    setAreYouSure(areYouSureInitialState);
  };

  return (
    <>
      {areYouSure.open ? (
        <AreYouSure
          title={areYouSure.title}
          question={areYouSure.question}
          onClose={closeAreYouSure}
          onContinue={areYouSure.action}
        />
      ) : null}
      <div className={classes.container}>
        {approveLoading || denyLoading ? <Loader /> : null}
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
            <Buttons acceptClick={approveHandler} denyClick={denyHandler} />
          )}
        </ListItem>
      </div>
    </>
  );
};

export default UserListItem;
