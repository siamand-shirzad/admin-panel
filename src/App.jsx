import React from 'react';
import AdminLayout from './layouts/admin/Index';
import AuthLayout from './layouts/auth/AuthLayout';

const App = () => {
  return (
    <div className='App'>
      {/* <AdminLayout/> */}
      <AuthLayout/>
      
    </div>
  );
};

export default App;