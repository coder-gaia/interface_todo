import React, { useState } from 'react';
import { HeaderContainer, Logo, LogoText, UserSection, UserInitials, IconButton } from './HeaderStyles';
import { LogOut, User } from 'lucide-react';
import LoginModal from './LoginModal';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  const getUserInitials = (username?: string) => {
    if (!username || username.length === 0) return '';
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <HeaderContainer>
      <Logo>
        <span>MT</span>
        <LogoText>MY TODO</LogoText>
      </Logo>

      <UserSection>
        {!user && (
          <IconButton onClick={() => setLoginOpen(true)}>
            <User size={20} />
          </IconButton>
        )}

        {user && (
          <>
            <UserInitials>{getUserInitials(user.username)}</UserInitials>
            <IconButton onClick={() => logout()}>
              <LogOut size={20} />
            </IconButton>
          </>
        )}
      </UserSection>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </HeaderContainer>
  );
};

export default Header;
