import styled from "styled-components"; 
import {borderRadius, colors, shadow, spacing ,typography} from '../styles/colors'

export const Card = styled.div<{ priority: 'low' | 'medium' | 'high' }>`
  background: ${colors.secondary};
  padding: ${spacing.md};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadow.light};
  border-left: 4px solid
    ${({ priority }) =>
      priority === 'low'
        ? colors.lowPriority
        : priority === 'medium'
        ? colors.mediumPriority
        : colors.highPriority};
  margin-bottom: ${spacing.md};
  font-family: ${typography.fontFamily};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text};
`;