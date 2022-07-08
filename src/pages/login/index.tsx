import {
  Field, Form, Formik,
} from 'formik';
import {
  Box,
  Button,
  Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, VStack,
} from '@chakra-ui/react';
import InputPassword from 'components/inputPassword';
import { loginDataInterface } from 'interfaces/auth.interfaces';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/auth.api';
import LoginSchema from './loginValidationSchema';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const initialValues: loginDataInterface = {
    email: '',
    password: '',
    rememberMe: false,
  };
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
                navigate('/', { replace: true });
                resetForm();
              })
              .catch((err) => {
                resetForm();
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
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default Login;
