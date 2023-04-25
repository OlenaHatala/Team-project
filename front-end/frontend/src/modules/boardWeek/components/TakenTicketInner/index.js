import React from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import classes from './TakenTicketInner.module.css';
import { TicketHead } from "../TicketHead";
import randomColor from "randomcolor";

export const TakenTicketInner = ({ ticket }) => {
  return (
    <>
      <TicketHead
        datetime={ticket.datetime}
        duration={ticket.duration}
        status={status}
      />

    <div className={classes.content}>
        <div className={classes["avarar-wrapper"]}>
          <Avatar className={classes.avatar} style={{backgroundColor: randomColor({seed: ticket.user.name + ticket.user.surname,}),}}> 
            {ticket.user.name[0]}
            {ticket.user.surname[0]}
          </Avatar>
        </div>
          <Typography className={classes.name}>{ticket.user.name} {ticket.user.surname}</Typography>
      </div>
    </>
  );
};