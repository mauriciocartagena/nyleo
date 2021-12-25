import React from "react";
import ReactModal from "react-modal";
import { Button } from "@chakra-ui/react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const Modal: React.FC<ReactModal["props"] & { variant?: keyof typeof customStyles }> = ({ children, variant = "default", ...props }) => {
  return (
    <ReactModal style={customStyles[variant]} ariaHideApp={false} shouldCloseOnEsc shouldFocusAfterRender {...props}>
      <h2>This is Modal</h2>
      <div>{children}</div>
      <Button onClick={(e) => props?.onRequestClose?.(e)} data-testid="close-modal">
        Cerrar Modal
      </Button>
    </ReactModal>
  );
};
