import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Task, NewTaskData } from './types';

export function useTasks(selectedBoard: string | null) {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

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
    return res.json();
  }

  async function loadTasks(boardId?: string | null) {
    if (!boardId) {
      setTasks([]);
      return;
    }
    try {
      const data = await fetchWithAuth(`/tasks?boardId=${boardId}`);
      setTasks(data || []);
    } catch (err: any) {
      console.error('Failed to fetch tasks:', err);
      if (err.status === 401) alert('You must be logged in to see the tasks.');
      else if (err.status === 404) alert('The owner needs to assign you a role to access tasks.');
    }
  }

  async function createTask(taskData: NewTaskData) {
    if (!selectedBoard) return alert('Select a board first');
    try {
      const created = await fetchWithAuth('/tasks', {
        method: 'POST',
        body: JSON.stringify({ ...taskData, status: 'todo', boardId: selectedBoard }),
      });
      setTasks(prev => [...prev, created]);
      return created;
    } catch (err) {
      console.error('Failed to create task:', err);
      alert('Failed to create task.');
    }
  }

  async function updateTask(task: Task) {
    if (!selectedBoard) return alert('Select a board first');
    try {
      const updated = await fetchWithAuth(`/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: task.title,
          description: task.description || '',
          priority: task.priority,
          status: task.status,
          boardId: selectedBoard,
        }),
      });
      setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      return updated;
    } catch (err) {
      console.error('Failed to update task:', err);
      alert('Failed to update task');
    }
  }

async function deleteTask(taskId: string) {
  if (!selectedBoard) return alert('Select a board first');
  try {
    await fetch(`http://localhost:3333/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ boardId: selectedBoard }),
    });


    setTasks(prev => prev.filter(t => t.id !== taskId));
  } catch (err) {
    console.error(err);
    alert('Failed to delete task');
  }
}


  async function completeTask(taskId: string) {
    if (!selectedBoard) return alert('Select a board first');
    try {
      await fetchWithAuth(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'done', boardId: selectedBoard }),
      });
      loadTasks(selectedBoard);
    } catch (err) {
      console.error(err);
      alert('Failed to complete task');
    }
  }

  useEffect(() => {
    loadTasks(selectedBoard);
  }, [selectedBoard]);

  return {
    tasks,
    setTasks,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
  };
}
