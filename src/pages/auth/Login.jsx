import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AuthFormikControl from '../../components/authForm/AuthFormikControl';

const initialValues = {
	phone: '',
	password: '',
	remember: false
};
const onSubmit = values => {
	console.log(values);
};
const validationSchema = Yup.object({
	phone: Yup.number().required('لطفا این قسمت را پر کنید'),
	password: Yup.string()
		.required('لطفا این قسمت را پر کنید')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			'حد اقل یک حرف بزرگ و یک حرف کوچک لاتین و اعداد و کارکترهای خاص استفاده کنید'
		)
});

const Login = () => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{formik => {
				console.log(formik);
				return (
					<div className="wrap-login100">
						<Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
							<span className="login100-form-title">ورود اعضا</span>

							<AuthFormikControl
								formik={formik}
								control="input"
								type="text"
								name="phone"
								icon="fa fa-mobile"
								label="شماره تلفن همراه"
							/>

							<AuthFormikControl
								formik={formik}
								control="input"
								type="password"
								name="password"
								icon="fa fa-lock"
								label="رمز عبور"
							/>
							<AuthFormikControl control="switch" name="remember" label="مرا بخاطر بسپارید" />

							<div className="text-center pos-absolute m-auto w-100 bottom-0">
								<a className="txt2" href="#">
									ثبت نام
									<i className="fa fa-long-arrow-left m-l-5" aria-hidden="true"></i>
								</a>
							</div>
						</Form>
						<div className="login100-pic js-tilt" data-tilt>
							<img src="/auth/images/img-01.png" alt="IMG" />
						</div>
					</div>
				);
			}}
		</Formik>
	);
};

export default Login;
