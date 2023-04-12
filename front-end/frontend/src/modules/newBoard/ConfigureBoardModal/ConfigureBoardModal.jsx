import { useDispatch } from "react-redux";
import { Modal } from "../../common/components/Modal";
import { useUpdateMutation } from "../api";
import { NewBoardForm } from "../components/NewBoardForm";
import { NewBoardProvider } from "../context/NewBoardContext";
import { toggleShowConfigureBoardAction } from "../../dashboard/store";
import classes from "./ConfigureBoardModal.module.css"

const ConfigureBoardModal = ({ boardInfo }) => {
  const [update, { isLoading }] = useUpdateMutation();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(toggleShowConfigureBoardAction(false));
  };

  const submitHandler = async (boardData) => {
    try {
      const updatedBoardData = await update(boardData).unwrap();
      //todo: invalidate cached board data instaad of reloading
      window.location.reload();
    } catch (err) {
      //todo: implement ui feedback
      const errMessage = err?.message || "An error ocured";
      console.log(errMessage);
    }
  };
  return (
    <Modal onClose={onClose}>
      <NewBoardProvider>
        {isLoading ? (
          <p>Updating tickets... Usually it takes around 20 second.</p>
        ) : null}
        <div className={classes["super-div"]}>
        <NewBoardForm
          onSubmit={submitHandler}
          disableSubmit={isLoading}
          isUpdateForm={true}
          defaultValues={boardInfo}
        /></div>
      </NewBoardProvider>
    </Modal>
  );
};

export default ConfigureBoardModal;
