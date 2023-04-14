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
import classes from './DashboardIndex.module.css';

import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

import UserList from '../userList/index';

const DashboardIndex = ({ id }) => {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectDashboardAll);

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
      {boardContent}
      <div className={classes["general-block"]}>
      <div className={classes["topbar-buttons"]}>
      <div className={classes["topbar-left"]}>
        <button className={classes["topbar-button"]}
          onClick={() => {
            dispatch(toggleShowNewTicketAction(true));
          }}
        >
          <AddIcon/> New Ticket
        </button>
          </div>
          <div className={classes["topbar-left"]}>
            <button className={classes["topbar-button"]} onClick={openConfigureHandler}><SettingsIcon/> Configure Board</button>
        </div>
      </div>
      <div className={classes["board-block"]}><BoardWeekIndex mode="owner" id={id} /></div>
      </div>

      {dashboard?.showConfigureBoard ? <ConfigureBoardModal /> : null}
    </>
  );
};

export default DashboardIndex;
