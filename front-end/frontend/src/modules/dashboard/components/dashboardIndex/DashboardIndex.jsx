import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowNewTicketAction } from "../../../boardWeek";
import { useGetOwnerBoardQuery } from "../../api";
import { BoardWeekIndex, BoardWeekSlider } from "../../../boardWeek";
import { selectWeekIndex } from "../../../boardWeek/store/weekSlice";
import {
  boardFetched,
  selectDashboardAll,
  toggleShowConfigureBoardAction,
} from "../../store";
import ConfigureBoardModal from "../../../newBoard/ConfigureBoardModal/ConfigureBoardModal";
import classes from "./DashboardIndex.module.css";

import { Card } from "../../../common/UI";
import { BoardHeader, LargeSizedLoader } from "../../../common/components";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

import { Members } from "../Members/index";
import { boardLinkCreator } from "../../../common/constants";

const DashboardIndex = ({ id }) => {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectDashboardAll);
  const { index: weekIndex } = useSelector(selectWeekIndex);

  const {
    data: board,
    isLoading: boardIsLoading,
    isSuccess,
  } = useGetOwnerBoardQuery(id);

  const openConfigureHandler = () => {
    dispatch(toggleShowConfigureBoardAction(true));
  };

  let boardContent = <LargeSizedLoader />;
  if (boardIsLoading) {
    boardContent = <LargeSizedLoader />;
  } else if (isSuccess && board?.label) {
    dispatch(boardFetched(board));
    boardContent = (
      <>
        <Card color="white" style={{ padding: "5px 30px", marginBottom: "0" }}>
          <BoardHeader
            label={board.label}
            servname={board.service_name}
            description={board.description}
            address={board.address}
            link={boardLinkCreator(board._id)}
          />
        </Card>
        <div className={classes["page-content"]}>
          <Members members={board.members} requests={board.requests} />
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
              <div className={classes["slider-container"]}>
                <BoardWeekSlider />
              </div>
              <div className={classes["topbar-right"]}>
                <button
                  className={classes["topbar-button"]}
                  onClick={openConfigureHandler}
                >
                  <SettingsIcon /> Configure Board
                </button>
              </div>
            </div>
            <div className={classes["week-container"]}>
              <BoardWeekIndex mode="owner" id={id} weekIndex={weekIndex} />
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
