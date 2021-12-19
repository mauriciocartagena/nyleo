import { FlexProps, Flex, Icon, Link } from "@chakra-ui/react";
import React, { ReactText } from "react";
import { IconType } from "react-icons";

interface NavItemProps {}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  route: string;
}
export const NavItem: React.FC<NavItemProps> = ({
  icon,
  children,
  route,
  ...rest
}: NavItemProps) => {
  return (
    <Link href={route} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
