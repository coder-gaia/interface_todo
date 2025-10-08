import React from 'react'
import SearchBar from '../components/SearchBar';
import { AddTaskButton, BoardContainer, Column, ColumnTitle } from './BoardPageStyles';
import TaskCard from '../components/TaskCard';

type Priority = 'low' | 'medium' | 'high';

interface Task {
  id: string;
  title: string;
  priority: Priority;
}

const mockTasks: Task[] = [
  { id: '1', title: 'Setup backend', priority: 'high' },
  { id: '2', title: 'Write API routes', priority: 'medium' },
  { id: '3', title: 'Initialize project repo', priority: 'low' }
];

const BoardPage: React.FC = () => {
  return (
    <div>
      <SearchBar placeholder="Search tasks..." />
      <BoardContainer>
        <Column>
          <ColumnTitle>To Do</ColumnTitle>
          {mockTasks.map(task => (
            <TaskCard key={task.id} title={task.title} priority={task.priority} />
          ))}
          <AddTaskButton>+ Add Task</AddTaskButton>
        </Column>

        <Column>
          <ColumnTitle>In Progress</ColumnTitle>
          <TaskCard title="Design UI mockup" priority="medium" />
          <TaskCard title="Connect frontend to API" priority="high" />
          <AddTaskButton>+ Add Task</AddTaskButton>
        </Column>

        <Column>
          <ColumnTitle>Done</ColumnTitle>
          <TaskCard title="Install Node.js / TS" priority="low" />
          <TaskCard title="Setup Prisma and SQLite" priority="medium" />
          <AddTaskButton>+ Add Task</AddTaskButton>
        </Column>
      </BoardContainer>
    </div>
  );
};

export default BoardPage;