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
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import InputPassword from 'components/inputPassword';
import { registerDataInterface } from 'interfaces/auth.interfaces';
import { Link as ReachLink, Navigate, useNavigate } from 'react-router-dom';
import authApi from 'services/api/auth.api';
import { colors } from 'configs/colors';
import { useCookies } from 'react-cookie';
import registrationValidationSchema from './registrationValidationSchema';
import { messages } from '../../configs/toastConfig';
import { constants } from '../../configs/constants';
import { expirationDate } from '../../helpers';

function Register(): JSX.Element {
  const toast = useToast();
  const [cookies, setCookie] = useCookies([constants.cookieName]);
  const navigate = useNavigate();
  const initialValues: registerDataInterface = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmEmail: '',
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
          validationSchema={registrationValidationSchema}
          onSubmit={(values, { resetForm }) => {
            authApi.register(values)
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
                setCookie(constants.cookieName, {
                  email,
                  id,
                  rememberMe,
                  token,
                  username,
                }, {
                  path: '/',
                  maxAge: 24 * 60 * 60 * 1000,
                  expires: expirationDate(rememberMe),
                });
                toast({
                  title: messages.register,
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
                  title: messages.registerError,
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
                <FormControl isInvalid={!!errors.username && touched.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="text"
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>

                </FormControl>

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

                <FormControl
                  isInvalid={!!errors.confirmEmail && touched.confirmEmail}
                >
                  <FormLabel htmlFor="confirmEmail">Confirm Email</FormLabel>
                  <Field
                    id="confirmEmail"
                    name="confirmEmail"
                    type="email"
                    as={Input}
                  />
                  <FormErrorMessage>{errors.confirmEmail}</FormErrorMessage>

                </FormControl>

                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputPassword id="password" name="password" />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                    }
                >
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <InputPassword id="confirmPassword" name="confirmPassword" />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
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
                  <Text fontSize="md" mr=".3rem">Already have an account?</Text>
                  <Link color={colors.link} as={ReachLink} to="/login">
                    <Text fontSize="md">Login</Text>
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

export default Register;
