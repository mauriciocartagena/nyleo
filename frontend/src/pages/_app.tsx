import { ChakraProvider } from "@chakra-ui/react";
import { LayoutPage } from "../modules/Layout/LayoutPage";
import "../styles/globals.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <LayoutPage>
        <Component {...pageProps} />
      </LayoutPage>
    </ChakraProvider>
  );
}

export default MyApp;
