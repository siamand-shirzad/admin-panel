import { Navigate } from 'react-router-dom';
import AdminContextProvider, { AdminContext } from '../../context/AdminLayoutContext';
import { useIsLogin } from '../../hooks/authHook';
import Content from '../../pages/Content';
import Navbar from './navbar/Index';
import Sidebar from './sidebar/Index';

const Index = () => {
	const [loading, isLogin] =useIsLogin()
	return (
		<AdminContextProvider>
			{loading ? (
				<h1 className="text-center waiting_center">لطفا صبر کنید...</h1>
			) : isLogin ? (
				<>
					<Content />
					<Navbar />
					<Sidebar />
				</>
			) : (
				<Navigate to={'/auth/login'} />
			)}
		</AdminContextProvider>
	);
};

export default Index;
