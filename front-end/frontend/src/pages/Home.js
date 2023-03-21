import PageContent from '../modules/common/UI/PageContent';
import { useSelectUser } from '../modules/auth';

function HomePage() {
  const user = useSelectUser();
  const welcome = user ? `Welcome ${user.email}!` : "";
  return (
    <PageContent title="Welcome!">
      <h1>{welcome}</h1>
    </PageContent>
  );
}

export default HomePage;
