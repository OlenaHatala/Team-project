import { TicketHead } from "../TicketHead";
import { useSelector } from "react-redux";
import { selectWeekMode } from "../../store/weekSlice";

export const NoUserTicketInner = ({ ticket }) => {
  const mode = useSelector(selectWeekMode);
  let status;


  if (ticket.is_outdated) {
    status = 'outdated';
  } else if (ticket.enabled) {
    status = 'available';
  } else if (ticket?.in_waitlist) {
    status = 'in waitlist'
  } else if (ticket?.is_rejected) {
    status = 'rejected'
  }else if (ticket?.is_yours) {
    status = 'your ticket'
  }else {
    status = 'disabled';
  }

  return (
    <div>
      <TicketHead
        datetime={ticket.datetime}
        duration={ticket.duration}
        status={status}
      />
    </div>
  );
};
