import { useState } from "react";

import { NoUserTicketInner } from "../NoUserTicketInner";
import { RequestedTicketInner } from "../RequestedTicketInner";
import { TakenTicketInner } from "../TakenTicketInner";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import classes from "./Ticket.module.css";
import { TicketSkeleton } from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWeekMode,
  selectIsLoading,
  showEditTicketAction,
} from "../../store/weekSlice";
import { useTakeTicketMutation, useDeleteTicketMutation } from "../../api";

export const Ticket = (props) => {
  const mode = useSelector(selectWeekMode);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const [takeTicket, { isLoading: takingInProgress }] = useTakeTicketMutation();
  const [deleteTicket, { isLoading: deletingInProgress }] =
    useDeleteTicketMutation();

  let status = "nouser";
  let statusClass = classes["enabled-ticket"];

  if (props.ticket?.is_outdated) {
    if (mode === "owner") {
      status = "outdated";
    }
    statusClass = classes["outdated-ticket"];
  }else  if (props.ticket?.user && props.ticket?.confirmed) {
    if (mode === "owner") {
      status = "confirmed";
    }
    statusClass = classes["confirmed-ticket"];
  } else if (props.ticket?.user && !props.ticket?.confirmed) {
    if (mode === "owner") {
      status = "requested";
    }
    statusClass = classes["requested-ticket"];
  } else if (props.ticket?.is_yours){
    statusClass = classes["taken-ticket"];
  }
  else if (props.ticket?.is_rejected){
    statusClass = classes["rejected-ticket"];
  }
  else if (props.ticket?.in_waitlist){
    statusClass = classes["waitlist-ticket"];
  } else if (!props.ticket?.enabled && !props.ticket?.is_outdated) {
      statusClass = classes["disabled-ticket"];
    }

  // if (mode === "owner") {
  //   if (props.ticket?.enabled && !props.ticket?.is_outdated) {
  //     statusClass = classes["enabled-ticket"];
  //   } else if (!props.ticket?.enabled && !props.ticket?.is_outdated) {
  //     statusClass = classes["disabled-ticket"];
  //   }
  // }

  const denyHandler = async (ticket) => {
    props?.onTicketDeny(ticket);
  };

  const approveHandler = async (ticket) => {
    props?.onTicketApprove(ticket);
  };

  let actions = [];
  if (mode === "owner") {
    if (status === "nouser") {
      actions.push({
        type: "configure",
        action: () => {
          dispatch(showEditTicketAction(props.ticket));
        },
      });
    }
    if (status === "nouser" || status === "outdated") {
      actions.push({
        type: "delete",
        action: async (ticket) => {
          console.log({ ...ticket });
          await deleteTicket({ ...ticket }).unwrap();
        },
      });
    }
  } else if (mode === "member" && props.ticket.enabled) {
    actions.push({
      type: "take",
      action: async (ticket) => {
        await takeTicket({ ...ticket }).unwrap();
      },
    });
  }

  let inner;
  if (status === "confirmed" && mode === "owner") {
    inner = <TakenTicketInner ticket={props.ticket} />;
  } else if (status === "requested" && mode === "owner") {
    inner = (
      <RequestedTicketInner
        ticket={props.ticket}
        onDeny={() => {
          denyHandler(props.ticket);
        }}
        onApprove={() => {
          approveHandler(props.ticket);
        }}
      />
    );
  } else {
    inner = <NoUserTicketInner ticket={props.ticket} />;
  }

  return (
    <>
      {isLoading ? (
        <TicketSkeleton ticket={props.ticket} height={props.height} />
      ) : (
        <div
          className={`${classes.ticket} ${statusClass}`}
          style={{
            height: `${props.height}%`,
          }}
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <div
            className={
              props.ticket.duration > 50 || hover
                ? classes["action-section"]
                : classes["action-section-hidden"]
            }
          >
            {hover ? (
              <div className={classes["quick-actions"]}>
                {actions.map((action) => (
                  <div
                    key={action.type}
                    className={classes["action-container"]}
                  >
                    <Tooltip title={action.type}>
                      <IconButton
                        onClick={() => {
                          action.action(props.ticket);
                        }}
                        sx={{ height: "20px" }}
                      >
                        {action.type === "delete" ? (
                          <DeleteIcon sx={iconSxStyles} />
                        ) : null}
                        {action.type === "configure" ? (
                          <EditIcon sx={iconSxStyles} />
                        ) : null}
                        {action.type === "take" ? (
                          <RocketLaunchIcon sx={iconSxStyles} />
                        ) : null}
                      </IconButton>
                    </Tooltip>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className={classes["flex-inner"]}>{inner}</div>
        </div>
      )}
    </>
  );
};

const iconSxStyles = { fontSize: "17px", color: "#F5F5DC" };