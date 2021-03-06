import React, { ReactNode, ReactText } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiStar,
  FiSettings,
  FiMenu,
  FiLayers,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Link from "next/link";

interface LayoutPageProps {}
interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Estudiantes", icon: FiHome, route: "/student" },
  { name: "Materias", icon: FiTrendingUp, route: "/subject" },
  { name: "Horarios", icon: FiLayers, route: "/schedule" },
  { name: "Turnos", icon: FiStar, route: "/turns" },
  { name: "Cursos", icon: FiSettings, route: "/courses" },
  { name: "Usuarios", icon: FiSettings, route: "/users" },
];

export const LayoutPage: React.FC<LayoutPageProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("#F2F4F6", "#18191a")}>
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
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      bg={useColorModeValue("#ffffff", "#18191a")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          textColor={useColorModeValue("blue.900", "blue.500")}
        >
          Nyleo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex align="center" p="4" mx="4" borderRadius="lg">
        <Button onClick={toggleColorMode}>
          Modo {colorMode === "dark" ? "Claro" : "Oscuro"}
        </Button>
      </Flex>

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  route: string;
  children: ReactText;
}
const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link href={route}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        textColor={useColorModeValue("#000", "#fff")}
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("RGBA(0,0,0,0.05)", "RGBA(255,255,255,0.1)"),
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
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
        Nyleo
      </Text>
    </Flex>
  );
};
