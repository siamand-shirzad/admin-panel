import React from 'react';
import AdminLayout from './layouts/admin/Index';
import AuthLayout from './layouts/auth/AuthLayout';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation()
  return (
    <div className="App">
      {
        location.pathname.includes('/auth') ? (
          <AuthLayout/>
        ) : (
          <AdminLayout/>
        )
      }
    </div>
  );
};

export default App;