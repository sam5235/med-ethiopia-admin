import { useState } from "react";
import {
  Flex,
  Image,
  Input,
  Button,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const LogIn = () => {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Invalid Credential",
      description: "Please make sure you entred correct info!",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleLogin = () => {
    setIsLoginLoading(true);
    login(email, password)
      .then((cred) => {
        setIsLoginLoading(false);
      })
      .catch((err) => {
        showToast();
        setIsLoginLoading(false);
      });
  };

  if (user) {
    router.replace("/healthcare");
    return null;
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex alignItems="center" mr={10}>
        <Image src="Admin.svg" width="100%" />
      </Flex>
      <Flex direction="column" alignItems="center" padding={12} rounded={6}>
        <Box boxShadow="2xl" rounded="full" p="3" bg="white" mb="3">
          <Image src="logo.png" width={100} />
        </Box>
        <Text fontSize="2xl" as="b" mb="5" textTransform="uppercase">
          Meditopia Admin
        </Text>
        <Input
          type="email"
          width={300}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={6}
        />
        <Input
          type="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={6}
        />
        <Button
          onClick={handleLogin}
          isLoading={isLoginLoading}
          disabled={isLoginLoading}
          colorScheme="brand"
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default LogIn;
