import { useGetTicketsQuery } from "../../api";
import TakenTicket from "../TakenTicket/index.js";
import classes from "./TakenTicketList.module.css";

import CircularProgress from "@mui/material/CircularProgress";

export const TakenTicketList = () => {
  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTicketsQuery();

  let content;
  const noTicketsParagraph = (
    <div className={classes["without-tickets"]}>
      You haven't taken any tickets yet.
    </div>
  );

  if (isLoading) {
    content = (
      <div
        styles={{
          minHeight: "700px",
          height: "700px",
          width: "100%",
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          "background-color": "black",
        }}
      >
        <CircularProgress
          sx={{ marginBottom: "440px", marginInline: "auto" }}
        />
      </div>
    );
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
                duration={ticket.duration}
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
