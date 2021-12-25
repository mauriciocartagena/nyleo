import React from "react";
import { Modal } from "../../ui/Modal";

interface StudentDeleteModalProps {
  onRequestClose: () => void;
  open: boolean;
}

export const StudentDeleteModal: React.FC<StudentDeleteModalProps> = ({ open, onRequestClose }) => {
  return <Modal isOpen={open} onRequestClose={onRequestClose}></Modal>;
};
