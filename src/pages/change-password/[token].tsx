import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import router from "next/router";
import React from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import login from "../login";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          //   console.log(values);
          //   const response = await login(values);
          //   if (response.data?.login.errors) {
          //     setErrors({
          //       usernameOrEmail: "hey Im an error",
          //     });
          //   } else if (response.data?.login.user) {
          //     // worked
          //     router.push("/");
          //   }
        }}
      >
        {(isSubmmiting) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />

            <Button mt={4} type="submit" variant="teal">
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

// Next js가 제공하는 특별한 method라고 생각하면 됨.
// query parameter를 쉽게 받게 하기 위한것으로 생각됨.
ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
