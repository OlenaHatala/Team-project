import { useDispatch, useSelector } from "react-redux";
import { useGetWeekQuery } from "../../api";
import { setModeAction, weekFetched } from "../../store/weekSlice";
import WeekBody from "../WeekBody/WeekBody";
import { selectModalsState } from "../../store/weekSlice";
import { NewTicketModalForm } from "../NewTicketModalForm";
import { EditTicketModalForm } from "../EditTicketModalForm";

export const BoardWeekIndex = ({ mode, id }) => {
  const dispatch = useDispatch();
  dispatch(setModeAction(mode));
  const { showNewTicket, showEditTicket } = useSelector(selectModalsState);
  const {
    data: tickets,
    isLoading,
    isSuccess,
  } = useGetWeekQuery({ boardId: id, weekIndex: 2 });


  let content = <p>Loading week</p>;
  if (isSuccess) {
    dispatch(weekFetched(tickets));
    content = <WeekBody />;
  }
  if (isLoading) {
    content = <p>Loading week</p>;
  }
  return (
    <>
      {content}
      {showNewTicket && <NewTicketModalForm />}
      {showEditTicket && <EditTicketModalForm />}
    </>
  );
};
