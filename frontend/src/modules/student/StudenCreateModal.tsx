import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Modal } from "../../ui/Modal";

interface StudentCreateModalProps {
  onRequestClose: () => void;
  open: boolean;
}

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#ff9800",
    },
  },
});

export const StudentCreateModal: React.FC<StudentCreateModalProps> = ({ open, onRequestClose }) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal isOpen={open} onRequestClose={onRequestClose}></Modal>
    </ThemeProvider>
  );
};
