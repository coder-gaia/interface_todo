import styled from "styled-components"; 
import {borderRadius, colors, shadow, spacing, typography} from '../styles/colors'

export const BoardContainer = styled.div`
  background: #1B2A49;
  padding: ${spacing.sm};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const BoardHeader = styled.div`
  display: flex;
  gap: ${spacing.md};
  align-items: center;
  margin-bottom: ${spacing.lg};
`;

export const Button = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: #3A4A6B;
  height: 50px;
  color: ${colors.secondary};
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.bold};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.highPriority}; 
  }
`;

export const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin-top: ${spacing.md};

  button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${colors.text};
  margin: 4px 0;
}

button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

  @media(min-width: 768px) {
    flex-direction: row;
    gap: ${spacing.lg};
    align-items: flex-start;
    width: 100%;
    overflow-x: auto; 
  }
`;

export const Columns = styled.div`
  display: flex;
  gap: ${spacing.lg};
  width: 100%;
`;

export const Column = styled.div`
  background: ${colors.secondary};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.md};
  box-shadow: ${shadow.light};

  display: flex;
  flex-direction: column;
  align-items: center; 
  min-width: 320px;

  @media(min-width: 768px) {
    flex: 1;
    max-width: 350px; 
  }
`;

export const ColumnHeader = styled.h3`
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.md};
  color: ${colors.text};
  text-align: center;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
  width: 100%;
  overflow-y: auto; 
  max-height: 500px;
`;

export const CreateTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
  padding: ${spacing.md};
  background: ${colors.secondary};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadow.light};
`;

export const FormInput = styled.input`
  padding: ${spacing.sm};
  font-size: ${typography.fontSize.md};
  border-radius: ${borderRadius.sm};
  border: 1px solid ${colors.border};
`;

export const FormTextarea = styled.textarea`
  padding: ${spacing.sm};
  font-size: ${typography.fontSize.md};
  border-radius: ${borderRadius.sm};
  border: 1px solid ${colors.border};
  resize: vertical;
`;

export const FormSelect = styled.select`
  padding: ${spacing.sm};
  font-size: ${typography.fontSize.md};
  border-radius: ${borderRadius.sm};
  border: 1px solid ${colors.border};
`;

export const FormButton = styled.button`
  padding: ${spacing.sm};
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.secondary};
  background-color: ${colors.primary};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
