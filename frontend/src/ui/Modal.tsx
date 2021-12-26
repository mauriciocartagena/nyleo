import React from "react";
import ReactModal from "react-modal";
import { Button } from "@chakra-ui/react";

const customStyles = {
  default: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0,0.9)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: "40px 40px 40px 40px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-800)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 530,
    },
  },
  userPreview: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: 0,
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-900)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 435,
    },
  },
};

export const Modal: React.FC<ReactModal["props"] & { variant?: keyof typeof customStyles }> = ({ children, variant = "default", ...props }) => {
  return (
    <ReactModal style={customStyles[variant]} ariaHideApp={false} shouldCloseOnEsc shouldFocusAfterRender {...props}>
      <div className={`flex flex-col w-full`}>
        <div className={`flex justify-end absolute right-3 top-3`}>
          <Button onClick={(e) => props?.onRequestClose?.(e)} data-testid="close-modal">
            x
          </Button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};