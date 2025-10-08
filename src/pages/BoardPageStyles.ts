import styled from "styled-components"; 
import {borderRadius, colors, shadow, spacing} from '../styles/colors'

export const BoardContainer = styled.div`
  display: flex;
  gap: ${spacing.lg};
  padding: ${spacing.lg};
  overflow-x: auto;
`;

export const Column = styled.div`
  background: ${colors.secondary};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadow.light};
  padding: ${spacing.md};
  width: 300px;
  flex-shrink: 0;
`;

export const ColumnTitle = styled.h2`
  margin-bottom: ${spacing.md};
  color: ${colors.primary};
`;

export const AddTaskButton = styled.button`
  width: 100%;
  padding: ${spacing.sm};
  margin-top: ${spacing.md};
  border-radius: ${borderRadius.sm};
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  font-weight: bold;
`;