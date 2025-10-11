import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Modal } from '../components/Modal';
import {
  BoardContainer,
  Column,
  FormSelect,
  FormButton,
  CreateTaskForm,
  FormInput,
  FormTextarea,
  BoardHeader,
  Button,
  ColumnsWrapper,
  TaskList,
  ColumnHeader
} from './BoardPageStyles';
import TaskCard from '../components/TaskCard';
import PriorityChart from '../components/PriorityChart';
import { useAuth } from '../contexts/AuthContext';
import ManageMembersModal from '../components/ManageMembersModal';
import { CreateBoardModal } from '../components/CreateBoardModal';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'done';
}

interface NewTaskData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

const BoardPage: React.FC = () => {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [boards, setBoards] = useState<any[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<NewTaskData>({ title: '', description: '', priority: 'low' });
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const visibleCount = 3;
  const [visibleStartTodo, setVisibleStartTodo] = useState(0);
  const [visibleStartDone, setVisibleStartDone] = useState(0);

  async function fetchWithAuth(path: string, options?: any) {
    if (!token) throw new Error('No token available');
    const headers = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
      Authorization: `Bearer ${token}`
    };
    const res = await fetch(`http://localhost:3333${path}`, { ...options, headers });
    if (!res.ok) {
      const error: any = new Error('API Error');
      error.status = res.status;
      throw error;
    }
    return res.json();
  }

  function openEditModal(task: Task) {
    setSelectedTask(task);
    setEditTaskModalOpen(true);
  }

  function closeEditModal() {
    setSelectedTask(null);
    setEditTaskModalOpen(false);
  }

  async function loadBoards() {
    setLoading(true);
    try {
      const data = await fetchWithAuth('/boards');
      setBoards(data || []);
      if (data && data.length && !selectedBoard) setSelectedBoard(data[0].id);
    } catch (err: any) {
      console.error('Failed to load boards', err);
      if (err.status === 401) alert('You must be logged in to access boards.');
    } finally {
      setLoading(false);
    }
  }

  async function loadTasks(boardId?: string) {
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

  useEffect(() => {
    if (user) loadBoards();
  }, [user]);

  useEffect(() => {
    if (user && selectedBoard) loadTasks(selectedBoard);
  }, [user, selectedBoard]);

async function handleUpdateTask(task: Task) {
  if (!selectedBoard) return alert("Select a board first");
  try {
    const updated = await fetchWithAuth(`/tasks/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        boardId: selectedBoard
      })
    });
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    closeEditModal();
  } catch (err) {
    console.error(err);
    alert('Failed to update task');
  }
}

async function handleDeleteTask(taskId: string) {
  if (!selectedBoard) return alert("Select a board first");
  try {
    const res = await fetch(`http://localhost:3333/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ boardId: selectedBoard })
    });

    if (!res.ok) throw new Error('Failed to delete task');

    setTasks(prev => prev.filter(t => t.id !== taskId));
  } catch (err) {
    console.error(err);
    alert('Failed to delete task');
  }
}


  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBoard) {
      alert('Select a board first');
      return;
    }
    try {
      const createdTask = await fetchWithAuth('/tasks', {
        method: 'POST',
        body: JSON.stringify({ ...newTask, status: 'todo', boardId: selectedBoard })
      });
      setTasks(prev => [...prev, createdTask]);
      setNewTask({ title: '', description: '', priority: 'low' });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

async function handleCompleteTask(taskId: string) {
  if (!selectedBoard) return alert("Select a board first");
  try {
    await fetchWithAuth(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'done', boardId: selectedBoard })
    });
    loadTasks(selectedBoard);
  } catch (err) {
    console.error(err);
    alert('Failed to complete task');
  }
}

function handleBoardCreated(board: { id: string; title: string }) {
  setBoards(prev => [...prev, board]);
  setSelectedBoard(board.id);
}


  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.status.toLowerCase().includes(search.toLowerCase())
  );

const todoTasks = filteredTasks.filter(t => t.status === 'todo');
const doneTasks = filteredTasks.filter(t => t.status === 'done');

