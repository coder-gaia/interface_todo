import { CloseButton, ModalContent, ModalOverlay } from "./ModalStyles";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  hideCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose, hideCloseButton }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        {!hideCloseButton && <CloseButton onClick={onClose}>X</CloseButton>}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};
