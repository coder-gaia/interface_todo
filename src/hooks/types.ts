export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'done';
}

export interface NewTaskData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}
