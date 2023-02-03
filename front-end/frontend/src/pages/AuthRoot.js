import { Outlet, Link} from 'react-router-dom';

function AuthRootLayout() {
  return (
    <>
    <div>loool</div>
    <Link to='/'>home</Link>
      <Outlet />
    </>
  );
}

export default AuthRootLayout;