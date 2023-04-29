import { BoardList } from "../modules/boards";
import Card from "../modules/common/UI/Card";

function BoardsPage() {
  return (
    <div className="board-list-page">
      <Card>
        <BoardList />
      </Card>
    </div>
  );
}

export default BoardsPage;
