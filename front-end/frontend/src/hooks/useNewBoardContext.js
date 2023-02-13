import { useContext } from "react";

import NewBoardContext from "../context/NewBoardContext";

const useNewBoardContext = () => {
  return useContext(NewBoardContext);
};

export default useNewBoardContext;
