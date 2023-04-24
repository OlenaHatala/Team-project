import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetWeekQuery } from "../../api";

import {
  setModeAction,
  weekFetched,
  setLoadingAction,
  selectWeekIndex,
  selectModalsState,
} from "../../store/weekSlice";

import WeekBody from "../WeekBody/WeekBody";
import { NewTicketModalForm } from "../NewTicketModalForm";
import { EditTicketModalForm } from "../EditTicketModalForm";

import { skeletonTickets } from "../../utils/skeletonTickets";

export const BoardWeekIndex = ({ mode, id, weekIndex }) => {
  const dispatch = useDispatch();
  dispatch(setModeAction(mode));
  const { showNewTicket, showEditTicket } = useSelector(selectModalsState);

  const {
    data: response,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetWeekQuery({ boardId: id, weekIndex: weekIndex });
  
  let content = <WeekBody />;

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(setLoadingAction(true));
      dispatch(weekFetched({tickets: skeletonTickets, dates: {}}));
    }
  }, [weekIndex, isLoading, isFetching]);

    useEffect(() => {
      if (!isLoading && !isFetching) {
        dispatch(weekFetched({tickets: response.tickets, dates: response.dates}));
        dispatch(setLoadingAction(false));
      }
  }, [isLoading, isFetching, response]);

  return (
    <>
      {content}
      {showNewTicket && <NewTicketModalForm />}
      {showEditTicket && <EditTicketModalForm />}
    </>
  );
};
