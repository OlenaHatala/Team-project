import React from "react";

import Card from "../modules/common/UI/Card";
import { NewBoardForm, NewBoardProvider } from "../modules/newBoard";

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
