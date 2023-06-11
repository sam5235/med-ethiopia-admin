import { Box, Container, useColorModeValue } from "@chakra-ui/react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")}>
      <Navbar />
      <Container maxW="8xl" pt={16}>
        <Sidebar>{children}</Sidebar>
      </Container>
    </Box>
  );
};

export default Layout;
