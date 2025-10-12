import React, { useState } from 'react';
import { Modal } from './Modal';
import {
  CreateTaskForm,
  FormButton,
  FormInput,
  Label,
  ToggleButton,
  ToggleContainer
} from '../components/ModalStyles';
import { useAuth } from '../contexts/AuthContext';

interface Props { onClose: () => void; }

export default function LoginModal({ onClose }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const { login, registerUser, registerOwner } = useAuth();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (activeTab === 'login') {
        await login(email, password, isAdmin);
      } else {
        if (isAdmin) {
          await registerOwner(email, password, username);
        } else {
          await registerUser(email, password, username);
        }
      }
      onClose();
    } catch (err) {
      alert(activeTab === 'login' ? 'Login failed. Please check your credentials.' : 'Registration failed. Please check your input.');
    }
  }

  return (
    <Modal onClose={onClose} hideCloseButton={true}>
      <ToggleContainer>
        <ToggleButton active={activeTab === 'register'} onClick={() => setActiveTab('register')}>Register User</ToggleButton>
        <ToggleButton active={activeTab === 'login'} onClick={() => setActiveTab('login')}>Login</ToggleButton>
      </ToggleContainer>

      <CreateTaskForm onSubmit={submit}>
        {activeTab === 'register' && (
          <FormInput
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        )}
        <FormInput
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <FormInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={e => setIsAdmin(e.target.checked)}
          />
          Owner/Admin
        </Label>
        <FormButton type="submit">{activeTab === 'login' ? 'Login' : 'Register'}</FormButton>
      </CreateTaskForm>
    </Modal>
  );
}
