import { useEffect, useState } from "react";
import { useGetBoardQuery, useJoinMutation } from "../api";
import { MemberView } from "./MemberView";
import { RequestSentCard } from "./RequestSentCard";

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

  let content = <p>"Loading..."</p>;
  if (boardIsLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess && board?.label) {
    content = <MemberView board={board} boardId={boardId}/>;
  } else if (isAdded) {
    content = <RequestSentCard />;
  }

  return content;
};
