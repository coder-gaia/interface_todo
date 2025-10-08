import styled from "styled-components"; 
import {borderRadius, colors, spacing, typography} from '../styles/colors'

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: ${spacing.sm};
  border-radius: ${borderRadius.md};
  border: 1px solid ${colors.border};
  margin: ${spacing.md} 0;
  font-size: ${typography.fontSize.md};
  font-family: ${typography.fontFamily};
  color: #fff;
`;
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    pointer-events: none;
  }

  input {
    padding-left: 32px;
  }
`;
