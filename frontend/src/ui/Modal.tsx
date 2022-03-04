import { Button } from "@chakra-ui/react";
import React from "react";
import ReactModal from "react-modal";

const customStyles = {
  default: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
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
      backgroundColor: "#fff",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 530,
      boxShadow: "0 10px 40px rgb(41 50 65 / 6%)",
    },
  },
  userPreview: {
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
      backgroundColor: "#18191a",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 530,
    },
  },
};

export const Modal: React.FC<
  ReactModal["props"] & { variant?: keyof typeof customStyles }
> = ({ children, variant = "default", ...props }) => {
  return (
    <ReactModal
      style={customStyles[variant]}
      ariaHideApp={false}
      shouldCloseOnEsc
      shouldFocusAfterRender
      {...props}
    >
      <div className={`flex flex-col w-full`}>
        <div className={`flex justify-end absolute right-3 top-3`}>
          <Button
            onClick={(e) => props?.onRequestClose?.(e)}
            data-testid="close-modal"
            style={{
              color: "#83888F",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            x
          </Button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};
