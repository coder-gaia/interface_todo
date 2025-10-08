import { Card } from './TaskCardStyles';

interface TaskCardProps {
  title: string;
  priority: 'low' | 'medium' | 'high';
}

const TaskCard: React.FC<TaskCardProps> = ({ title, priority }) => {
  return <Card priority={priority}>{title}</Card>;
};

export default TaskCard;