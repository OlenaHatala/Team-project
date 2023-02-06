import { Outlet, Link} from 'react-router-dom';

function AuthRootLayout() {
  return (
    <>
    <Link to='/'>home</Link>
      <Outlet />
    </>
  );
}

export default AuthRootLayout;