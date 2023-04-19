import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowNewTicketAction } from "../../../boardWeek";
import { useGetOwnerBoardQuery } from "../../api";
import { BoardWeekIndex } from "../../../boardWeek";
import {
  boardFetched,
  selectDashboardAll,
  toggleShowConfigureBoardAction,
} from "../../store";
import ConfigureBoardModal from "../../../newBoard/ConfigureBoardModal/ConfigureBoardModal";
import classes from "./DashboardIndex.module.css";

import { Card } from "../../../common/UI";
import { BoardHeader } from "../../../common/components";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

import UserList from "../userList/index";

const users = [
  {
    id: 1,
    name: "Jane",
    surname: "Smith",
    mobile_number: "0731111111",
    confirmed: true,
  },
  {
    id: 2,
    name: "Alice",
    surname: "Williams",
    mobile_number: "0731111111",
    confirmed: true,
  },
  {
    id: 3,
    name: "Alice",
    surname: "Williams",
    mobile_number: "0731111111",
    confirmed: true,
  },
  {
    id: 4,
    name: "Alice",
    surname: "Williams",
    mobile_number: "0731111111",
    confirmed: true,
  },
  {
    id: 5,
    name: "Alice",
    surname: "Williams",
    mobile_number: "0731111111",
    confirmed: true,
  },
  {
    id: 6,
    name: "Alice",
    surname: "Williams",
    mobile_number: "0731111111",
    confirmed: true,
  },
  {
    id: 7,
    name: "Alice",
    surname: "Williams",
    mobile_number: "0731111111",
    confirmed: true,
  },
  {
    id: 8,
    name: "Alice",
    surname: "Williams",
    mobile_number: "0731111111",
    confirmed: true,
  },
  {
    id: 9,
    name: "Alice",
    surname: "Williams",
    mobile_number: "0731111111",
    confirmed: true,
  },
  {
    id: 10,
    name: "Alice",
    surname: "Williams",
    mobile_number: "0731111111",
    confirmed: true,
  },
];

const requests = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    mobile_number: "0731111111",
    confirmed: false,
  },
  {
    id: 2,
    name: "Bob",
    surname: "Johnson",
    mobile_number: "0731111111",
    confirmed: false,
  },
];

const DashboardIndex = ({ id }) => {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectDashboardAll);
  const [userlistType, setUserlistType] = useState("users");

  const {
    data: board,
    isLoading: boardIsLoading,
    isSuccess,
  } = useGetOwnerBoardQuery(id);

  let boardContent = <p>"Loading..."</p>;
  if (boardIsLoading) {
    boardContent = <p>"Loading..."</p>;
  } else if (isSuccess && board?.label) {
    dispatch(boardFetched(board));
    boardContent = (
      <div>
        <p>{JSON.stringify(board)}</p>
      </div>
    );
  }

  const openConfigureHandler = () => {
    dispatch(toggleShowConfigureBoardAction(true));
  };

  return (
    <>
            <Card
          color="white"
          style={{ padding: "20px", width: "100%"}}>
<BoardHeader />
        </Card>
      {boardContent}
      <div className={classes["page-content"]}>
        <Card
          color="white"
          style={{
            padding: "20px",
            width: "18%",
            height: "100%",
            "min-width": "250px",
          }}
        >
          <div className={classes["list-toggle-container"]}>
            <button
              className={
                userlistType === "requests"
                  ? `${classes["noactive-button"]} ${classes.button}`
                  : classes.button
              }
              onClick={() => {
                setUserlistType("users");
              }}
              disabled={userlistType === "users"}
            >
              Clients
            </button>
            <button
              className={
                userlistType === "users"
                  ? `${classes["noactive-button"]} ${classes.button}`
                  : classes.button
              }
              onClick={() => {
                setUserlistType("requests");
              }}
              disabled={userlistType === "requests"}
            >
              Requests
            </button>
          </div>
          <UserList
            acceptClick={(id) => {
              console.log(id + "accept");
            }}
            denyClick={(id) => {
              console.log(id + "deny");
            }}
          users={userlistType === "users" ? users : requests}
          userlistType={userlistType}
          />
        </Card>
        <Card
          color="white"
          style={{ padding: "20px", width: "80%", height: "100%" }}
        >
          <div className={classes["topbar-buttons"]}>
            <div className={classes["topbar-left"]}>
              <button
                className={classes["topbar-button"]}
                onClick={() => {
                  dispatch(toggleShowNewTicketAction(true));
                }}
              >
                <AddIcon /> New Ticket
              </button>
            </div>
            <div className={classes["topbar-left"]}>
              <button
                className={classes["topbar-button"]}
                onClick={openConfigureHandler}
              >
                <SettingsIcon /> Configure Board
              </button>
            </div>
          </div>
          <div className={classes["week-container"]}>
            <BoardWeekIndex mode="owner" id={id} />
          </div>
        </Card>

        {dashboard?.showConfigureBoard ? <ConfigureBoardModal /> : null}
      </div>
    </>
  );
};

export default DashboardIndex;
