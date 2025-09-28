import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AuthFormikControl from '../../components/authForm/AuthFormikControl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  phone: '',
  password: '',
  remember: false
};

const validationSchema = Yup.object({
  phone: Yup.string()
    .required('لطفا این قسمت را پر کنید')
    .matches(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  password: Yup.string()
    .required('لطفا این قسمت را پر کنید')
    .matches(/^[a-zA-Z0-9@!%$?&]+$/, 'فقط از حروف و اعداد استفاده شود'),
  remember: Yup.boolean()
});

const onSubmit = (navigate) => async (values, { setSubmitting }) => {
  try {
    const res = await axios.post('https://ecomadminapi.azhadev.ir/api/auth/login', {
      ...values,
      remember: values.remember ? 1 : 0
    });
    if (res.status === 200) {
      localStorage.setItem('loginToken', JSON.stringify(res.data));
      navigate("/");
    }
  } catch (error) {
    console.error(error);
  } finally {
    setSubmitting(false);
  }
};

const Login = () => {
  const navigate = useNavigate()
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit(navigate)} validationSchema={validationSchema}>
      {formik => {
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

              <div className="container-login100-form-btn ">
                <button
                  type="submit"
                  className="login100-form-btn d-flex align-items-center justify-content-center"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <>
                      در حال ورود...
                      <span
                        className="spinner-border spinner-border-sm me-2 "
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </>
                  ) : (
                    'ورود'
                  )}
                </button>
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
