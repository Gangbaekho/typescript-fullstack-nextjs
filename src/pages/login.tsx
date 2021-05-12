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

// 여기에 따로따로 입력받지 않고
// options라는 것을 받아서
// 객체로 넘겨준다는 것이 여기서는 포인트이다.
const LOGIN_MUT = `
mutation Login($usernameOrEmail:String!,$password:String!){
    login(usernameOrEmail:$usernameOrEmail,password:$password){
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

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useMutation(LOGIN_MUT);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors({
              usernameOrEmail: "hey Im an error",
            });
          } else if (response.data?.login.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {(isSubmmiting) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or Email"
              label="Username Or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button mt={4} type="submit" variantColor="teal">
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
