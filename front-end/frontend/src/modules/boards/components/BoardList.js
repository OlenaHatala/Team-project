import { useEffect, useState } from "react";
import { useGetBoardsQuery } from "../api";

export const BoardList = () => {
  const [showBoardType, setShowBoardType] = useState("owner");
  const {
    data: allBoards,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBoardsQuery();

  let boards = [];
  let content;
  
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {

    boards = allBoards.filter((board) => {
      return board.userStatus === showBoardType;
    });

    content = (
      <>
        <ul>
          {boards.map((board) => {
            return <li key={board.id}>{JSON.stringify(board)}</li>;
          })}
        </ul>
        <button
          onClick={() => {
            setShowBoardType((prev) => (prev === "owner" ? "member" : "owner"));
          }}
        >
          Change owner/member
        </button>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
