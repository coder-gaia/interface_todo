import styled from "styled-components";
import { borderRadius, colors, shadow, spacing, typography } from "../styles/colors";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: ${colors.secondary};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadow.heavy};
  min-width: 400px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${spacing.sm};
  right: ${spacing.sm};
  font-size: ${typography.fontSize.xl};
  background: none;
  border: none;
  cursor: pointer;
`;
