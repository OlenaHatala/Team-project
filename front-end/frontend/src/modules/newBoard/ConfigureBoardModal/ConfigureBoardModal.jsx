import { useDispatch } from "react-redux";

import { toggleShowConfigureBoardAction } from "../../dashboard/store";

import { Modal } from "../../common/components";

import { NewBoardProvider } from "../context/NewBoardContext";
import ConfigureBoard from "./ConfigureBoard";

const ConfigureBoardModal = ({ boardInfo }) => {
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(toggleShowConfigureBoardAction(false));
  };
  return (
    <NewBoardProvider>
      <Modal onClose={closeHandler}>
        <ConfigureBoard boardInfo={boardInfo} />
      </Modal>
    </NewBoardProvider>
  );
};

export default ConfigureBoardModal;
