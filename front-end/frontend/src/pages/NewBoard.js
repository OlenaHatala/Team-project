import React from "react";

import Card from "../modules/common/UI/Card";
import { NewBoardIndex } from "../modules/newBoard/NewBoardImportFile";

const NewBoard = () => {
  return (
    <div className="new-board-page">
      <Card style={{"background-color":"#e3e3e3"}}> 
        <NewBoardIndex />
      </Card>
    </div>
  );
};

export default NewBoard;
