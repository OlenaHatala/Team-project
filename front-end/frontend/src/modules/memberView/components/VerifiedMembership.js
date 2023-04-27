import { useEffect, useState } from "react";
import { useGetBoardQuery, useJoinMutation } from "../api";
import { MemberView } from "./MemberView/MemberView";
import { RequestSentCard } from "./RequestSentCard";

import CircularProgress from "@mui/material/CircularProgress";

export const VerifiedMembership = ({ boardId }) => {
  const [isAdded, setIsAdded] = useState(false);

  const [join] = useJoinMutation();
  const {
    data: board,
    isLoading: boardIsLoading,
    isSuccess,
  } = useGetBoardQuery(boardId);

  useEffect(() => {
    const handleJoin = async () => {
      const response = await join(boardId).unwrap();
      if (response?.message === "User added to requests") {
        setIsAdded(true);
      }
    };
    if (
      isSuccess &&
      !board?.label &&
      board?.message === "User is not a member"
    ) {
      handleJoin();
    }
  }, [isSuccess]);

  let content = (
    <div
      styles={{
        minHeight: "700px",
        height: "700px",
        width: "100%",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "background-color": "black",
      }}
    >
      <CircularProgress sx={{ marginBottom: "440px", marginInline: "auto" }} />
    </div>
  );
  if (boardIsLoading) {
    content = (
      <div
        styles={{
          minHeight: "700px",
          height: "700px",
          width: "100%",
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          "background-color": "black",
        }}
      >
        <CircularProgress
          sx={{ marginBottom: "440px", marginInline: "auto" }}
        />
      </div>
    );
  } else if (isSuccess && board?.label) {
    content = <MemberView board={board} id={boardId} />;
  } else if (isAdded) {
    content = <RequestSentCard />;
  }

  return content;
};
