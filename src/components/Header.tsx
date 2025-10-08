import React from 'react';
import { HeaderContainer, Logo, LogoText, UserSection, UserInitials, IconButton } from './HeaderStyles';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <span>MT</span>
        <LogoText>MY TODO</LogoText>
      </Logo>

      <UserSection>
        <IconButton title="Login/Future feature">
          <User size={20} />
        </IconButton>
        <UserInitials>HP</UserInitials>
        <IconButton title="Logout/Future feature">
          <LogOut size={20} />
        </IconButton>
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;
