import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  rememberMe: Yup.bool()
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required'),
});

export default LoginSchema;
