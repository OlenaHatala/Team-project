import classes from './TakenTicketList.module.css';
import TakenTicket from './TakenTicket';
import { default_tickets } from './DefaultTickets';
 
function TakenTicketList() {

  return (
      <div className={classes["ticket-list"]}>
        {default_tickets.map(ticket => (
          <div key={ticket.id} className={classes["ticket-list-item"]}>
           <TakenTicket status={ticket.status} boardName={ticket.boardName} date={ticket.date} time={ticket.time}/>
          </div>
        ))}
      </div>
  );
}

export default TakenTicketList;