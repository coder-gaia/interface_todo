import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar';
import {Modal} from '../components/Modal'
import {BoardContainer, Column, FormSelect, FormButton, CreateTaskForm, FormInput, FormTextarea, BoardHeader, Button, Columns, ColumnHeader, ColumnsWrapper, TaskList } from './BoardPageStyles';
import TaskCard from '../components/TaskCard';
import PriorityChart from '../components/PriorityChart';

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<NewTaskData>({
  title: '',
  description: '',
  priority: 'low',
});

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

async function handleUpdateTask(updatedTask: Partial<Task> & { id: string }) {
  try {
    const response = await fetch(`http://localhost:3333/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) throw new Error('Failed to update task');

    const updated = await response.json();

    setTasks(prev =>
      prev.map(t => (t.id === updated.id ? updated : t))
    );

    closeEditModal();
  } catch (error) {
    console.error(error);
    alert('Failed to update task');
  }
}

async function handleDeleteTask(id: string) {
  try {
    const res = await fetch(`http://localhost:3333/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
    setTasks(prev => prev.filter(t => t.id !== id));
  } catch (err) {
    console.error(err);
    alert('Failed to delete task');
  }
}
  const handleCreateTask = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTask, status: 'todo' }),
    });
    const createdTask: Task = await res.json();
    setTasks(prev => [...prev, createdTask]);
    setNewTask({ title: '', description: '', priority: 'low' });
  } catch (err) {
    console.error('Failed to create task:', err);
  }
};

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch('http://localhost:3333/tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  async function handleCompleteTask(id: string) {
  try {
    const res = await fetch(`http://localhost:3333/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ status: 'done' })
    });
    if (!res.ok) throw new Error('Failed to complete task');
    const updated = await res.json();
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
  } catch (err) {
    console.error(err);
    alert('Failed to mark task as done');
  }
}

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) || t.status.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <BoardContainer>Loading...</BoardContainer>;

return (
  <BoardContainer>
    <BoardHeader>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
      <Button onClick={() => setIsModalOpen(true)}>New Task</Button>
    </BoardHeader>

    {isModalOpen && (
      <Modal onClose={() => setIsModalOpen(false)}>
        <CreateTaskForm onSubmit={handleCreateTask}>
          <FormInput
            placeholder="Task title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <FormTextarea
            placeholder="Task description"
            value={newTask.description}
            onChange={e =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <FormSelect
            value={newTask.priority}
            onChange={e =>
              setNewTask({
                ...newTask,
                priority: e.target.value as 'low' | 'medium' | 'high',
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </FormSelect>
          <FormButton type="submit">Create Task</FormButton>
        </CreateTaskForm>
      </Modal>
    )}

<ColumnsWrapper>
  <Column>
    <ColumnHeader>To Do</ColumnHeader>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
    <button
      onClick={() => setVisibleStartTodo(prev => Math.max(prev - visibleCount, 0))}
      disabled={visibleStartTodo === 0}
    >
      ↑
    </button>
    <button
      onClick={() =>
        setVisibleStartTodo(prev =>
          Math.min(
            prev + visibleCount,
            filteredTasks.filter(t => t.status === 'todo').length - visibleCount
          )
        )
      }
      disabled={visibleStartTodo + visibleCount >= filteredTasks.filter(t => t.status === 'todo').length}
    >
      ↓
    </button>
  </div>
    <TaskList>
      {filteredTasks
        .filter(t => t.status === 'todo')
        .slice(visibleStartTodo, visibleStartTodo + visibleCount)
        .map(t => (
          <TaskCard
            key={t.id}
            id={t.id}
            title={t.title}
            description={t.description || ''}
            priority={t.priority}
            status={t.status}
            onComplete={() => handleCompleteTask(t.id)}  
            onEdit={() => openEditModal(t)}
            onDelete={() => handleDeleteTask(t.id)}
          />
      ))}
    </TaskList>
  </Column>

<Column>
  <ColumnHeader>Done</ColumnHeader>

  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
    <button
      onClick={() => setVisibleStartDone(prev => Math.max(prev - visibleCount, 0))}
      disabled={visibleStartDone === 0}
    >
      ↑
    </button>
    <button
      onClick={() =>
        setVisibleStartDone(prev =>
          Math.min(
            prev + visibleCount,
            filteredTasks.filter(t => t.status === 'done').length - visibleCount
          )
        )
      }
      disabled={visibleStartDone + visibleCount >= filteredTasks.filter(t => t.status === 'done').length}
    >
      ↓
    </button>
  </div>

  <TaskList>
    {filteredTasks
      .filter(t => t.status === 'done')
      .slice(visibleStartDone, visibleStartDone + visibleCount)
      .map(t => (
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
    <CreateTaskForm
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdateTask(selectedTask);
      }}
    >
      <FormInput
        placeholder="Task title"
        value={selectedTask.title}
        onChange={(e) =>
          setSelectedTask({ ...selectedTask, title: e.target.value })
        }
        required
      />
      <FormTextarea
        placeholder="Task description"
        value={selectedTask.description || ''}
        onChange={(e) =>
          setSelectedTask({ ...selectedTask, description: e.target.value })
        }
      />
      <FormSelect
        value={selectedTask.priority}
        onChange={(e) =>
          setSelectedTask({
            ...selectedTask,
            priority: e.target.value as 'low' | 'medium' | 'high',
          })
        }
      >
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