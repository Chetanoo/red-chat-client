import {
  InputGroup, Input, Button, InputRightElement,
} from '@chakra-ui/react';
import React from 'react';
import { Field } from 'formik';

function InputPassword({ id, name }: {id: string, name: string}): JSX.Element {
  const [show, setShow] = React.useState(false);
  const handleClick = (): void => setShow(!show);

  return (
    <InputGroup size="md">
      <Field
        id={id}
        name={name}
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        as={Input}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default InputPassword;
