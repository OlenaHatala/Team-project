import { useParams } from "react-router-dom";
import { VerifiedMembership } from "../modules/memberView";

export function MemberViewPage() {
  const { boardId } = useParams();
  return <VerifiedMembership boardId={boardId} />;
}
