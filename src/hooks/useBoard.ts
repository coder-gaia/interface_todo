import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Board {
  id: string;
  title: string;
}

export function useBoard() {
  const { token, user } = useAuth();

  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

async function fetchWithAuth(path: string, options?: any) {
  if (!token) throw new Error('No token available');

  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`http://localhost:3333${path}`, { ...options, headers });

  if (!res.ok) {
    const error: any = new Error('API Error');
    error.status = res.status;
    throw error;
  }


  const text = await res.text();
  return text ? JSON.parse(text) : null;
}



  function handleBoardCreated(board: { id: string; title: string }) {
  setBoards(prev => [...prev, board]);
  setSelectedBoard(board.id);
}

  async function loadBoards() {
    setLoading(true);
    try {
      const data = await fetchWithAuth('/boards');
      const boardsData: Board[] = data || [];
      setBoards(boardsData);

      if (!boardsData.length) {
        setSelectedBoard(null);
        return;
      }

      const hasCurrent = selectedBoard && boardsData.some(b => b.id === selectedBoard);
      if (!selectedBoard || !hasCurrent) {
        setSelectedBoard(boardsData[0].id);
      }
    } catch (err: any) {
      console.error('Failed to load boards', err);
      if (err.status === 401) alert('You must be logged in to access boards.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      loadBoards();
    } else {
      setBoards([]);
      setSelectedBoard(null);
      setLoading(false);
    }
  }, [user]);

  return {
    boards,
    selectedBoard,
    setSelectedBoard,
    loading,
    loadBoards,
    fetchWithAuth, 
    handleBoardCreated
  };
}
