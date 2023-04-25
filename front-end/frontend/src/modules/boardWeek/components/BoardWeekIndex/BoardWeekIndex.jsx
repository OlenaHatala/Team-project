import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useGetWeekQuery,
  useDenyTicketMutation,
  useApproveTicketMutation,
} from "../../api";

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
import { AreYouSure, Loader } from "../../../common/components";

const areYouSureInitialState = {
  open: false,
  title: "",
  question: "",
  action: () => {},
};

export const BoardWeekIndex = ({ mode, id, weekIndex }) => {
  const dispatch = useDispatch();
  dispatch(setModeAction(mode));
  const { showNewTicket, showEditTicket } = useSelector(selectModalsState);
  const [denyTicket, { isLoading: denyLoading }] = useDenyTicketMutation();
  const [approveTicket, { isLoading: approveLoading }] =
    useApproveTicketMutation();

  const [areYouSure, setAreYouSure] = useState(areYouSureInitialState);

  const {
    data: response,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetWeekQuery({ boardId: id, weekIndex: weekIndex });

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(setLoadingAction(true));
      dispatch(weekFetched({ tickets: skeletonTickets, dates: {} }));
    }
  }, [weekIndex, isLoading, isFetching]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(
        weekFetched({ tickets: response.tickets, dates: response.dates })
      );
      dispatch(setLoadingAction(false));
    }
  }, [isLoading, isFetching, response]);

  const denyHandler = (ticket) => {
    const action = async () => {
      const response = await denyTicket(ticket).unwrap();
    };

    setAreYouSure({
      open: true,
      title: "Ticket confirmation",
      question: "Are you sure you want to deny user request for ticket?",
      action,
    });
  };

  const approveHandler = (ticket) => {
    const action = async () => {
      const response = await approveTicket(ticket).unwrap();
    };

    setAreYouSure({
      open: true,
      title: "Add user",
      question: "Add user to the members of your board",
      action,
    });
  };

  const closeAreYouSure = () => {
    setAreYouSure(areYouSureInitialState);
  };

  return (
    <>
      <WeekBody onTicketApprove={approveHandler} onTicketDeny={denyHandler} />
      {showNewTicket && <NewTicketModalForm />}
      {showEditTicket && <EditTicketModalForm />}
      {areYouSure.open ? (
        <AreYouSure
          title={areYouSure.title}
          question={areYouSure.question}
          onClose={closeAreYouSure}
          onContinue={areYouSure.action}
        />
      ) : null}
    </>
  );
};
