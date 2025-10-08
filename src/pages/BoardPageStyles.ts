import styled from "styled-components"; 
import {borderRadius, colors, shadow, spacing, typography} from '../styles/colors'

export const BoardContainer = styled.div`
  background: ${colors.background};
  padding: ${spacing.lg};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  gap: ${spacing.md};
  //justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};
`;

export const Button = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.primary};
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
  gap: ${spacing.lg};
  margin-top: ${spacing.md};
`;

export const Columns = styled.div`
  display: flex;
  gap: ${spacing.lg}; 
  width: 100%;
`;

export const Column = styled.div`
  flex: 1;
  background-color: ${colors.background};
  padding: ${spacing.md};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadow.light};

  display: flex;
  flex-direction: column;
  gap: ${spacing.sm}; 
`;

export const ColumnHeader = styled.h3`
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.md};
  color: ${colors.text};
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
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
