import styled from "styled-components";
import { colors, spacing, borderRadius, typography, shadow } from "../styles/colors";

export const ToggleContainer = styled.div`
  display: flex;
  margin-bottom: ${spacing.md};
  border-radius: ${borderRadius.md};
  overflow: hidden;
  border: 1px solid ${colors.border};
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  background: ${({ active }) => (active ? colors.primary : colors.secondary)};
  color: ${({ active }) => (active ? colors.secondary : colors.text)};
  border: none;
  transition: background 0.2s;
`;

export const Label = styled.label`
  margin: ${spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  color: ${colors.text};
`;

export const FormInput = styled.input`
  width: 100%;
  padding: ${spacing.sm};
  margin-bottom: ${spacing.sm};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.sm};
  font-size: ${typography.fontSize.md};
`;

export const FormButton = styled.button`
  width: 100%;
  padding: ${spacing.sm};
  margin-top: ${spacing.sm};
  background-color: ${colors.primary};
  color: ${colors.secondary};
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.medium};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: ${colors.text};
  }
`;

export const CreateTaskForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: ${colors.secondary};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadow.heavy};
  min-width: 400px;
  position: relative;
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
