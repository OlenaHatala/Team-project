import { Outlet } from 'react-router-dom';

import { NewBoardProvider } from '../context/NewBoardContext';

function AccountRootLayout() {
  console.log('acc-root-layout');
  return (
    <div className='account-root'>
    <h1>Profile</h1>
    <NewBoardProvider><Outlet /></NewBoardProvider>
    </div>
  );
}

export default AccountRootLayout;
