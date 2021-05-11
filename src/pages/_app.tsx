import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";

import theme from "../theme";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  // 이 부분 잘 모르겠다
  // urql에서 cache와 관련된 부분을 개인적으로 찾아봐야 할 듯.
  // 3:30 분쯤인데 나중에 참고하자.
  // exchanges:[dedupExchange,cacheExchange({
  //   updates:{
  //     Mutation:{
  //       login:(result,args,cache,info) => {

  //       }
  //     }
  //   }
  // }),fetchExchange]
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
