import {
  useDisclosure,
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { MobileNav } from "./menu/MobileNav";
import { SideBarContent } from "./menu/SideBarContent";

interface LayoutPageProps {}

export const LayoutPage: React.FC<LayoutPageProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SideBarContent
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
          <SideBarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};
