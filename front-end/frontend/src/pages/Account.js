import { UserForm } from "../modules/account";
import Card from "../modules/common/UI/Card";

function EditAccountPage() {
  return (
    <div className="account-details">
      <Card>
        <UserForm />
      </Card>
    </div>
  );
}

export default EditAccountPage;
