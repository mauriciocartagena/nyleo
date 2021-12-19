import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import SidebarWithHeader from "../modules/menu/SideBarWithHeader";

const Index = () => (
  <SidebarWithHeader>
    <DarkModeSwitch />
    Hello World
  </SidebarWithHeader>
);

export default Index;
