import Buttons from "../../../common/components/buttons";
import { Avatar, Typography } from '@mui/material';
import classes from './RequestedTicketInner.module.css';
import randomColor from "randomcolor";
import { TicketHead } from "../TicketHead";

export const RequestedTicketInner = ({ ticket, onDeny, onApprove }) => {

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
      <Typography>Require confirmation</Typography>
      <Buttons slim={true} denyClick={onDeny} acceptClick={onApprove}/>
      </>
  );
};
