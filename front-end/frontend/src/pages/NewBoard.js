import React from "react";
import Card from "../components/UI/Card";
import NewBoardForm from "../components/newboard/NewBoardForm";
import { BoardProvider } from "../context/BoardProvider";

const NewBoard = () => {
  return (
    <div className="new-board-page">
      <Card>
        <BoardProvider>
            <NewBoardForm />
        </BoardProvider>
      </Card>
    </div>
  );
};

export default NewBoard;
