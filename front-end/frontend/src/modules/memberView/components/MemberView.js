import Card from "../../common/UI/Card";
import { BoardWeekIndex } from "../../boardWeek";

export const MemberView = ({ board, boardId }) => {
  return (
    <Card>
      <div>
        <p>{JSON.stringify(board)}</p>
      </div>
      <BoardWeekIndex mode="member" id={boardId} />
    </Card>
  );
};
