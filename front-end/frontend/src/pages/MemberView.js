import { useParams } from "react-router-dom";
import { VerifiedMembership } from "../modules/memberView";

export function MemberViewPage() {
  const params = useParams();
  const { boardId } = params;
  return (
    <div className="account-details">
      <VerifiedMembership boardId={boardId}/>
    </div>
  );
}
