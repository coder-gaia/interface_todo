import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { CreateTaskForm, FormInput, FormSelect, FormButton } from '../pages/BoardPageStyles';
import { apiFetch } from '../services/api';

interface Board {
  id: string;
  title: string;
}

interface Props {
  onClose: () => void;
  onDone?: () => void;
  boardId: string;
}

export default function ManageMembersModal({ onClose, boardId, onDone }: Props) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>('');

  useEffect(() => {
    async function loadBoards() {
      try {
        const data = await apiFetch('/boards');
        setBoards(data);
        if (data.length > 0) setSelectedBoard(data[0].id);
      } catch {
        alert('Failed to load boards');
      }
    }
    loadBoards();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedBoard) return alert('Select a board');
    try {
      await apiFetch(`/boards/${selectedBoard}/members-by-email`, {
        method: 'POST',
        body: JSON.stringify({ email, role })
      });
      onDone?.();
      onClose();
    } catch {
      alert('Failed to assign role');
    }
  }

  return (
    <Modal onClose={onClose}>
      <CreateTaskForm onSubmit={submit}>
        <FormInput
          placeholder="User email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <FormSelect
            value={selectedBoard}
            onChange={e => setSelectedBoard(e.target.value)}
            style={{ flex: 1 }}
          >
        {boards.map(board => (
            <option key={board.id} value={board.id}>{board.title}</option>
          ))}
          </FormSelect>

          <FormSelect
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="ADMIN">ADMIN</option>
          </FormSelect>
        </div>

        <FormButton type="submit">Assign Role</FormButton>
      </CreateTaskForm>
    </Modal>
  );
}
