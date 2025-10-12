import styled from 'styled-components';
import {borderRadius, spacing, typography } from '../styles/colors';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.sm} 16px;
  background-color: #1B2A49;
  color: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.8);
  z-index: 1000;

@media(max-width: 480px) {
  flex-direction: column;
  height: auto;
  padding: ${spacing.sm};
  gap: ${spacing.sm};
  justify-content: center;
  align-items: center; 
}
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-weight: ${typography.fontWeight.bold};
  color: #FFFFFF;

  span {
    font-size: 20px;
    background-color: #FFFFFF;
    color: #1B2A49;
    padding: 4px 8px;
    border-radius: ${borderRadius.sm};
  }

@media(max-width: 480px) {
  width: auto; 
  justify-content: center;
}
`;

export const LogoText = styled.span`
  font-size: 18px;
  letter-spacing: 1px;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};

@media(max-width: 480px) {
  width: auto; 
  justify-content: center;
`;

export const UserInitials = styled.div`
  width: 32px;
  height: 32px;
  background-color: #3A4A6B;
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${typography.fontWeight.bold};
  font-size: 14px;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: ${borderRadius.sm};
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;
