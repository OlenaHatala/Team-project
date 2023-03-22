import { useGetTicketsQuery } from "../../api";

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
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <>
        <div>
          {tickets.map((ticket) => (
            <div key={ticket._id}>{JSON.stringify(ticket)}</div>
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
