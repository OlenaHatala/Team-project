import { Outlet } from "react-router-dom";

function AccountRootLayout() {
  return (
    <div className="account-root">
      <h1>Profile</h1>
      <Outlet />
    </div>
  );
}

export default AccountRootLayout;