const visibleTodoTasks = search ? todoTasks : todoTasks.slice(visibleStartTodo, visibleStartTodo + visibleCount);
const visibleDoneTasks = search ? doneTasks : doneTasks.slice(visibleStartDone, visibleStartDone + visibleCount);


  if (!user) return <BoardContainer>Please log in to access your boards.</BoardContainer>;
  if (user && user.role === null) return <BoardContainer>The owner needs to assign you a role to access boards.</BoardContainer>;
  if (loading) return <BoardContainer>Loading...</BoardContainer>;

  return (
    <BoardContainer>
      <BoardHeader>
    <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {user?.role === 'OWNER' && (
        <Button onClick={() => setIsBoardModalOpen(true)}>New Board</Button>
      )}
      <FormSelect value={selectedBoard || ''} onChange={e => setSelectedBoard(e.target.value)}>
        <option value="">Select board</option>
        {boards.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
      </FormSelect>
      <Button onClick={() => setIsModalOpen(true)}>New Task</Button>
      {user?.role === 'OWNER' && selectedBoard && <Button onClick={() => setManageOpen(true)}>Manage Members</Button>}
    </div>
  </BoardHeader>

  {isBoardModalOpen && (
    <CreateBoardModal
      onClose={() => setIsBoardModalOpen(false)}
      onBoardCreated={handleBoardCreated}
    />
  )}


      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateTaskForm onSubmit={handleCreateTask}>
            <FormInput placeholder="Task title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} required />
            <FormTextarea placeholder="Task description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
            <FormSelect value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value as any })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </FormSelect>
            <FormButton type="submit">Create Task</FormButton>
          </CreateTaskForm>
        </Modal>
      )}

    {manageOpen && selectedBoard && (
      <ManageMembersModal 
          boardId={selectedBoard!} 
          onClose={() => setManageOpen(false)} 
          onDone={() => loadBoards()} 
      />
    )}

      <ColumnsWrapper>
        <Column>
          <ColumnHeader>To Do</ColumnHeader>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-2px', marginTop: '-12px' }}>
            <button onClick={() => setVisibleStartTodo(prev => Math.max(prev - visibleCount, 0))} disabled={visibleStartTodo === 0}>↑</button>
            <button onClick={() => setVisibleStartTodo(prev => Math.min(prev + visibleCount, filteredTasks.filter(t => t.status === 'todo').length - visibleCount))} disabled={visibleStartTodo + visibleCount >= filteredTasks.filter(t => t.status === 'todo').length}>↓</button>
          </div>
<TaskList>
  {visibleTodoTasks.map(t => (
    <TaskCard
      key={t.id}
      {...t}
      onComplete={() => handleCompleteTask(t.id)}
      onEdit={() => openEditModal(t)}
      onDelete={() => handleDeleteTask(t.id)}
    />
  ))}
</TaskList>

        </Column>

        <Column>
          <ColumnHeader>Done</ColumnHeader>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-2px', marginTop: '-12px' }}>
            <button onClick={() => setVisibleStartDone(prev => Math.max(prev - visibleCount, 0))} disabled={visibleStartDone === 0}>↑</button>
            <button onClick={() => setVisibleStartDone(prev => Math.min(prev + visibleCount, filteredTasks.filter(t => t.status === 'done').length - visibleCount))} disabled={visibleStartDone + visibleCount >= filteredTasks.filter(t => t.status === 'done').length}>↓</button>
          </div>
<TaskList>
  {visibleDoneTasks.map(t => (
    <TaskCard
      key={t.id}
      {...t}
      onEdit={() => openEditModal(t)}
      onDelete={() => handleDeleteTask(t.id)}
    />
  ))}
</TaskList>

        </Column>

        <Column>
          <ColumnHeader>Priorities</ColumnHeader>
          <PriorityChart tasks={tasks} />
        </Column>
      </ColumnsWrapper>

      {editTaskModalOpen && selectedTask && (
        <Modal onClose={closeEditModal}>
          <CreateTaskForm onSubmit={(e) => { e.preventDefault(); handleUpdateTask(selectedTask); }}>
            <FormInput placeholder="Task title" value={selectedTask.title} onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })} required />
            <FormTextarea placeholder="Task description" value={selectedTask.description || ''} onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })} />
            <FormSelect value={selectedTask.priority} onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value as any })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </FormSelect>
            <FormButton type="submit">Update Task</FormButton>
          </CreateTaskForm>
        </Modal>
      )}
    </BoardContainer>
  );
};

export default BoardPage;
