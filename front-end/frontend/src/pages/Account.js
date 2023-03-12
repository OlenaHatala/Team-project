import UserForm from "../components/UserForm";
import Card from "../components/UI/Card";

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
