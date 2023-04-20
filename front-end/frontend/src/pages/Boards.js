import { BoardList } from "../modules/boards";
import Card from "../modules/common/UI/Card";

function BoardsPage() {
  return (
    <div className="account-details">
      <h1>Boards List</h1>
      <Card>
        <BoardList />
      </Card>
    </div>
  );
}

export default BoardsPage;
