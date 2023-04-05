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
      <button
        onClick={() => {
          dispatch(toggleShowNewTicketAction(true));
        }}
      >
        newTicket
      </button>
      <button onClick={openConfigureHandler}>Configure Board</button>
      {dashboard?.showConfigureBoard ? <ConfigureBoardModal /> : null}
      <BoardWeekIndex mode="owner" id={id} />
    </>
  );
};

export default DashboardIndex;
