import React from "react";

import Card from "../modules/common/UI/Card";
import { NewBoardIndex } from "../modules/newBoard";

const NewBoard = () => {
  return (
    <div className="new-board-page">
      <Card>
        <NewBoardIndex />
      </Card>
    </div>
  );
};

export default NewBoard;
