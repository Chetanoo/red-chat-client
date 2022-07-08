import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username has to be at least 2 symbols.')
    .max(99, 'Username cannot be longer then 99 symbols.')
    .required('Required'),
  rememberMe: Yup.bool()
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(5, 'Password has to be at least 5 symbols.')
    .max(99, 'Password cannot be longer then 99 symbols.')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref('email'), null], 'Emails must match')
    .required('Required'),
});

export default RegistrationSchema;
