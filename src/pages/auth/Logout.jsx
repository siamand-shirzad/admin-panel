import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, closeLoadingAlert, showLoadingAlert } from '../../utils/alert';
import { logoutService } from '../../services/auth';

const Logout = () => {
	const [loading, setloading] = useState(true);
	useEffect(() => {
    showLoadingAlert()
		const fetchData = async () => {
			try {
				const res = await logoutService();
				if (res.status == 200) {
					console.log(res.status);
					setloading(false);
          closeLoadingAlert()
					localStorage.removeItem('loginToken');
				} else {
          Alert('متاسفم...!', res.data.message, 'error');
				}
			} catch (error) {
        setloading(false);
        closeLoadingAlert()
				Alert('متاسفم...!', 'متاسفانه مشکلی از سمت سرور رخ داده', 'error');
			}
		};
		fetchData();
	}, []);

	return <>{loading ? null : <Navigate to="/auth/login" />}</>;
};

export default Logout;
