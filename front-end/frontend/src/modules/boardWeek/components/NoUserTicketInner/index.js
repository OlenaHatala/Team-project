import { TicketHead } from "../TicketHead";
import { useSelector } from "react-redux";
import { selectWeekMode } from "../../store/weekSlice";

export const NoUserTicketInner = ({ ticket }) => {
  const mode = useSelector(selectWeekMode);
  const status = ticket.is_outdated
    ? "outdated"
    : ticket.enabled || mode === "member"
    ? "available"
    : "disabled";

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
