import { useGetTicketsQuery } from "../../api";
import TakenTicket from "../TakenTicket/index.js";
import classes from "./TakenTicketList.module.css";

export const TakenTicketList = () => {
  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTicketsQuery();

  let content;
  const noTicketsParagraph = <p>You haven't taken any tickets yet.</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <>
        <div className={classes["ticket-list"]}>
          {tickets.map((ticket) => (
            <div key={ticket._id} className={classes["ticket-list-item"]}>
              <TakenTicket
                status={ticket.status}
                boardName={ticket.boardName}
                date={ticket.date}
                time={ticket.time}
                boardId={ticket.boardId}
              />
            </div>
          ))}
        </div>
        {tickets?.length === 0 ? noTicketsParagraph : null}
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
