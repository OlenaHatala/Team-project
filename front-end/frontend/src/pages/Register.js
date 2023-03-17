import Card from "../modules/common/UI/Card";
import AuthHeader from "../modules/common/components/AuthHeader";
import { RegisterForm } from "../modules/register";

function Register() {
  return (
    <>
      <AuthHeader />
      <div className="auth-page">
        <Card>
          <RegisterForm />
        </Card>
      </div>
    </>
  );
}

export default Register;
