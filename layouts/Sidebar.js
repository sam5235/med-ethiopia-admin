import React from "react";
import {
  IconButton,
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiMenu } from "react-icons/fi";
import { FaRegHospital } from "react-icons/fa";
import { MdOutlineSick, MdOutlineArticle } from "react-icons/md";
import NextLink from "next/link";
import { useRouter } from "next/router";

import Stats from "../components/Stats";

const LinkItems = [
  // { name: "Home", icon: FiHome, href: "/" },
  { name: "Healthcares", icon: FaRegHospital, href: "/healthcare" },
  { name: "Patients", icon: MdOutlineSick, href: "/patients" },
  { name: "Blogs", icon: MdOutlineArticle, href: "/blogs" },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 200 }} p="4">
        <Stats />
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      w={{ base: "full", md: 200 }}
      pos="fixed"
      h="full"
      pt="4"
      {...rest}
    >
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <NextLink
      href={href || "#"}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={path === href ? "blackAlpha.100" : ""}
        _hover={{
          bg: "brand.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Flex
            p="1"
            mr="4"
            w={30}
            h={30}
            border="1px"
            justify="center"
            align="center"
            borderRadius="md"
            borderColor={useColorModeValue("gray.300", "gray.900")}
          >
            <Icon
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          </Flex>
        )}
        {children}
      </Flex>
    </NextLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
