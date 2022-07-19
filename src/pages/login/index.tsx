import {
  Field, Form, Formik,
} from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  VStack,
  Text, useToast,
} from '@chakra-ui/react';
import { Link as ReachLink, Navigate, useNavigate } from 'react-router-dom';
import InputPassword from 'components/inputPassword';
import { loginDataInterface } from 'interfaces/auth.interfaces';
import { colors } from 'configs/colors';
import authApi from 'services/api/auth.api';
import { useCookies } from 'react-cookie';
import LoginSchema from './loginValidationSchema';
import { messages } from '../../configs/toastConfig';
import { expirationDate } from '../../helpers';
import { constants } from '../../configs/constants';

function Login(): JSX.Element {
  const toast = useToast();
  const [cookies, setCookie] = useCookies([constants.cookieName]);
  const navigate = useNavigate();
  const initialValues: loginDataInterface = {
    email: '',
    password: '',
    rememberMe: false,
  };
  if (cookies?.userData) {
    return <Navigate to="/" />;
  }
  return (
    <Flex align="center" justify="center">
      <Box>
        <h1>Sing In to your account</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
            authApi.login(values)
              .then((res) => {
                const {
                  data: {
                    email,
                    id,
                    message,
                    rememberMe,
                    token,
                    username,
                  },
                } = res;
                setCookie(
                  constants.cookieName,
                  {
                    email,
                    id,
                    rememberMe,
                    token,
                    username,
                  },
                  {
                    path: '/',
                    maxAge: 24 * 60 * 60 * 1000,
                    expires: expirationDate(rememberMe),
                  },
                );
                toast({
                  title: messages.login,
                  description: message,
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
                navigate('/', { replace: true });
                resetForm();
              })
              .catch((err) => {
                const { error } = err.response.data;
                toast({
                  title: messages.loginError,
                  description: error,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              });
          }}
        >
          {({
            errors, touched, values,
          }) => (
            <Form>
              <VStack spacing={4} align="flex-start">

                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    as={Input}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>

                </FormControl>

                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputPassword id="password" name="password" />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Field
                  as={Checkbox}
                  id="rememberMe"
                  name="rememberMe"
                  colorScheme="red"
                  isChecked={values.rememberMe}
                >
                  Remember me?
                </Field>
                <Button
                  width="full"
                  type="submit"
                  colorScheme="red"
                >
                  Submit
                </Button>
                <Flex>
                  <Text fontSize="md" mr=".3rem">Don&apos;t have an account?</Text>
                  <Link color={colors.link} as={ReachLink} to="/register">
                    <Text fontSize="md">Register</Text>
                  </Link>
                </Flex>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default Login;
