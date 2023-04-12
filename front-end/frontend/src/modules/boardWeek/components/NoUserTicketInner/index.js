import { TicketHead } from "../TicketHead";

export const NoUserTicketInner = ({ ticket }) => {
  const status = ticket.is_outdated
    ? "outdated"
    : ticket.enabled
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
