import React from "react";
import Card from "../components/UI/Card";
import NewBoardForm from "../components/newboard/NewBoardForm";
import { NewBoardProvider } from "../context/NewBoardContext";

const NewBoard = () => {
  return (
    <div className="new-board-page">
      <Card>
        <NewBoardProvider>
          <NewBoardForm />
        </NewBoardProvider>
      </Card>
    </div>
  );
};

export default NewBoard;
