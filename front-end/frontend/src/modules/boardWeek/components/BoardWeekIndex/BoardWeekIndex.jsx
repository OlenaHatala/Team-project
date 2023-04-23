import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetWeekQuery } from "../../api";
import {
  setModeAction,
  weekFetched,
  setLoadingAction,
} from "../../store/weekSlice";
import WeekBody from "../WeekBody/WeekBody";
import { selectModalsState } from "../../store/weekSlice";
import { NewTicketModalForm } from "../NewTicketModalForm";
import { EditTicketModalForm } from "../EditTicketModalForm";
import { skeletonTickets } from "../../utils/skeletonTickets";
import { Loader } from "../../../common/components";

export const BoardWeekIndex = ({ mode, id }) => {
  const dispatch = useDispatch();
  dispatch(setModeAction(mode));
  const { showNewTicket, showEditTicket } = useSelector(selectModalsState);
  const {
    data: tickets,
    isLoading,
    isSuccess,
  } = useGetWeekQuery({ boardId: id, weekIndex: 2 });
  
  let content = <WeekBody />;

  useEffect(() => {
    dispatch(setLoadingAction(true));
    dispatch(weekFetched(skeletonTickets));
    content = <WeekBody />;
  }, []);

  if (isSuccess) {
    dispatch(weekFetched(tickets));
    dispatch(setLoadingAction(false));
    content = <WeekBody />;
  }
  return (
    <>
      {content}
      {showNewTicket && <NewTicketModalForm />}
      {showEditTicket && <EditTicketModalForm />}
    </>
  );
};
