import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Container,
  Image,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import HospitalRegister from "./modals/HospitalRegister";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout } = useAuth();

  return (
    <>
      <Box
        bg={useColorModeValue("brand.500", "gray.900")}
        position="fixed"
        top="0"
        width="100%"
        zIndex="2"
      >
        <Container maxW="8xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Box boxShadow="2xl" rounded="full" p="1" bg="white">
                <Image src="logo.png" width={10} />
              </Box>
              <Box ml="2">
                <Text
                  fontSize="1xl"
                  as="b"
                  textTransform="uppercase"
                  color="white"
                >
                  Meditopia Admin
                </Text>
                <Text fontSize="xs" color="white">
                  The Digital Medical
                </Text>
              </Box>
            </Flex>

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <HospitalRegister />

                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    {/* <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider /> */}
                    {/* <MenuItem>Account Settings</MenuItem> */}
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
