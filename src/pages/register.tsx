import React from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useMutation } from "urql";
import { useRouter } from "next/router";

interface registerProps {}

const REGISTER_MUT = `
mutation Register($options:UsernamePasswordInput!){
  register(options:$options){
    errors{
      field
      message
    }
    user{
      id
      createdAt
      updatedAt
      username
    }
  }
}
`;

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          // 일단 여기에서 Response가 any라고 나와서
          // 어떤 response가 나올지 예측할 수 없다.
          // 이걸 codegen? 이런것을 통해서 Response를 fix할 수 있는게 있는데,
          // 그건 나중에 알아보도록 하자.
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors({
              username: "hey Im an error",
            });
          } else if (response.data?.register.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {(isSubmmiting) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button mt={4} type="submit" variantColor="teal">
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
