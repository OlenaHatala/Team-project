import { useContext } from "react";

import BoardContext from "../context/BoardContext";

const useBoardContext = () => {
  return useContext(BoardContext);
};

export default useBoardContext;
