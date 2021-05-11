import { Box, Flex, Link } from "@chakra-ui/layout";
import { useMutation, useQuery } from "urql";
import NextLink from "next/link";
import React from "react";
import { Button } from "@chakra-ui/button";

interface NavBarProps {}

const LOGOUT_MUT = `
mutation{
  logout
}
`;

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
  const [{ fetching: logoutFetching }, logout] = useMutation(LOGOUT_MUT);
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
    // 이렇게 로직을 짜는건 문제가 없는데,
    // urql에서 cache를 하기 떄문에
    // 이게 바로 반영을 하지 않는다는 문제가 있음
    // 그러니까 me query를 cache 하기 때문에
    // 여기에 안걸리고 로그인 안된 상태인 위에꺼가 rendering 된다는 것임.
    // @urql/exchange-graphcache 를 까는 이유가 바로 그런것임.
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          logout
        </Button>
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
