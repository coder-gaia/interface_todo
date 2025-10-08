import { CloseButton, ModalContent, ModalOverlay } from "./ModalStyles";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};
