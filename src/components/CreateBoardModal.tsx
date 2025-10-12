import React, { useState } from 'react';
import { Modal } from './Modal';
import { FormInput, FormButton } from '../pages/BoardPageStyles';
import { apiFetch } from '../services/api';

interface Props {
  onClose: () => void;
  onBoardCreated: (board: { id: string; title: string }) => void;
}

export function CreateBoardModal({ onClose, onBoardCreated }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const board = await apiFetch('/boards', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      });
      onBoardCreated(board);
      onClose();
    } catch {
      alert('Failed to create board');
    }
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop:'32px'}}>
        <FormInput
          placeholder="Board title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <FormInput
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <FormButton type="submit">Create Board</FormButton>
      </form>
    </Modal>
  );
}
