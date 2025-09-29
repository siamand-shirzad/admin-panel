import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../../pages/auth/Login';
import { useIsLogin } from '../../hooks/authHook';
import { showLoadingAlert, closeLoadingAlert } from '../../utils/alert';

const AuthLayout = () => {
  const [loading, isLogin] = useIsLogin();

  useEffect(() => {
    if (loading) {
      showLoadingAlert('در حال بررسی وضعیت ورود...');
    } else {
      closeLoadingAlert();
    }
  }, [loading]);

  return (
    <div className="limiter">
      {!loading && !isLogin ? (
        <div className="container-login100">
          <Routes>
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </div>
      ) : !loading && isLogin ? (
        <Navigate to="/" />
      ) : null}
    </div>
  );
};

export default AuthLayout;