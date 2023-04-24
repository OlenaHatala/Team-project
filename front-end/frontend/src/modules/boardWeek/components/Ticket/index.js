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
import { useTakeTicketMutation } from "../../api";

export const Ticket = (props) => {
  const mode = useSelector(selectWeekMode);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const [takeTicket, { isLoading: takingInProgress }] = useTakeTicketMutation();

  let status = "nouser";
  let statusClass;
  if (props.ticket?.user && props.ticket?.confirmed) {
    status = "confirmed";
    statusClass = classes["confirmed-ticket"];
  }
  if (props.ticket?.user && !props.ticket?.confirmed) {
    status = "requested";
    statusClass = classes["requested-ticket"];
  }
  if (props.ticket?.is_outdated) {
    status = "outdated";
    statusClass = classes["outdated-ticket"];
  }
  if (props.ticket?.enabled && !props.ticket?.is_outdated) {
    statusClass = classes["ebabled-ticket"];
  }
  if (!props.ticket?.enabled && !props.ticket?.is_outdated) {
    statusClass = classes["disbabled-ticket"];
  }

  const denyHandler = async () => {
    console.log("deny ticket taking action");
  };

  const approveHandler = async () => {
    console.log("approve ticket taking action");
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
        action: () => {
          console.log("delete ticket action");
        },
      });
    }
  } else if (mode === "member") {
    actions.push({
      type: "take",
      action: async (ticket) => {
        await takeTicket({ ...ticket }).unwrap();
      },
    });
  }

  let inner;
  if (status === "confirmed") {
    inner = <TakenTicketInner ticket={props.ticket} />;
  } else if (status === "requested") {
    inner = (
      <RequestedTicketInner
        ticket={props.ticket}
        onDeny={denyHandler}
        onApprove={approveHandler}
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
          <div className={classes["action-section"]}>
            {hover ? (
              <div className={classes["quick-actions"]}>
                {actions.map((action) => (
                  <div key={action.type} className={classes["action-container"]}>
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
          {inner}
        </div>
      )}
    </>
  );
};

const iconSxStyles = { fontSize: "17px", color: "rgb(149, 149, 149)" };
