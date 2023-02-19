import { Link } from 'react-router-dom';


import classes from './WeekHeader.module.css';

const WeekHeader = ({onShowTicketForm}) => {


  return (
  <>
    <div className={classes["new-ticket"]}>
      <button onClick={/*()=>{setTickets((prevTickets)=>{
        let newTickets = [];
        let mondayTcikets = prevTickets[0].monday;
        let newMondayTickets = [];
        let newTicket =  { id: "id1_3" , type: 'ticket', date: new Date("July 4 1776 16:00"), duration: 200  };
        for (let i = 0; i < mondayTcikets.length; i++) {
          newMondayTickets.push(mondayTcikets[i]);
        }
        newMondayTickets.push(newTicket);
        newTickets.push({...(prevTickets[0]), monday: newMondayTickets});
        for (let i = 0; i < 6; i++) {
          if (i === 0) {
            continue;
          }
          newTickets.push(prevTickets[i]);
        }
        return newTickets;

      })}        */    onShowTicketForm          }>Add new ticket</button>
      <Link to="/newboard">Configure Board</Link>
    </div>
    <div className={classes.days}>
      <div className={classes["day-button"]}>
        <button>Monday</button>
      </div>
      <div className={classes["day-button"]}>
        <button>Tuesday</button>
      </div>
      <div className={classes["day-button"]}>
        <button disabled>Wednesday</button>
      </div>
      <div className={classes["day-button"]}>
        <button>Thursday</button>
      </div>
      <div className={classes["day-button"]}>
        <button>Friday</button>
      </div>
      <div className={classes["day-button"]}>
        <button>Saturday</button>
      </div>
      <div className={classes["day-button"]}>
        <button>Sunday</button>
      </div>
    </div>
  </>
  );
};

export default WeekHeader;
