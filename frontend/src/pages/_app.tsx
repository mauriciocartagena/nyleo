import { Button, ChakraProvider } from "@chakra-ui/react";
import { createClient, Provider } from "urql";
import "../styles/globals.css";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

import theme from "../theme";
import { LayoutPage } from "../modules/Layout/LayoutPage";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <LayoutPage>
          <Component {...pageProps} />
        </LayoutPage>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
