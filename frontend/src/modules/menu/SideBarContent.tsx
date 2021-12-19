import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from "@chakra-ui/react";
import {
  FaDiscourse,
  FaClock,
  FaLayerGroup,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { NavItem } from "./NavItem";

interface SideBarContenProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Estudiantes", icon: FaUsers, route: "/student" },
  { name: "Materias", icon: FaBook, route: "/" },
  { name: "Grupos", icon: FaLayerGroup, route: "/group" },
  { name: "Turnos", icon: FaClock, route: "/turn" },
  { name: "Cursos", icon: FaDiscourse, route: "/course" },
];

export const SideBarContent: React.FC<SideBarContenProps> = ({
  onClose,
  ...rest
}: SideBarContenProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Nyleo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
