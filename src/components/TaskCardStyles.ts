import styled from 'styled-components';
import { borderRadius, colors, shadow } from '../styles/colors';

interface CardProps {
  priority: 'low' | 'medium' | 'high';
}

const priorityColors = {
  low: colors.lowPriority,
  medium: colors.mediumPriority,
  high: colors.highPriority,
};

export const Card = styled.div<CardProps>`
  background: ${colors.secondary};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadow.light};
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 72px;
  width: 220px;
  border-left: 4px solid ${({ priority }) => priorityColors[priority]};
  margin-bottom: 12px;
  transition: transform 0.16s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;

  h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: ${colors.text};
    white-space: nowrap;    
    overflow: hidden;
    text-overflow: ellipsis;   
  }

  p {
    margin: 0;
    font-size: 12px;
    color: ${colors.muted};
    
    display: -webkit-box;    
    -webkit-line-clamp: 2;      
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;


export const CardActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;

  button {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    padding: 0;
    color: ${colors.text};
    transition: transform 0.12s, background-color 0.12s, color 0.12s;

    svg {
      display: block;      
      width: 18px;
      height: 18px;
    }

    &:hover {
      transform: scale(1.05);
      background-color: rgba(31, 58, 147, 0.06);
      color: ${colors.primary};
    }
  }
`;
