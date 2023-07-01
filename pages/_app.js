import { ChakraProvider } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/globals.css";

import Layout from "../components/Layout";
import ProtectedRoute from "../components/wrappers/ProtectedRoute";
import AuthContextProvider from "../context/AuthContext";
import theme from "../theme/theme";
import SEOTags from "../components/SEOTags";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  const shouldBeAuth = pathname?.toLowerCase() !== "/login";

  return (
    <ChakraProvider theme={theme}>
      <SEOTags
        title="Med-Ethiopia Admin"
        description="Effortlessly manage your centralized medical system with our powerful admin website."
        url="https://med-ethiopia-admin.vercel.app"
        image="https://med-ethiopia-admin.vercel.app/logo.png"
      />
      <AuthContextProvider>
        {shouldBeAuth ? (
          <ProtectedRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
