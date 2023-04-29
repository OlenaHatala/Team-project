import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useGetWeekQuery,
  useDenyTicketMutation,
  useApproveTicketMutation,
  useTakeTicketMutation,
  useDeleteTicketMutation,
} from "../../api";

import {
  setModeAction,
  weekFetched,
  setLoadingAction,
  selectWeekIndex,
  selectModalsState,
  setLoadingTicketIdAction,
} from "../../store/weekSlice";

import { setNotificationAction } from "../../../../modules/notifications/store/notificationsSlice";

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
  const [takeTicket, { isLoading: takingInProgress }] = useTakeTicketMutation();
  const [deleteTicket, { isLoading: deletingInProgress }] =
    useDeleteTicketMutation();
  const [areYouSure, setAreYouSure] = useState(areYouSureInitialState);

  const {
    data: response,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetWeekQuery({ boardId: id, weekIndex: weekIndex });

  useEffect(() => {
    //if (isLoading || isFetching) {
    dispatch(setLoadingAction(true));
    dispatch(weekFetched({ tickets: skeletonTickets, dates: {} }));
    //}
  }, [weekIndex]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(
        weekFetched({ tickets: response.tickets, dates: response.dates })
      );
      dispatch(setLoadingTicketIdAction(""));
      dispatch(setLoadingAction(false));
    }
  }, [isLoading, isFetching, response]);

  const denyHandler = (ticket) => {
    const action = async () => {
      dispatch(setLoadingTicketIdAction(ticket._id));
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
      dispatch(setLoadingTicketIdAction(ticket._id));
      const response = await approveTicket(ticket).unwrap();
    };

    setAreYouSure({
      open: true,
      title: "Add user",
      question: "Add user to the members of your board",
      action,
    });
  };

  const takeTicketHandler = (ticket) => {
    if (!ticket.enabled) {
      return;
    }
    const action = async () => {
      dispatch(setLoadingTicketIdAction(ticket._id));
      const response = await takeTicket({ ...ticket }).unwrap();
      dispatch(
        setNotificationAction({
          message: response?.message,
          messageType: "error",
        })
      );
    };

    setAreYouSure({
      open: true,
      title: "Take ticket",
      question: "",
      action,
    });
  };

  const deleteTicketHandler = (ticket) => {
    const action = async () => {
      dispatch(setLoadingTicketIdAction(ticket._id));
      const response = await deleteTicket({ ...ticket }).unwrap();
    };

    setAreYouSure({
      open: true,
      title: "Delete ticket",
      question:
        "You can delete only not taken tickets. You can easily re-create ticket for current time later.",
      action,
    });
  };

  const closeAreYouSure = () => {
    setAreYouSure(areYouSureInitialState);
  };

  return (
    <>
      <WeekBody
        onTicketApprove={approveHandler}
        onTicketDeny={denyHandler}
        onTicketTake={takeTicketHandler}
        onTicketDelete={deleteTicketHandler}
      />
      {showNewTicket && (
        <NewTicketModalForm boardId={id} weekIndex={weekIndex} />
      )}
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
