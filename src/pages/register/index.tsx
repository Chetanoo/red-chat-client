import {
  Field, Form, Formik,
} from 'formik';
import {
  Box,
  Button,
  Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, VStack,
} from '@chakra-ui/react';
import InputPassword from 'components/inputPassword';
import { registerDataInterface } from 'interfaces/auth.interfaces';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/auth.api';
import registrationValidationSchema from './registrationValidationSchema';

function Register(): JSX.Element {
  const navigate = useNavigate();
  const initialValues: registerDataInterface = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmEmail: '',
    rememberMe: false,
  };
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
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default Register;
