import { Box, Flex, Link } from "@chakra-ui/layout";
import { useMutation, useQuery } from "urql";
import NextLink from "next/link";
import React from "react";
import { Button } from "@chakra-ui/button";

interface NavBarProps {}

const ME_QUERY = {
  query: `
query Me {
    me{
      id
      createdAt
      updatedAt
      username
    }
  }
`,
};

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useQuery(ME_QUERY);
  let body = null;

  //   data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
    // user is logged int
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};

export default NavBar;
