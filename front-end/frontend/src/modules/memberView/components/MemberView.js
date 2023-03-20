import Card from "../../common/UI/Card";

export const MemberView = ({ board }) => {
  return (
    <Card>
      <div>
        <p>{JSON.stringify(board)}</p>
      </div>
    </Card>
  );
};
