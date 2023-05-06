import React, { useEffect, useState, useCallback, memo } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Grid, Snackbar } from "@mui/material";

import { clearNotificationAction, selectNotification } from "../store/notificationsSlice";

export const Notification = memo(() => {
  const dispatch = useDispatch();
  //const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const notificationData = useSelector(selectNotification);
  
  let content = (
    <Grid             sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: "50px",
        padding: "16px 40px",
        color: "#1c1333",
        "background-color": "#d1a504",
        borderRadius: "4px",
      }}>{message}</Grid>
  );

  useEffect(() => {
    if (notificationData?.message) {
      setMessage(notificationData?.message);
    }
    if (notificationData.messageType === "error") {
        content = (
          <Grid
            sx={{
              height: "50px",
              padding: "16px 40px",
              color: "white",
              "background-color": "red",
            }}
          >
            {message}
          </Grid>
        );
      }
    
      if (notificationData.messageType === "success") {
        content = (
          <Grid
            sx={{
              height: "50px",
              padding: "16px 40px",
              color: "white",
              "background-color": "green",
            }}
          >
            {message}
          </Grid>
        );
      }
  }, [notificationData]);

  const handleClose = useCallback((_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearNotificationAction());
  }, []);

  return (
    <Snackbar
      sx={{ height: "200px", width: "100%" }}
      open={notificationData.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {content}
    </Snackbar>
  );
})
