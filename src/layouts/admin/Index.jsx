import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AdminContextProvider from '../../context/AdminLayoutContext';
import { useIsLogin } from '../../hooks/authHook';
import Content from '../../pages/Content';
import Navbar from './navbar/Index';
import Sidebar from './sidebar/Index';
import { showLoadingAlert, closeLoadingAlert } from '../../utils/alert';

const Index = () => {
  const [loading, isLogin] = useIsLogin();

  useEffect(() => {
    if (loading) {
      showLoadingAlert('در حال بارگذاری داشبورد...');
    } else {
      closeLoadingAlert();
    }
  }, [loading]);

  return (
    <AdminContextProvider>
      {!loading && isLogin ? (
        <>
          <Content />
          <Navbar />
          <Sidebar />
        </>
      ) : !loading && !isLogin ? (
        <Navigate to="/auth/login" />
      ) : null}
    </AdminContextProvider>
  );
};

export default Index;