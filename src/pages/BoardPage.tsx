import React, { useState } from 'react';
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
  ColumnHeader,
  BoardHeaderMobileWrapper,
  ButtonGroup,
  ScrollButtons
} from './BoardPageStyles';
import TaskCard from '../components/TaskCard';
import PriorityChart from '../components/PriorityChart';
import { useAuth } from '../contexts/AuthContext';
import ManageMembersModal from '../components/ManageMembersModal';
import { CreateBoardModal } from '../components/CreateBoardModal';
import { useBoard } from '../hooks/useBoard';
import { useTasks } from '../hooks/useTasks';
import type { Task, NewTaskData } from '../hooks/types';

const BoardPage: React.FC = () => {
  const { user } = useAuth();
  const { boards, selectedBoard, setSelectedBoard, loading, handleBoardCreated, loadBoards } = useBoard();
  const { tasks, createTask, updateTask, deleteTask, completeTask } = useTasks(selectedBoard);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<NewTaskData>({ title: '', description: '', priority: 'low' });
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const visibleCount = 3;
  const [visibleStartTodo, setVisibleStartTodo] = useState(0);
  const [visibleStartDone, setVisibleStartDone] = useState(0);

  function openEditModal(task: Task) {
    setSelectedTask(task);
    setEditTaskModalOpen(true);
  }

  function closeEditModal() {
    setSelectedTask(null);
    setEditTaskModalOpen(false);
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
        <BoardHeaderMobileWrapper>
          <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <ButtonGroup>
              {user?.role === 'OWNER' && <Button onClick={() => setIsBoardModalOpen(true)}>New Board</Button>}
              <FormSelect value={selectedBoard || ''} onChange={e => setSelectedBoard(e.target.value)}>
                <option value="">Select board</option>
                {boards.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
              </FormSelect>
              <Button onClick={() => setIsModalOpen(true)}>New Task</Button>
              {user?.role === 'OWNER' && selectedBoard && <Button onClick={() => setManageOpen(true)}>Manage Members</Button>}
            </ButtonGroup>
          </div>
        </BoardHeaderMobileWrapper>
      </BoardHeader>

      {isBoardModalOpen && <CreateBoardModal onClose={() => setIsBoardModalOpen(false)} onBoardCreated={(b) => { handleBoardCreated(b); setSelectedBoard(b.id); }} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateTaskForm onSubmit={async (e) => {
            e.preventDefault();
            await createTask(newTask);
            setNewTask({ title: '', description: '', priority: 'low' });
            setIsModalOpen(false);
          }}>
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

      {manageOpen && selectedBoard && <ManageMembersModal boardId={selectedBoard} onClose={() => setManageOpen(false)} onDone={() => loadBoards()} />}

      <ColumnsWrapper>
        <Column>
          <ColumnHeader>To Do</ColumnHeader>
          <ScrollButtons>
            <button onClick={() => setVisibleStartTodo(prev => Math.max(prev - visibleCount, 0))} disabled={visibleStartTodo === 0}>↑</button>
            <button onClick={() => setVisibleStartTodo(prev => Math.min(prev + visibleCount, todoTasks.length - visibleCount))} disabled={visibleStartTodo + visibleCount >= todoTasks.length}>↓</button>
          </ScrollButtons>
          <TaskList>
            {visibleTodoTasks.map(t => (
              <TaskCard key={t.id} {...t} onComplete={() => completeTask(t.id)} onEdit={() => openEditModal(t)} onDelete={() => deleteTask(t.id)} />
            ))}
          </TaskList>
        </Column>

        <Column>
          <ColumnHeader>Done</ColumnHeader>
          <ScrollButtons>
            <button onClick={() => setVisibleStartDone(prev => Math.max(prev - visibleCount, 0))} disabled={visibleStartDone === 0}>↑</button>
            <button onClick={() => setVisibleStartDone(prev => Math.min(prev + visibleCount, doneTasks.length - visibleCount))} disabled={visibleStartDone + visibleCount >= doneTasks.length}>↓</button>
          </ScrollButtons>
          <TaskList>
            {visibleDoneTasks.map(t => (
              <TaskCard key={t.id} {...t} onEdit={() => openEditModal(t)} onDelete={() => deleteTask(t.id)} />
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
          <CreateTaskForm onSubmit={async (e) => { e.preventDefault(); await updateTask(selectedTask); closeEditModal(); }}>
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
