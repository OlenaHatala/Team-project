import Card from "../components/UI/Card";
import AuthHeader from '../components/auth/AuthHeader';
import RegisterForm from "../components/auth/RegisterForm";


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
