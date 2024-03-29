import { useNavigate } from "react-router-dom";
import { useCreateMutation } from "../api";
import { NewBoardForm } from "../components/NewBoardForm";
import { NewBoardProvider } from "../context/NewBoardContext";
import CircularProgress from "@mui/material/CircularProgress";

export const NewBoardIndex = () => {
  const [create, { isLoading }] = useCreateMutation();
  const navigate = useNavigate();
  const submitHandler = async (boardData) => {
    try {
      const createdBoardData = await create(boardData).unwrap();
      const createdBoard = createdBoardData.board;
      navigate(`/dashboard/${createdBoard._id}`);
    } catch (err) {
      //todo: implement ui feedback
      const errMessage = err?.message || "An error ocured";
      console.log(errMessage);
    }
  };
  return (
    <NewBoardProvider>
      {isLoading ? (
        <div style={{ display: "flex", flexDirection: "row" , gap: "20px"}}>
          <CircularProgress />
          <p>Please, wait... Usually it takes around 20 second.</p>
        </div>
      ) : null}
      <NewBoardForm
        onSubmit={submitHandler}
        disableSubmit={isLoading}
        isUpdateForm={false}
      />
    </NewBoardProvider>
  );
};
