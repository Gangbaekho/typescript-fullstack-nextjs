import { Box } from "@chakra-ui/layout";
import React, { Children } from "react";

interface WrapperProps {
  // optional로 줘서 꼭 props를 넘기지 않아도 되도록 하자
  // 이거 안하고 props를 안넘기면 error가 날 것이다.
  variant?: "small" | "regular";
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box
      maxWidth={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
