import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowNewTicketAction } from "../../../boardWeek";
import { useGetOwnerBoardQuery } from "../../api";
import { BoardWeekIndex } from "../../../boardWeek";
import { NewBoardProvider } from "../../../newBoard/context/NewBoardContext";
import {
  boardFetched,
  selectDashboardAll,
  toggleShowConfigureBoardAction,
} from "../../store";
import ConfigureBoardModal from "../../../newBoard/ConfigureBoardModal/ConfigureBoardModal";
import classes from "./DashboardIndex.module.css";

import { Card } from "../../../common/UI";
import { BoardHeader, Modal } from "../../../common/components";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

import UserList from "../userList/index";
import { boardLinkCreator } from "../../../common/constants";

const DashboardIndex = ({ id }) => {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectDashboardAll);
  const [userlistType, setUserlistType] = useState("users");

  const {
    data: board,
    isLoading: boardIsLoading,
    isSuccess,
  } = useGetOwnerBoardQuery(id);

  const openConfigureHandler = () => {
    dispatch(toggleShowConfigureBoardAction(true));
  };

  let boardContent = <p>"Loading..."</p>;
  if (boardIsLoading) {
    boardContent = <p>"Loading..."</p>;
  } else if (isSuccess && board?.label) {
    dispatch(boardFetched(board));
    boardContent = (
      <>
        <Card color="white" style={{ padding: "5px 30px" }}>
          <BoardHeader
            label={board.label}
            servname={board.service_name}
            description={board.description}
            address={board.address}
            link={boardLinkCreator(board._id)}
          />
        </Card>
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
              users={userlistType === "users" ? board.members : board.requests}
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

          {dashboard?.showConfigureBoard ? (
              <ConfigureBoardModal boardInfo={{ ...board }} />
          ) : null}
        </div>
      </>
    );
  }

  return boardContent;
};

export default DashboardIndex;
