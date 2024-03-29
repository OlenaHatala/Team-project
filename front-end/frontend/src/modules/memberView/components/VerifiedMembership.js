import { useEffect, useState } from "react";
import { useGetBoardQuery, useJoinMutation } from "../api";
import { MemberView } from "./MemberView/MemberView";
import { RequestSentCard } from "./RequestSentCard";

import { LargeSizedLoader } from "../../common/components/LargeSizedLoader";

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

  let content = <LargeSizedLoader />;
  if (boardIsLoading) {
    content = <LargeSizedLoader />;
  } else if (isSuccess && board?.label) {
    content = <MemberView board={board} id={boardId} />;
  } else if (isAdded) {
    content = <RequestSentCard />;
  }

  return content;
};
